const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let activeUsers = 0;
let users = {};
let gameActive = false;
let goal = Math.ceil(Math.random() * 1000);
let alternatives = [0, 0, 0, 0];

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("username");
  socket.emit("gamestatus", gameActive);
  socket.emit("alternatives", alternatives);

  io.emit("users", users);

  activeUsers++;
  io.emit("userUpdate", activeUsers);
  socket.on("start", () => {
    if (gameActive) {
      gameActive = false;
      socket.emit("gamestatus", gameActive);

      console.log("stopped");
      return;
    }
    gameActive = true;
    goal = Math.ceil(Math.random() * 1000);
    for (let i = 0; i < alternatives.length; i++) {
      alternatives[i] = Math.floor(Math.random() * 100);
    }
    io.emit("alternatives", alternatives);
    socket.emit("goal", goal);
    io.emit("gamestatus", gameActive);
    console.log("started!!");
  });
  socket.on("calculation", (data) => {
    if (!gameActive) return;
    let input = data.ans;
    let score = Math.abs(goal - input);
    users[data.usr].score = score;
    console.log(users);
    io.emit("users", users);
  });
  socket.on("name", (usrname) => {
    users[usrname] = { id: socket.id, score: Infinity };
    io.emit("users", users);
    console.log(users);
  });
  socket.on("disconnect", () => {
    for (let [key, value] of Object.entries(users)) {
      if (value.id == socket.id) {
        delete users[key];
        console.log(users);
      }
    }
    io.emit("users", users);

    activeUsers--;
    io.emit("userUpdate", activeUsers);
  });
});

server.listen(3000, () => {
  console.log("Server started on localhost:3000");
});

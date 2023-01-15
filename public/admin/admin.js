let socket = io();

let startButton = document.querySelector(".calculate");
let goal = document.querySelector("#calc");
let list = document.getElementById("playerlist");

socket.on("users", (users) => {
  console.log(users);
  let usernames = [];
  for (let [key, value] of Object.entries(users)) {
    let score = value.score;
    if (score == null) {
      score = "Infinity";
    }
    usernames.push(key + " - " + score);
  }
  list.innerHTML = "";
  usernames.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
});

socket.on("gamestatus", (active) => {
  if (active) {
    startButton.innerHTML = "Stop Game";
  } else {
    goal.innerHTML = "";
    startButton.innerHTML = "Start Game";
  }
});

startButton.addEventListener("click", () => {
  socket.emit("start");
});

socket.on("goal", (r) => {
  goal.innerText = r;
  console.log(r);
});

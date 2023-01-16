let socket = io();

let startButton = document.querySelector(".calculate");
let goal = document.querySelector("#calc");
let list = document.getElementById("playerlist");

socket.on("users", (users) => {
  console.log(users);
  let usernames = {};
  for (let [key, value] of Object.entries(users)) {
    let score = value.score;
    if (score == null) {
      score = Infinity;
    }
    usernames[key] = score;
  }
  let dict = usernames;
  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });
  
  // Sort the array based on the second element
  items.sort(function(first, second) {
    return  first[1] - second[1];
  });
  console.log(items);

  list.innerHTML = "";
  items.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item[0] + " - " + item[1];
    list.appendChild(li);
  });
});

socket.on("gamestatus", (active) => {
  if (active) {
    startButton.innerHTML = "Stop Game";
    startButton.style.background = "red";
  } else {
    goal.innerHTML = "";
    startButton.innerHTML = "Start Game";
    startButton.style.background = "lime";

  }
});

startButton.addEventListener("click", () => {
  socket.emit("start");
});

socket.on("goal", (r) => {
  goal.innerText = r;
  console.log(r);
});

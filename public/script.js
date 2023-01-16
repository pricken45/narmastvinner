let username = prompt("Välj ett namn:");

let socket = io();

let gameActive = false;

let usrcnt = document.querySelector("#usrcnt");
let title = document.querySelector("#title");

socket.on("username", () => {
  socket.emit("name", username);
});


socket.on("userUpdate", (users) => {
  usrcnt.innerHTML = "Users online: " + users;
});

let calc = document.querySelector(".calc");
let calculateButton = document.querySelector(".calculate");

let n1 = document.getElementById("alt1");
let n2 = document.getElementById("alt2");
let n3 = document.getElementById("alt3");
let n4 = document.getElementById("alt4");
socket.on("gamestatus", (alive) => {
  gameActive = alive;
  console.log(gameActive)
  if (alive) {
    title.innerText = "Närmast Vinner - Spelet Är Startat";
  } 
  if (alive == false) {
    title.innerText = "Närmast Vinner - Spelet Är Inte Startat";
    n1.innerHTML = 1;
    n2.innerHTML = 2;
    n3.innerHTML = 3;
    n4.innerHTML = 4;
    calc.innerHTML = "";
  }
});
let used = [false, false, false, false];

let latestIsNumber = false;

let c1 = document.getElementById("add");
let c2 = document.getElementById("sub");
let c3 = document.getElementById("mult");
let c4 = document.getElementById("div");

socket.on("alternatives", (alts) => {
  for (let i = 0; i < alts.length; i++) {
    switch (i) {
      case 0:
        n1.innerHTML = alts[0];
        break;
      case 1:
        n2.innerHTML = alts[1];
        break;
      case 2:
        n3.innerHTML = alts[2];
        break;
      case 3:
        n4.innerHTML = alts[3];
        break;
      default:
        break;
    }
  }
});

c1.addEventListener("click", () => {
  if (!gameActive) return;
  if (latestIsNumber == false) return;
  calc.innerHTML += c1.innerHTML;
  latestIsNumber = false;
});
c2.addEventListener("click", () => {
  if (!gameActive) return;
  if (latestIsNumber == false) return;

  calc.innerHTML += c2.innerHTML;
  latestIsNumber = false;
});
c3.addEventListener("click", () => {
  if (!gameActive) return;
  if (latestIsNumber == false) return;

  calc.innerHTML += c3.innerHTML;
  latestIsNumber = false;
});
c4.addEventListener("click", () => {
  if (!gameActive) return;
  if (latestIsNumber == false) return;

  calc.innerHTML += c4.innerHTML;
  latestIsNumber = false;
});

n1.addEventListener("click", () => {
  if (!gameActive) return;
  if (used[0] || latestIsNumber) return;
  calc.innerHTML += n1.innerHTML;
  used[0] = true;
  latestIsNumber = true;
});
n2.addEventListener("click", () => {
  if (!gameActive) return;
  if (used[1] || latestIsNumber) return;
  calc.innerHTML += n2.innerHTML;
  used[1] = true;
  latestIsNumber = true;
});
n3.addEventListener("click", () => {
  if (!gameActive) return;
  if (used[2] || latestIsNumber) return;
  calc.innerHTML += n3.innerHTML;
  used[2] = true;
  latestIsNumber = true;
});
n4.addEventListener("click", () => {
  if (!gameActive) return;
  if (used[3] || latestIsNumber) return;
  calc.innerHTML += n4.innerHTML;
  used[3] = true;
  latestIsNumber = true;
});

calculateButton.addEventListener("click", () => {
  if (!gameActive) return;
  used = [false, false, false, false];
  latestIsNumber = false;
  let equation = calc.innerHTML;
  let calculated = eval(equation);
  calc.innerHTML = calculated;
  socket.emit("calculation", { usr: username, ans: calculated });
});

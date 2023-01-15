let socket = io();

let calc = document.querySelector(".calc");

let n1 = document.getElementById("alt1");
let n2 = document.getElementById("alt2");
let n3 = document.getElementById("alt3");
let n4 = document.getElementById("alt4");

let c1 = document.getElementById("add");
let c2 = document.getElementById("sub");
let c3 = document.getElementById("mult");
let c4 = document.getElementById("div");

c1.addEventListener("click", ()=>{
    calc.innerHTML+=c1.innerHTML;
    console.log(c1.innerHTML);
})
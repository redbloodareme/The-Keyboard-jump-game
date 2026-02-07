const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "white";
ctx.font = "48px Arial";
ctx.fillText("MAIN MENU OK!", 400, 360);

console.log("main_menu.js loaded successfully");

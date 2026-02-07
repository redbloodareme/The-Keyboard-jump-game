console.log("MAIN MENU JS RUNNING");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

ctx.font = "48px Arial";

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillText("MAIN MENU", 480, 360);

  requestAnimationFrame(loop);
}

loop();

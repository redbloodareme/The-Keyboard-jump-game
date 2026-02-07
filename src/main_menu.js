console.log("MAIN MENU JS RUNNING");

const canvas = document.getElementById("game");
canvas.width = 1280;
canvas.height = 720;

const ctx = canvas.getContext("2d");
ctx.font = "48px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // text
  ctx.fillStyle = "white";
  ctx.fillText("MAIN MENU", canvas.width / 2, canvas.height / 2);

  requestAnimationFrame(loop);
}

loop();

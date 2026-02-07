const canvas = document.getElementById("game");
canvas.width = 1280;
canvas.height = 720;

const ctx = canvas.getContext("2d");
ctx.font = "40px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

const options = ["Solo", "Play with Friend"];
let selected = 0;

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    selected = (selected - 1 + options.length) % options.length;
  }
  if (e.key === "ArrowDown") {
    selected = (selected + 1) % options.length;
  }
  if (e.key === "Enter") {
    alert("Selected: " + options[selected]);
  }
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // title
  ctx.fillStyle = "white";
  ctx.font = "60px Arial";
  ctx.fillText("MAIN MENU", canvas.width / 2, 200);

  // options
  ctx.font = "40px Arial";
  options.forEach((opt, i) => {
    ctx.fillStyle = i === selected ? "yellow" : "white";
    const prefix = i === selected ? "> " : "  ";
    ctx.fillText(prefix + opt, canvas.width / 2, 350 + i * 60);
  });

  requestAnimationFrame(loop);
}

loop();

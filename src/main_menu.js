const bg = new Image();
bg.src = "./assets/menu_bg.png";
const canvas = document.getElementById("game"); 
canvas.width = 1280;
canvas.height = 720;

const ctx = canvas.getContext("2d");
ctx.textAlign = "center";
ctx.textBaseline = "middle";

const options = ["Solo", "Play with Friend"];
let selected = 0;

const menuY = 350;
const lineHeight = 60;
const hitWidth = 250;


// ===== KEYBOARD =====
document.addEventListener("keydown", (e) => {

  if (e.key === "ArrowUp") {
    selected = (selected - 1 + options.length) % options.length;
  }

  if (e.key === "ArrowDown") {
    selected = (selected + 1) % options.length;
  }

  if (e.key === "Enter") {
    chooseOption();
  }

});


// ===== MOUSE HOVER =====
canvas.addEventListener("mousemove", (e) => {

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  options.forEach((_, i) => {

    const y = menuY + i * lineHeight;
    const xCenter = canvas.width / 2;

    if (
      mouseX > xCenter - hitWidth &&
      mouseX < xCenter + hitWidth &&
      mouseY > y - 30 &&
      mouseY < y + 30
    ) {
      selected = i;
    }

  });

});


// ===== MOUSE CLICK =====
canvas.addEventListener("mousedown", (e) => {

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  options.forEach((_, i) => {

    const y = menuY + i * lineHeight;
    const xCenter = canvas.width / 2;

    if (
      mouseX > xCenter - hitWidth &&
      mouseX < xCenter + hitWidth &&
      mouseY > y - 30 &&
      mouseY < y + 30
    ) {
      selected = i;
      chooseOption();
    }

  });

});


function chooseOption() {
  alert("Selected: " + options[selected]);
}



// ===== RENDER =====
function loop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (bgImage.complete) {
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}
// ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = "white";
  ctx.font = "60px Arial";
  ctx.fillText("MAIN MENU", canvas.width / 2, 200);

  // Options
  ctx.font = "40px Arial";

  options.forEach((opt, i) => {

    ctx.fillStyle = i === selected ? "yellow" : "white";

    ctx.fillText(
      opt,
      canvas.width / 2,
      menuY + i * lineHeight
    );

  });

  requestAnimationFrame(loop);

}

loop();

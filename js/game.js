const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 40;

let cameraX = 0;
let cameraY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  render();
}

function render() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const worldViewportLeft = cameraX - canvas.width/(2*CELL_SIZE);
  const worldViewportTop = cameraY - canvas.height/(2*CELL_SIZE);

  const startX = Math.floor(worldViewportLeft);
  const startY = Math.floor(worldViewportTop);

  const endX = Math.ceil(worldViewportLeft + canvas.width/CELL_SIZE)
  const endY = Math.ceil(worldViewportTop + canvas.height/CELL_SIZE)

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      drawCell(x, y, worldViewportLeft, worldViewportTop);
    }
  }
}

function drawCell(x, y, worldLeft, worldTop) {
  const px = CELL_SIZE*(x - worldLeft);
  const py = CELL_SIZE*(y - worldTop);

  ctx.fillStyle = "#aaa";
  ctx.fillRect(
    px + 1,
    py + 1,
    CELL_SIZE - 2,
    CELL_SIZE - 2
  );

  ctx.strokeStyle = "#666";
  ctx.strokeRect(
    px + 0.5,
    py + 0.5,
    CELL_SIZE - 1,
    CELL_SIZE - 1
  );
}

window.addEventListener("resize", resizeCanvas);

let dragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

canvas.addEventListener("mousedown", (event) => {
  dragging = true;

  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
});

canvas.addEventListener("mousemove", (event) => {
  if (!dragging) return;

  const dx = event.clientX - lastMouseX;
  const dy = event.clientY - lastMouseY;

  cameraX -= dx/CELL_SIZE;
  cameraY -= dy/CELL_SIZE;

  lastMouseX = event.clientX;
  lastMouseY = event.clientY;

  render();
});

window.addEventListener("mouseup", () => {
  dragging = false;
})

resizeCanvas();

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const COLS = 10;
const ROWS = 10;
const CELL_SIZE = 40;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  render();
}

function render() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const fillWidth = COLS*CELL_SIZE;
  const fillHeight = ROWS*CELL_SIZE;

  const offsetX = Math.floor((canvas.width - fillWidth)/2);
  const offsetY = Math.floor((canvas.height - fillHeight)/2);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      drawCell(x, y, offsetX, offsetY);
    }
  }
}

function drawCell(x, y, offsetX, offsetY) {
  const px = offsetX + x * CELL_SIZE;
  const py = offsetY + y * CELL_SIZE;

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

resizeCanvas();

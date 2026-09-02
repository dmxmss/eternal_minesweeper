import { Camera } from "./game/Camera.js";
import { InputManager } from "./input/InputManager.js";
import { FieldRenderer } from "./render/FieldRenderer.js";

const CELL_SIZE = 40;
const DRAG_THRESHOLD = 10;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const go = new Go();

const result = await WebAssembly.instantiateStreaming(
  fetch("main.wasm"),
  go.importObject
);

go.run(result.instance);

const camera = new Camera(0, 0, 1, CELL_SIZE, canvas.width, canvas.height);
const fieldRenderer = new FieldRenderer(canvas, ctx, CELL_SIZE);

function onCameraMove(dx, dy) {
  camera.move(dx, dy);
  const [viewportLT, viewportBR] = camera.visibleRect();
  fieldRenderer.render(viewportLT.x, viewportLT.y, viewportBR.x, viewportBR.y);
}

const inputManager = new InputManager(
  canvas, 
  (x, y) => camera.screenToCell(x, y),
  DRAG_THRESHOLD
);

inputManager.onCellClick = (x, y) => {
  game.openCell(x, y);
  const buf = game.getRenderBuffer();
  console.log(buf);
};
inputManager.onCameraMove = onCameraMove;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.resizeViewport(canvas.width, canvas.height);

  const [viewportLT, viewportBR] = camera.visibleRect();
  fieldRenderer.render(viewportLT.x, viewportLT.y, viewportBR.x, viewportBR.y);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

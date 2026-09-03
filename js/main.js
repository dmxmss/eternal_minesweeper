import { Camera } from "./game/Camera.js";
import { InputManager } from "./input/InputManager.js";
import { FieldRenderer } from "./render/FieldRenderer.js";
import { Vector2 } from "./types/Vector2.js";

const CELL_SIZE = 32;
const DRAG_THRESHOLD = 10;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const go = new Go();

const result = await WebAssembly.instantiateStreaming(
  fetch("main.wasm"),
  go.importObject
);

go.run(result.instance);

const camera = new Camera(new Vector2(), 1, CELL_SIZE, new Vector2(canvas.width, canvas.height));
const fieldRenderer = new FieldRenderer(canvas, ctx, CELL_SIZE);

function onCameraMove(dx, dy) {
  camera.move(dx, dy);
  const [viewportLT, viewportBR] = camera.visibleRect();
  fieldRenderer.render(viewportLT, viewportBR, camera.zoom);
}

const inputManager = new InputManager(
  canvas, 
  (x, y) => camera.screenToCell(new Vector2(x, y)),
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

  camera.resizeViewport(new Vector2(canvas.width, canvas.height));

  const [viewportLT, viewportBR] = camera.visibleRect();
  fieldRenderer.render(viewportLT, viewportBR, camera.zoom);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

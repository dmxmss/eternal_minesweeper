import { Camera } from "./game/Camera.js";
import { FieldManager } from "./game/FieldManager.js";
import { InputManager } from "./input/InputManager.js";
import { FieldRenderer } from "./render/FieldRenderer.js";
import { Vector2 } from "./types/Vector2.js";
import { RenderBuffer } from "../binary/js/renderbuffer.js";

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

const renderBuffer = new RenderBuffer();
const camera = new Camera(new Vector2(), 1, CELL_SIZE, new Vector2(canvas.width, canvas.height));
const fieldManager = new FieldManager(game, renderBuffer);
const fieldRenderer = new FieldRenderer(canvas, ctx, CELL_SIZE, camera, fieldManager);

const inputManager = new InputManager(
  canvas, 
  (x, y) => camera.screenToCell(new Vector2(x, y)),
  DRAG_THRESHOLD
);

inputManager.onCellClick = (x, y) => {
  game.openCell(x, y);
  fieldManager.update();
  fieldRenderer.render();
};

inputManager.onCameraMove = (dx, dy) => {
  camera.move(dx, dy);
  fieldRenderer.render();
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  camera.resizeViewport(new Vector2(canvas.width, canvas.height));
  fieldRenderer.render();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

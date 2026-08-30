import { Camera } from "./game/Camera.js";
import { InputManager } from "./input/InputManager.js";
import { FieldRenderer } from "./render/FieldRenderer.js";

const CELL_SIZE = 40;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const go = new Go();

const result = await WebAssembly.instantiateStreaming(
  fetch("main.wasm"),
  go.importObject
);

go.run(result.instance);

const camera = new Camera(0, 0, 1, CELL_SIZE);
const fieldRenderer = new FieldRenderer(canvas, ctx, CELL_SIZE);

function onCameraMove(dx, dy) {
  camera.move(dx, dy);
  const [viewportLT, viewportBR] = camera.visibleRect();
  fieldRenderer.render(camera.x, camera.y, viewportLT.x, viewportLT.y, viewportBR.x, viewportBR.y);
}

const inputManager = new InputManager(canvas, camera.screenToCell);
inputManager.onCellClick = game.onCellClick;
inputManager.onCameraMove = onCameraMove;

const [viewportLT, viewportBR] = camera.visibleRect();
fieldRenderer.render(camera.x, camera.y, viewportLT.x, viewportLT.y, viewportBR.x, viewportBR.y);

import { Camera } from "./game/Camera.js";
import { InputManager } from "./input/InputManager.js";

const CELL_SIZE = 40;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const go = new Go();

const result = await WebAssembly.instantiateStreaming(
  fetch("main.wasm"),
  go.importObject
);

go.run(result.instance);

camera = new Camera(0, 0, 1, CELL_SIZE);

inputManager = new InputManager(canvas, camera.screenToCell);

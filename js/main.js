import { Camera } from "./game/Camera.js";

const CELL_SIZE = 40;

const go = new Go();

const result = await WebAssembly.instantiateStreaming(
  fetch("main.wasm"),
  go.importObject
);

go.run(result.instance);

camera = new Camera(0, 0, 1, CELL_SIZE);

import { Cell } from "../types/Cell.js";

export class Chunk {
  constructor(size, position) {
    this.position = position;
    this.size = size;
    this.cells = new Array(size*size);
    this.dirty = false;
  }

  get(x, y) {
    return this.cells[y * this.size + x] || new Cell("closed", 0);
  }

  set(x, y, cell) {
    this.cells[y * this.size + x] = cell;
  }
}

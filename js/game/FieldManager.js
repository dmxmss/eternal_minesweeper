import { mapItem } from "../../binary/js/renderbuffer.js";
import { Cell } from "../types/Cell.js";

export class FieldManager {
  constructor(game, renderBuffer) {
    this.game = game;
    this.renderBuffer = renderBuffer;
    this.renderCache = new Map(); // map of cells
  }

  getCell(position) {
    return this.renderCache.get(position.x, position.y) || new Cell(position.x, position.y, "closed");
  }

  update() {
    const buf = this.game.getRenderBuffer();
    const items = this.renderBuffer.read(buf);
    const cells = items.map(mapItem);

    for (const cell of cells) {
      this.renderCache.set(key(cell.x, cell.y), cell);
    }
  }
}

const key = (x, y) => `${x},${y}`;

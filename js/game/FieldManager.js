import { mapItem } from "../../binary/js/renderbuffer.js";
import { Cell } from "../types/Cell.js";
import { Chunk } from "../types/Chunk.js";

export class FieldManager {
  constructor(game, renderBuffer, chunkSize = 32) {
    this.game = game;
    this.renderBuffer = renderBuffer;
    this.renderCache = new Map(); // map of chunks
    this.chunkSize = chunkSize;
  }

  getChunk(position) {
    return this.renderCache.get(key(position.x, position.y)) || new Chunk(this.chunkSize, position);
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

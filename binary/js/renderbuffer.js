import { Cell } from "../../js/types/Cell.js";
import { Chunk } from "../../js/types/Chunk.js";
import { Vector2 } from "../../js/types/Vector2.js";

const CHUNK_SIZE = 32;
const HEADER_SIZE = 8;
const ITEM_SIZE = 16 + CHUNK_SIZE*CHUNK_SIZE;

const TYPE_CELL = 0;

const CELL_FLAGGED = 16;
const CELL_MINE = 32;
const CELL_CLOSED = 64;

export class RenderBuffer {
  constructor() {
    this.version = 0;
  }

  read(buffer) {
    const view = new DataView(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength
    );

    if (view.byteLength < HEADER_SIZE) {
      throw new Error("Render buffer is too small");
    }

    const version = view.getUint32(0, true);
    const itemCount = view.getUint32(4, true);

    const expectedSize =
      HEADER_SIZE + itemCount * ITEM_SIZE;

    if (view.byteLength < expectedSize) {
      throw new Error(
        `Invalid render buffer: expected ${expectedSize} bytes, ` +
        `got ${view.byteLength}`
      );
    }

    const items = new Array(itemCount);

    for (let i = 0; i < itemCount; i++) {
      const offset = HEADER_SIZE + i * ITEM_SIZE;

      const chunkX = view.getBigInt64(offset, true);
      const chunkY = view.getBigInt64(offset + 8, true);

      let cells = [];
      for (let i = 0; i < CHUNK_SIZE; i++) {
        const state = view.getUint8(offset + 16 + i);
        cells.push(state);
      }

      items[i] = {
        x: chunkX,
        y: chunkY,
        cells: cells,
      };
    }

    this.version = version;
    return items;
  }
}

export function mapCell(cellState) {
  let cellType = "";
  let minesAround = 0;
  switch (cellState) {
    case CELL_MINE:
      cellType = "mine";
      break
    case CELL_FLAGGED:
      cellType = "flagged";
      break
    case CELL_CLOSED:
      cellType = "closed";
      break
    default:
      cellType = "open";
      minesAround = cellState;
  }

  const cell = new Cell(cellType, minesAround);

  return cell;
}

export function mapChunk(bChunk) {
  const chunk = new Chunk(CHUNK_SIZE, new Vector2(bChunk.x, bChunk.y));

  for (let i = 0; i < bChunk.cells.length; i++) {
    const cell = mapCell(bChunk.cells[i]);

    const x = i % CHUNK_SIZE;
    const y = Math.floor(i / CHUNK_SIZE);

    chunk.set(x, y, cell);
  }

  return chunk
}

import { Cell } from "../../js/types/Cell.js";

const HEADER_SIZE = 8;
const ITEM_SIZE = 18;

const TYPE_CELL = 0;

const CELL_FLAGGED = 16;
const CELL_MINE = 32;

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

            const worldX = view.getBigInt64(offset, true);
            const worldY = view.getBigInt64(offset + 8, true);

            const type = view.getUint8(offset + 16);
            const state = view.getUint8(offset + 17);

            items[i] = {
                x: worldX,
                y: worldY,
                type,
                state,
            };
        }

        this.version = version;
        return items;
    }
}

export function mapItem(item) {
  if (item.type !== TYPE_CELL) return;

  let cellType = "";
  let minesAround = 0;
  switch (item.state) {
    case CELL_MINE:
      cellType = "mine";
    case CELL_FLAGGED:
      cellType = "flagged";
    default:
      cellType = "open";
      minesAround = item.state;
  }

  const cell = new Cell(item.x, item.y, type, minesAround);

  return cell;
}

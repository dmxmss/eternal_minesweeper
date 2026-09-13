import { Vector2 } from "../types/Vector2.js";

export class FieldRenderer {
  constructor(canvas, ctx, cellSize, camera, fieldManager, sprites) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.camera = camera;
    this.fieldManager = fieldManager;
    this.sprites = sprites;
  }

  render() {
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    let [viewportLT, viewportBR] = this.camera.visibleRect();

    const startX = Math.floor(viewportLT.x / this.fieldManager.chunkSize);
    const startY = Math.floor(viewportBR.y / this.fieldManager.chunkSize);

    const endX = Math.floor(viewportBR.x / this.fieldManager.chunkSize);
    const endY = Math.floor(viewportLT.y / this.fieldManager.chunkSize);

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const chunk = this.fieldManager.getChunk(new Vector2(x, y));

        this.drawChunk(chunk, viewportLT);
      }
    }
  }

  drawChunk(chunk, viewportLT) {
    for (let x = 0; x < this.fieldManager.chunkSize; x++) {
      for (let y = 0; y < this.fieldManager.chunkSize; y++) {
        const cell = chunk.get(x, y);
        const worldCellPos = new Vector2(x, y).add(chunk.position.mul(this.fieldManager.chunkSize));
        this.drawCell(worldCellPos, cell, viewportLT);
      }
    }
  }

  drawCell(cellPos, cell, viewportLT) {
    const px = this.camera.zoom*this.cellSize * (Number(cellPos.x) - viewportLT.x);
    const py = this.camera.zoom*this.cellSize * (viewportLT.y - Number(cellPos.y) - 1); // -1 is here because i set cell coordinates in left-bottom corner, but canvas uses left-top corner to draw rectangle

    if (cell.type === "closed") {
      this.ctx.fillStyle = "#aaa";
      this.ctx.fillRect(
        px + 1,
        py + 1,
        this.camera.zoom*(this.cellSize - 2),
        this.camera.zoom*(this.cellSize - 2)
      );

      this.ctx.strokeStyle = "#666";
      this.ctx.strokeRect(
        px + 0.5,
        py + 0.5,
        this.camera.zoom*(this.cellSize - 1),
        this.camera.zoom*(this.cellSize - 1)
      );
    } else if (cell.type === "mine") {
      this.ctx.fillStyle = "#aaa";
      this.ctx.fillRect(
        px + 1,
        py + 1,
        this.camera.zoom*(this.cellSize - 2),
        this.camera.zoom*(this.cellSize - 2)
      );
      this.ctx.drawImage(
        this.sprites.mine,
        px + 1,
        py + 1,
        this.camera.zoom*(this.cellSize - 1),
        this.camera.zoom*(this.cellSize - 1)
      );
    } else if (cell.type === "open") {
      this.ctx.fillStyle = "#eee";
      this.ctx.fillRect(
        px + 1,
        py + 1,
        this.camera.zoom*(this.cellSize - 2),
        this.camera.zoom*(this.cellSize - 2)
      );

      this.ctx.strokeStyle = "#666";
      this.ctx.strokeRect(
        px + 0.5,
        py + 0.5,
        this.camera.zoom*(this.cellSize - 1),
        this.camera.zoom*(this.cellSize - 1)
      );

      if (cell.value === 0) return;
      this.ctx.font = "bold 24px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "blue";
      this.ctx.fillText(
        `${cell.value}`,
        px + this.cellSize / 2,
        py + this.cellSize / 2
      );
    }
  }
}

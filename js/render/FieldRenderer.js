export class FieldRenderer {
  constructor(canvas, ctx, cellSize) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cellSize = cellSize;
  }

  render(cameraX, cameraY, worldViewportLeftTopX, worldViewportLeftTopY, worldViewportBottomRightX, worldViewportBottomRightY) {
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const startX = Math.floor(worldViewportLeftTopX);
    const startY = Math.ceil(worldViewportBottomRightY);

    const endX = Math.ceil(worldViewportBottomRightX);
    const endY = Math.floor(worldViewportLeftTopY);


    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        drawCell(x, y, worldViewportLeftTopX, worldViewportLeftTopY);
      }
    }
  }

  drawCell(x, y, worldViewportLeftTopX, worldViewportLeftTopY) {
    const px = cellSize*(x - worldViewportLeftTopX);
    const py = cellSize*(y - worldViewportLeftTopY);

    this.ctx.fillStyle = "#aaa";
    this.ctx.fillRect(
      px + 1,
      py + 1,
      this.cellSize - 2,
      this.cellSize - 2
    );

    this.ctx.strokeStyle = "#666";
    this.ctx.strokeRect(
      px + 0.5,
      py + 0.5,
      this.cellSize - 1,
      this.cellSize - 1
    );
  }
}

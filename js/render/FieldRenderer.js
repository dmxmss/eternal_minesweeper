export class FieldRenderer {
  constructor(canvas, ctx, cellSize) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cellSize = cellSize;
  }

  render(worldViewportLeftTop, worldViewportBottomRight, zoom=1) {
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const startX = Math.floor(worldViewportLeftTop.x);
    const startY = Math.floor(worldViewportBottomRight.y);

    const endX = Math.ceil(worldViewportBottomRight.x);
    const endY = Math.ceil(worldViewportLeftTop.y);

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        this.drawCell(x, y, worldViewportLeftTop, zoom);
      }
    }
  }

  drawCell(x, y, worldViewportLeftTop, zoom=1) {
    const px = zoom*this.cellSize*(x - worldViewportLeftTop.x);
    const py = zoom*this.cellSize*(worldViewportLeftTop.y - y - 1); // -1 is here because i set cell coordinates in left-bottom corner, but canvas uses left-top corner to draw rectangle

    this.ctx.fillStyle = "#aaa";
    this.ctx.fillRect(
      px + 1,
      py + 1,
      zoom*(this.cellSize - 2),
      zoom*(this.cellSize - 2)
    );

    this.ctx.strokeStyle = "#666";
    this.ctx.strokeRect(
      px + 0.5,
      py + 0.5,
      zoom*(this.cellSize - 1),
      zoom*(this.cellSize - 1)
    );
  }
}

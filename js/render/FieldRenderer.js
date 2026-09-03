export class FieldRenderer {
  constructor(canvas, ctx, cellSize, camera) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.camera = camera;
  }

  render() {
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const [viewportLT, viewportBR] = this.camera.visibleRect();

    const startX = Math.floor(viewportLT.x);
    const startY = Math.floor(viewportBR.y);

    const endX = Math.ceil(viewportBR.x);
    const endY = Math.ceil(viewportLT.y);

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        this.drawCell(x, y, viewportLT);
      }
    }
  }

  drawCell(x, y, viewportLT) {
    const px = this.camera.zoom*this.cellSize*(x - viewportLT.x);
    const py = this.camera.zoom*this.cellSize*(viewportLT.y - y - 1); // -1 is here because i set cell coordinates in left-bottom corner, but canvas uses left-top corner to draw rectangle

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
  }
}

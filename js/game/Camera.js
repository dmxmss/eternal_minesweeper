export class Camera {
  constructor(worldX, worldY, zoom, cellSize, viewportWidth, viewportHeight) {
    this.worldX = worldX;
    this.worldY = worldY;

    this.zoom = zoom;
    this.cellSize = cellSize;

    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
  }

  // handle camera move (dx, dy in px)
  move(dx, dy) {
    this.worldX -= dx/(CELL_SIZE*this.zoom);  
    this.worldY -= dy/(CELL_SIZE*this.zoom);  
  }

  // get cell world coordinates from screen coordinates
  screenToCell(screenX, screenY) {
    // viewport left-top corner coordinates
    const worldViewportX = this.worldX - this.viewportWidth/(2*this.cellSize);
    const worldViewportY = this.worldY - this.viewportHeight/(2*this.cellSize);

    // world coordinates relative to viewport left-top corner
    const worldX = x/this.cellSize;
    const worldY = -y/this.cellSize;

    // position relative to camera
    const localX = worldViewportX + worldX;
    const localY = worldViewportY + worldY;

    // world position
    const globalX = localX + this.worldX;
    const globalY = localY + this.worldY;

    return {
      x: Math.floor(globalX),
      y: Math.floor(globalY),
    }
  }
}

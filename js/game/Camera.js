export class Camera {
  constructor(worldX, worldY, zoom, cellSize) {
    this.worldX = worldX;
    this.worldY = worldY;

    this.zoom = zoom;
    this.cellSize = cellSize;
  }

  // handle camera move (dx, dy in px)
  move(dx, dy) {
    this.worldX -= dx/(CELL_SIZE*this.zoom);  
    this.worldY -= dy/(CELL_SIZE*this.zoom);  
  }
}

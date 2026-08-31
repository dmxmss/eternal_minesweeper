export class Camera {
  constructor(worldX, worldY, zoom, pixelsPerWorldUnit, viewportWidth, viewportHeight) {
    this.worldX = worldX;
    this.worldY = worldY;

    this.zoom = zoom;
    this.pixelsPerWorldUnit = pixelsPerWorldUnit;

    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
  }

  // handle camera move (dx, dy in px)
  move(dx, dy) {
    this.worldX -= dx/(this.pixelsPerWorldUnit*this.zoom);  
    this.worldY += dy/(this.pixelsPerWorldUnit*this.zoom);  
  }

  // get cell world coordinates from screen coordinates
  screenToCell(screenX, screenY) {
    // viewport left-top corner coordinates
    const worldViewportX = this.worldX - this.viewportWidth/(2*this.pixelsPerWorldUnit);
    const worldViewportY = this.worldY - this.viewportHeight/(2*this.pixelsPerWorldUnit);

    // world coordinates relative to viewport left-top corner
    const worldX = screenX/this.pixelsPerWorldUnit;
    const worldY = -screenY/this.pixelsPerWorldUnit;

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

  visibleRect() {
    const worldViewportLeftTopX = this.worldX - this.viewportWidth/(2*this.pixelsPerWorldUnit);
    const worldViewportLeftTopY = this.worldY + this.viewportHeight/(2*this.pixelsPerWorldUnit);

    const worldViewportRightBottomX = this.worldX + this.viewportWidth/(2*this.pixelsPerWorldUnit);
    const worldViewportRightBottomY = this.worldY - this.viewportHeight/(2*this.pixelsPerWorldUnit);

    return [
      {
        x: worldViewportLeftTopX,
        y: worldViewportLeftTopY
      },
      {
        x: worldViewportRightBottomX,
        y: worldViewportRightBottomY
      }
    ]
  }

  resizeViewport(newWidth, newHeight) {
    this.viewportWidth = newWidth;
    this.viewportHeight = newHeight;
  }
}

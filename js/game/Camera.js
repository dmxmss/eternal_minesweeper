import { Vector2 } from "../types/Vector2.js";

export class Camera {
  constructor(position, zoom, pixelsPerWorldUnit, viewportSize) {
    this.position = position;

    this.zoom = zoom;
    this.pixelsPerWorldUnit = pixelsPerWorldUnit;

    this.viewportSize = viewportSize;
  }

  // handle camera move (dx, dy in px)
  move(dx, dy) {
    this.position.x -= dx/(this.pixelsPerWorldUnit*this.zoom);  
    this.position.y += dy/(this.pixelsPerWorldUnit*this.zoom);  
  }

  // get cell world coordinates from screen coordinates
  screenToCell(screen) {
    // viewport left-top corner
    const worldViewportLeftTop = this.position.sub(
      new Vector2(this.viewportSize.x, -this.viewportSize.y)
        .div(2*this.pixelsPerWorldUnit)
    );

    // world coordinates relative to viewport left-top corner
    const world = new Vector2(screen.x, -screen.y).div(this.pixelsPerWorldUnit);

    // position relative to camera
    const local = worldViewportLeftTop.add(world);

    // world position
    const global = local.add(this.position);

    return new Vector2(
      Math.floor(global.x),
      Math.floor(global.y)
    )
  }

  visibleRect() {
    const viewportLeftTop = this.position.sub(
      new Vector2(this.viewportSize.x, -this.viewportSize.y)
        .div(2*this.pixelsPerWorldUnit*this.zoom)
    );

    const viewportBottomRight = this.position.sub(
      new Vector2(-this.viewportSize.x, this.viewportSize.y)
        .div(2*this.pixelsPerWorldUnit*this.zoom)
    );

    return [
      viewportLeftTop,
      viewportBottomRight
    ]
  }

  resizeViewport(v) {
    this.viewportSize = v;
  }
}

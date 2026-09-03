import { Vector2 } from "../types/Vector2.js";
 
export class InputManager {
  constructor(canvas, screenToCell, dragThreshold) {
    this.canvas = canvas;
    this.screenToCell = screenToCell;

    this.onCellClick = null;
    this.onCellRightClick = null;
    this.onMouseMove = null;
    this.onCameraMove = null;

    this.isDragging = false;
    this.isMouseDown = false;

    this.lastMouse = new Vector2();
    this.startMove = new Vector2();

    this.dragThreshold = dragThreshold;

    this.bindEvents();
  }

  bindEvents() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
    this.canvas.addEventListener("contextmenu", this.handleContextMenu);
  }

  handleMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    this.startMove = new Vector2(event.clientX, event.clientY);

    this.lastMouse = new Vector2(event.clientX, event.clientY);

    this.isDragging = false;
    this.isMouseDown = true;
  };

  handleMouseUp = (event)  => {
    if (event.button !== 0) return;

    if (!this.isDragging) {
      const cell = this.getCellFromEvent(event);

      if (cell && this.onCellClick) {
        this.onCellClick(cell.x, cell.y);
      }
    }

    this.isDragging = false;
    this.isMouseDown = false;
  };

  handleMouseMove = (event) => {
    const clientPos = new Vector2(event.clientX, event.clientY);

    if (this.onMouseMove) {
      const rect = this.canvas.getBoundingClientRect;

      const screenPos = clientPos.sub(
        new Vector2(rect.left, rect.top)
      );

      this.onMouseMove(screenPos.x, screenPos.y);
    }

    if (!this.isMouseDown) return;

    const drFromStart = clientPos.sub(this.startMove);
    
    const distance = drFromStart.length();

    if (!this.isDragging && distance >= this.dragThreshold ** 2) {
      this.isDragging = true;
    }

    if (!this.isDragging) {
      return;
    }

    const dr = clientPos.sub(this.lastMouse);

    this.lastMouse = clientPos;

    if (this.onCameraMove) {
      this.onCameraMove(dr.x, dr.y);
    }
  };

  handleMouseLeave = (event) => {
    this.isDragging = false;
  };

  handleContextMenu = (event) => {
    event.preventDefault();

    const cell = this.getCellFromEvent(event);

    if (cell && this.onCellRightClick) {
      this.onCellRightClick(cell.x, cell.y);
    }
  };

  getCellFromEvent(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clientPos = new Vector2(event.clientX, event.clientY);

    const screenPos = clientPos.sub(
      new Vector2(rect.left, rect.top)
    )

    return this.screenToCell(screenPos.x, screenPos.y);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mouseleave", this.handleMouseLeave);
    this.canvas.removeEventListener("contextmenu", this.handleContextMenu);
  }
}

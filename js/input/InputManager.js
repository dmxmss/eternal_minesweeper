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

    this.lastX = 0;
    this.lastY = 0;

    this.startX = 0;
    this.startY = 0;

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

    this.startX = event.clientX;
    this.startY = event.clientY;

    this.lastX = event.clientX;
    this.lastY = event.clientY;

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
    if (this.onMouseMove) {
      const rect = this.canvas.getBoundingClientRect;

      const screenX = event.clientX - rect.left;
      const screenY = event.clientY - rect.top;

      this.onMouseMove(screenX, screenY);
    }

    if (!this.isMouseDown) return;

    const dxFromStart = event.clientX - this.startX;
    const dyFromStart = event.clientY - this.startY;
    
    const distance = dxFromStart*dxFromStart + dyFromStart*dyFromStart;

    if (!this.isDragging && distance >= this.dragThreshold ** 2) {
      this.isDragging = true;
    }

    if (!this.isDragging) {
      return;
    }

    const dx = event.clientX - this.lastX;
    const dy = event.clientY - this.lastY;

    this.lastX = event.clientX;
    this.lastY = event.clientY;

    if (this.onCameraMove) {
      this.onCameraMove(dx, dy);
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

    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;

    return this.screenToCell(screenX, screenY);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mouseleave", this.handleMouseLeave);
    this.canvas.removeEventListener("contextmenu", this.handleContextMenu);
  }
}

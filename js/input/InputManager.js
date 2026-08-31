export class InputManager {
  constructor(canvas, screenToCell, clickThreshold) {
    this.canvas = canvas;
    this.screenToCell = screenToCell;

    this.onCellClick = null;
    this.onCellRightClick = null;
    this.onMouseMove = null;
    this.onCameraMove = null;

    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.clickThreshold = clickThreshold;

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
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;

    if (event.button === 0 || event.button === 1) {
      this.isDragging = true;
    }
  };

  handleMouseUp = (event)  => {
    if (event.button === 0 || event.button === 1) {
      this.isDragging = false;
    }

    if (event.button === 0) {
      const cell = this.getCellFromEvent(event);

      if (cell && this.onCellClick) {
        this.onCellClick(cell.x, cell.y);
      }
    }
  };

  handleMouseMove = (event) => {
    const rect = this.canvas.getBoundingClientRect;

    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;

    if (this.onMouseMove) {
      this.onMouseMove(screenX, screenY);
    }

    if (!this.isDragging) {
      return;
    }

    const dx = event.clientX - this.lastMouseX;
    const dy = event.clientY - this.lastMouseY;

    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;

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

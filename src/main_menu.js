console.log("MAIN MENU JS RUNNING");
import { SceneId } from "./scenes.js";

export class MainMenuScene {
  constructor({ sceneManager, getNow = () => performance.now() }) {
    this.sceneManager = sceneManager;
    this.getNow = getNow;
    this.modes = ["SOLO", "PLAY WITH FRIEND"];
    this.selectedIndex = 0;
    this.lastNavigationAt = 0;
    this.navigationCooldownMs = 180;
    this.isActive = false;
    this.viewport = { width: 1280, height: 720 };
    this.pointerHandlers = new Set();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
  }

  enter() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("pointerdown", this.handlePointerDown);
  }

  exit() {
    if (!this.isActive) {
      return;
    }
    this.isActive = false;
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("pointerdown", this.handlePointerDown);
  }

  setViewportSize(width, height) {
    this.viewport.width = width;
    this.viewport.height = height;
  }

  onPointer(handler) {
    this.pointerHandlers.add(handler);
    return () => this.pointerHandlers.delete(handler);
  }

  handleKeyDown(event) {
    const key = event.key;

    if (key === "Escape") {
      this.openSettings();
      return;
    }

    if (key === "Enter") {
      this.confirmSelection();
      return;
    }

    if (this.isNavigationKey(key)) {
      const direction = this.getNavigationDirection(key);
      this.moveSelection(direction);
    }
  }

  handlePointerDown(event) {
    const { offsetX, offsetY } = event;
    const { width, height } = this.viewport;
    const midX = width / 2;
    const selectionY = height * 0.55;
    const optionWidth = Math.min(420, width * 0.35);
    const optionHeight = 70;
    const leftBounds = {
      x: midX - optionWidth - 40,
      y: selectionY - optionHeight / 2,
      width: optionWidth,
      height: optionHeight,
    };
    const rightBounds = {
      x: midX + 40,
      y: selectionY - optionHeight / 2,
      width: optionWidth,
      height: optionHeight,
    };
    const confirmBounds = {
      x: midX - 140,
      y: height * 0.72,
      width: 280,
      height: 60,
    };
    const settingsBounds = {
      x: width - 180,
      y: 30,
      width: 150,
      height: 48,
    };

    if (this.pointInBounds(offsetX, offsetY, leftBounds)) {
      this.setSelection(0);
      this.confirmSelection();
      return;
    }

    if (this.pointInBounds(offsetX, offsetY, rightBounds)) {
      this.setSelection(1);
      this.confirmSelection();
      return;
    }

    if (this.pointInBounds(offsetX, offsetY, confirmBounds)) {
      this.confirmSelection();
      return;
    }

    if (this.pointInBounds(offsetX, offsetY, settingsBounds)) {
      this.openSettings();
    }
  }

  isNavigationKey(key) {
    return key === "ArrowLeft"
      || key === "ArrowRight"
      || key === "a"
      || key === "A"
      || key === "d"
      || key === "D";
  }

  getNavigationDirection(key) {
    if (key === "ArrowLeft" || key === "a" || key === "A") {
      return -1;
    }
    return 1;
  }

  moveSelection(direction) {
    const now = this.getNow();
    if (now - this.lastNavigationAt < this.navigationCooldownMs) {
      return;
    }
    this.lastNavigationAt = now;
    const nextIndex = (this.selectedIndex + direction + this.modes.length) % this.modes.length;
    this.selectedIndex = nextIndex;
  }

  setSelection(index) {
    if (index < 0 || index >= this.modes.length) {
      return;
    }
    this.selectedIndex = index;
  }

  confirmSelection() {
    const selectedMode = this.modes[this.selectedIndex];
    if (selectedMode === "SOLO") {
      this.sceneManager.changeScene(SceneId.SoloGame);
      return;
    }
    this.sceneManager.changeScene(SceneId.FriendGame);
  }

  openSettings() {
    this.sceneManager.changeScene(SceneId.Settings);
  }

  pointInBounds(x, y, bounds) {
    return x >= bounds.x
      && x <= bounds.x + bounds.width
      && y >= bounds.y
      && y <= bounds.y + bounds.height;
  }

  render(ctx) {
    const { width, height } = this.viewport;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0b0f19";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("KEYBOARD JUMP", width / 2, height * 0.25);

    ctx.font = "24px sans-serif";
    ctx.fillText("Select Mode", width / 2, height * 0.42);

    const midX = width / 2;
    const selectionY = height * 0.55;
    const optionWidth = Math.min(420, width * 0.35);
    const optionHeight = 70;

    this.modes.forEach((mode, index) => {
      const isSelected = index === this.selectedIndex;
      const x = index === 0 ? midX - optionWidth - 40 : midX + 40;
      const y = selectionY - optionHeight / 2;

      ctx.fillStyle = isSelected ? "#38bdf8" : "#1e293b";
      ctx.fillRect(x, y, optionWidth, optionHeight);

      ctx.fillStyle = isSelected ? "#0b0f19" : "#f8fafc";
      ctx.font = "22px sans-serif";
      ctx.fillText(mode, x + optionWidth / 2, selectionY + 8);
    });

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "18px sans-serif";
    ctx.fillText("Left/Right to switch • Enter to confirm", width / 2, height * 0.66);
    ctx.fillText("Esc for Settings", width / 2, height * 0.70);

    ctx.fillStyle = "#22c55e";
    ctx.fillRect(width / 2 - 140, height * 0.72, 280, 60);
    ctx.fillStyle = "#0b0f19";
    ctx.font = "20px sans-serif";
    ctx.fillText("START", width / 2, height * 0.72 + 38);

    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(width - 180, 30, 150, 48);
    ctx.fillStyle = "#0b0f19";
    ctx.font = "18px sans-serif";
    ctx.fillText("SETTINGS", width - 105, 62);
  }
}

const MovingObject = require("./moving_object.js");

window.MovingObject = MovingObject;

const mo = new MovingObject(
  { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
);

const callback = () => {
  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = 500;
  canvasEl.height = 500;
  const ctx = canvasEl.getContext('2d');
  mo.draw(ctx);
};

document.addEventListener('DOMContentLoaded', callback);

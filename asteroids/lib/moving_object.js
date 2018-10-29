function MovingObject(n) {
  this.pos = n.pos,
  this.vel = n.vel,
  this.radius = n.radius,
  this.color = n.color;
}

MovingObject.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 30;
  ctx.stroke();
  ctx.fillStyle = 'blue';
  ctx.fill();
};



module.exports = MovingObject;

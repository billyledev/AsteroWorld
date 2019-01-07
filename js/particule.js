export class Particule {
    constructor(x, y, vx, vy, size, color, life, ctx)
    {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
        this.life = life;
        this.ctx = ctx;
        this.exists = true;
        setTimeout((() => {
            this.exists = false;
        }).bind(this), life);
    }

    draw()
    {
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
        this.ctx.restore();

        this.move();
    }

    move()
    {
        this.x += this.vx;
        this.y += this.vy;
    }
}
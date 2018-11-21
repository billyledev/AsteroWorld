export class Tir{
    constructor(x,y,ctx){
        this.x=x;
        this.y=y;
        this.ctx=ctx;
        this.img = new Image();
        this.img.src = './js/Image/tir1.png';
    }
    
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y);
    }
}
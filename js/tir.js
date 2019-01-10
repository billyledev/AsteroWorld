export class Tir{
    constructor(x,y,orientation,ctx){
        this.x=x;
        this.y=y;
        this.orientation=orientation;
        this.ctx=ctx;
        this.img = new Image();
        this.vitesse=8;
        this.img.src = './js/Image/tir1.png';
    }
    
    move(){
        this.x+= this.vitesse*Math.cos(this.orientation);
        this.y+= this.vitesse*Math.sin(this.orientation);
        
    }
    
    draw(){
        this.move();
        this.ctx.drawImage(this.img, this.x, this.y);
        
    }
}
export class Asteroid {

  constructor(posX, posY, velo, assets, ctx) {
  	this.ctx = ctx;
  	this.assets = assets;
    this.posX = posX;
    this.posY = posY;
    this.width = assets.asteroidMedium.width;
    this.height = assets.asteroidMedium.height;
    this.calcOrientation();
    this.velo = velo;
    this.SizeEnum = {
	  SMALL: 1,
	  MEDIUM: 2,
	  LARGE: 3,
	  properties: {
	    1: {name: "small", value: 1, width:15, height:14, img: assets.asteroidSmall},
	    2: {name: "medium", value: 2, width:28, height:28, img: assets.asteroidMedium},
	    3: {name: "large", value: 3, width:56, height:56, img: assets.asteroidLarge}
	  }
	}; 
  }
  draw(){
  	this.move();
  	this.ctx.drawImage(this.assets.asteroidMedium, this.posX, this.posY);
  }
  move(){
  	this.posX += this.velo * Math.sin(this.orientation);
    this.posY -= this.velo * Math.cos(this.orientation);

    if(this.posX > this.ctx.canvas.clientWidth + this.width){
      this.posX = -(this.width);
      this.calcOrientation();
    } 
    else if(this.posX < -(this.width)){
      this.posX=(this.ctx.canvas.clientWidth + this.width);
      this.calcOrientation();
    } 

    if(this.posY > this.ctx.canvas.clientHeight + this.height){
      this.posY = -(this.height);
      this.calcOrientation();
    } 
    else if(this.posY < -(this.height)){
      this.posY = this.ctx.canvas.clientHeigh + this.height;
      this.calcOrientation();
    } 


  }
  calcOrientation(){
    let dx = this.posX - (this.ctx.canvas.clientWidth / 2);
    let dy = this.posY - (this.ctx.canvas.clientHeight / 2);
    this.orientation = Math.atan2(dy,dx) -Math.PI/2;
  }
  explosion(){

  }
}
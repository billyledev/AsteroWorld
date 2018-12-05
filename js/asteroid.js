export class Asteroid {

  constructor(posX, posY, velo, assets, ctx, size) {
  	this.ctx = ctx;
  	this.assets = assets;
    this.posX = posX;
    this.posY = posY;
    this.calcOrientation();
    this.velo = velo;
    this.SizeEnum = {
	  SMALL: {name: "small", value: 1, width:15, height:14, img: assets.asteroidSmall, score:15},
	  MEDIUM: {name: "medium", value: 2, width:28, height:28, img: assets.asteroidMedium, score:10},
	  LARGE: {name: "large", value: 3, width:56, height:56, img: assets.asteroidLarge, score:5}
	   };
    switch (size)
    {
      case this.SizeEnum.SMALL.name:
      {
        this.size = this.SizeEnum.SMALL;
        break;
      }
      case this.SizeEnum.MEDIUM.name:
      {
        this.size = this.SizeEnum.MEDIUM;
        break;
      }
      case this.SizeEnum.LARGE.name:
      {
        this.size = this.SizeEnum.LARGE;
        break;
      }
    }
    this.img = this.size.img;
    this.width = this.size.width;
    this.height = this.size.height;
    this.score = this.size.score;
    this.exist = true;
  }
  draw(){
  	this.move();
  	this.ctx.drawImage(this.img, this.posX, this.posY);
  }
  move(){
  	this.posX += this.velo * Math.sin(this.orientation);
    this.posY -= this.velo * Math.cos(this.orientation);

    //Change la direction pour ramener dans le canvas
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
  //Calcule l'angle 
  calcOrientation(){
    let dx = this.posX - (this.ctx.canvas.clientWidth / 2);
    let dy = this.posY - (this.ctx.canvas.clientHeight / 2);
    this.orientation = Math.atan2(dy,dx) -Math.PI/2;
  }
}
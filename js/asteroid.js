class Asteroid {

  constructor(posX, posY, velX, velY, assets) {
    this.posX = posX;
    this.posY = posY;
    this.orientation = Math.random();
    this.velX = velX;
    this.velY = velY;
    this.SizeEnum = {
	  SMALL: 1,
	  MEDIUM: 2,
	  LARGE: 3,
	  properties: {
	    1: {name: "small", value: 1, width:15, height:14, img: assets.asteroidSmall},
	    2: {name: "medium", value: 2, width:28, height:28, img:assets.asteroidMedium},
	    3: {name: "large", value: 3, width:56, height:56, img:assets.asteroidLarge}
	  }
	};
  }
}
class Asteroid {
	let posX,posY,vitesse;
	var SizeEnum = {
	  SMALL: 1,
	  MEDIUM: 2,
	  LARGE: 3,
	  properties: {
	    1: {name: "small", value: 1, width:15, height:14, img:},
	    2: {name: "medium", value: 2, width:28, height:28, img:},
	    3: {name: "large", value: 3, width:56, height:56, img:}
	  }
	};

  constructor(posX, posY, SizeEnum) {
    this.posX = posX;
    this.posY = posY;
    this.SizeEnum = SizeEnum;
  }
}
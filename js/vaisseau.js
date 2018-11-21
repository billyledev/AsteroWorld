import { Tir } from './tir.js';
export class Vaisseau{
    constructor(x,y,orientation,ctx,keyboard){
        this.x=x;
        this.y=y;
        this.ctx=ctx;
        this.orientation=orientation;
        this.keyboard=keyboard;       
        this.tir = [];
        this.img = new Image();
        this.img.src = './js/Image/Vaisseau.png';
        this.width=this.img.width;
        this.height=this.img.height;
        this.vitesse = 0;
    }
    
    draw(){
        this.tirer();
        this.ctx.save();
        this.avancer();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.orientation+Math.PI/2);
        this.ctx.translate(-16, -16);
        this.ctx.drawImage(this.img, 0, 0);
        //this.ctx.translate(16,16);
        this.tournerSurSoi();
        this.ctx.restore();
        for(let i = 0; i<this.tir.length; i++){
            if(this.tir != undefined){
                this.tir[i].draw();
            }
        }
            
    }
    
    tournerSurSoi(){
        //console.log(this.keyboard.keys);
        if(this.keyboard.keys.right){
           this.orientation+= 0.1;
        }
        if(this.keyboard.keys.left){
            this.orientation-=0.1;
        }
    }
    
    avancer(){
        if(this.keyboard.keys.up){
            this.vitesse = 2;
        }
        else{
            this.vitesse = 0;
        }
        
        
        this.x+= this.vitesse*Math.cos(this.orientation);
        this.y+= this.vitesse*Math.sin(this.orientation);
    }
    
    tirer(){
        if(this.keyboard.keys.down){
           //console.log("tir");
           
           this.tir.push(new Tir(this.x,this.y+15,this.orientation,this.ctx));
            
        }
    }
    
}
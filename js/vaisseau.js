import { Tir } from './tir.js';
import { Particule } from './particule.js';


export class Vaisseau{
    

    constructor(x,y,orientation,ctx,keyboard,assets,game){

        this.x=x;
        this.y=y;
        this.ctx=ctx;
        this.orientationVaisseau = orientation;
        this.orientationDeplacement=orientation;
        this.keyboard=keyboard; 
        this.assets = assets;     
        this.tir = [];

        this.img = assets.vaisseau5;

        this.width=32;
        this.height=32;
        this.vitesse = 0;
        this.game = game;
        
        this.peutTirer = true;
        let timer=true;
        this.particles = [];
        this.particlesColors = ['#f44242', '#f45f41', '#f47641', '#f49441', '#f4a941', '#f4be41', '#f4d641', '#f4ee41'];
    }
    

    draw(){
        this.tirer();
        this.ctx.save();
        this.avancer();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.orientationVaisseau+Math.PI/2);
        this.ctx.translate(-16, -16);
        
        if(this.game.vie==3){
            this.img = this.assets.vaisseau5;
        }
        if(this.game.vie==2){
            this.img = this.assets.vaisseau52;
        }
        if(this.game.vie==1){
            this.img = this.assets.vaisseau53;
        }
        this.ctx.drawImage(this.img, 0, 0);
        this.tournerSurSoi();
        this.ctx.restore();
        for(let i = 0; i<this.tir.length; i++){
            if(this.tir != undefined){
                this.tir[i].draw();
                if (this.tir[i].x>this.ctx.canvas.clientWidth || this.tir[i].x<0 || this.tir[i].y>this.ctx.canvas.clientHeight || this.tir[i].y<0){
                    this.tir.splice(i,1);
                }   
            }
        }   
        
        for (let i = 0; i < this.particles.length; i++)
        {
            if (this.particles[i].exists)
            {
                this.particles[i].draw();
            }
            else
            {
                this.particles.splice(i, 1);
            }
        }
    }
    
    
    tournerSurSoi(){
        if(this.keyboard.keys.right){
           this.orientationVaisseau+= 0.1;
        }
        if(this.keyboard.keys.left){
            this.orientationVaisseau-=0.1;
        }
    }
    
    avancer(){
        if(this.keyboard.keys.up){
            if (this.vitesse < 3)
            {
                this.vitesse += 0.08;
            }
            this.orientationDeplacement = this.orientationVaisseau;
            this.ejecterParticules();
        }
        else
        {
            if (this.vitesse > 0)
            {
                this.vitesse -= 0.02;
            }
        }
        if(this.x<0){
            this.vitesse=0;
            this.x=1;
        }
        if(this.x>640){
            this.vitesse=0;
            this.x=639;
        }
        if(this.y<0){
            this.vitesse=0;
            this.y=1;
        }
        if(this.y>480){
            this.vitesse=0;
            this.y=479;
        }
        
        this.x+= this.vitesse*Math.cos(this.orientationDeplacement);
        this.y+= this.vitesse*Math.sin(this.orientationDeplacement);
        
    }
    
    tirer(){
        if(this.keyboard.keys.space && this.peutTirer){
            this.assets.fire.play();
            this.tir.push(new Tir(this.x-4 + 8*Math.cos(this.orientationVaisseau),
                                    this.y-4 + 8*Math.sin(this.orientationVaisseau),
                                    this.orientationVaisseau,this.ctx));
            this.peutTirer = false;
            setTimeout((() => {
                this.peutTirer = true;
            }).bind(this), 250);
        }
    }

    ejecterParticules()
    {
        for (let i = 0; i < 10; i++)
        {
            let size = Math.random() * 3 + 1;
            let randomizer = (Math.random() * 90 - 45)*Math.PI/180;
            let life = Math.random() * 1500;
            let vx = -Math.cos(this.orientationDeplacement + randomizer);
            let vy = -Math.sin(this.orientationDeplacement + randomizer);
            let x = this.x + -16*Math.cos(this.orientationDeplacement);
            let y = this.y + -16*Math.sin(this.orientationDeplacement);
            let color = this.particlesColors[Math.floor(Math.random()*this.particlesColors.length)];
            this.particles.push(new Particule(x, y, vx, vy, size, color, life, this.ctx));
        }
    }
}
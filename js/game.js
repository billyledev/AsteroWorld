import { loadAssets } from './loader.js';
import { Keyboard } from './keyboard.js';
import { Asteroid} from './asteroid.js';
import { Menu } from './menu.js';

let assetsToLoad = {
    // nomImage: { url: 'https://example.org/image.png' }
    asteroidSmall: { url: './js/image/AsteroidSolo_small.png' },
    asteroidMedium: { url: './js/image/AsteroidSolo_medium.png' },
    asteroidLarge: { url: './js/image/AsteroidSolo_large.png' }
};

//Fonction appelée à la fin du chargement du DOM
window.addEventListener('load', () => {
    //On charge les ressources et on lance le jeu
    loadAssets(assetsToLoad, assets => {
        let game = new Game(assets);
        game.init();
    });
});

//Classe de gestion du jeu
class Game
{
    constructor(assets)
    {
        //On récupère les ressources chargées au lancement
        this.assets = assets;
        this.asteroids = [];
        this.wave= 1;

        //État du jeu (menu | game | scores)
        this.state = 'menu';
    }

    //Gère l'initialisation du jeu
    init()
    {
        //On récupère l'élément canvas
        this.canvas = document.querySelector('canvas');

        //On récupère la largeur et la hauteur du canvas
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        //On créé un contexte 2D à partir du canvas
        this.ctx = this.canvas.getContext('2d');

        this.keyboard = new Keyboard();

        //Création de l'asteroid du début
        this.createAsteroid(5,'large');
        this.checkWave();
        this.menu = new Menu(this.ctx, this.keyboard, state => { this.state = state});

        
        this.vaisseau = new Vaisseau(100,100,0,this.ctx,this.keyboard);
        this.tir = new Tir(100,150,this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }

    //Gère le dessin du jeu
    animate()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for(let i = 0; i<this.asteroids.length; i++){
            this.asteroids[i].draw();
        }
        switch (this.state)
        {
            case 'menu':
            {
                this.menu.draw();
                break;
            }

            case 'jeu':
            {
                break;
            }

            case 'scores':
            {
                break;
            }
        }

        this.vaisseau.draw();
        this.tir.draw();
        requestAnimationFrame(this.animate.bind(this));
        //draw();
        
    }

    createAsteroid(n, size){   
        for (let i=0;i<n * this.wave;i++){
            let posX = Math.random() * this.ctx.canvas.clientWidth ;
            let posY = Math.random() * this.ctx.canvas.clientHeight ;
            let velo =  2;
            this.asteroids.push(new Asteroid(posX, posY, velo, this.assets, this.ctx, size));
        }
    }
    checkWave(){
        if (this.asteroids.length == 0){
          this.wave+=1;
          this.createAsteroid(5,'large');
        }
        setTimeout(this.checkWave, 1000);
    }
    
}

class Vaisseau{
    constructor(x,y,orientation,ctx,keyboard){
        this.x=x;
        this.y=y;
        this.ctx=ctx;
        this.orientation=orientation;
        this.keyboard=keyboard;        
        this.img = new Image();
        this.img.src = './js/Image/Vaisseau.png';
        this.width=this.img.width;
        this.height=this.img.height;
    }
    
    draw(){
        this.ctx.save();
        this.ctx.rotate(this.orientation * Math.PI / 180);
        this.ctx.drawImage(this.img, 0, 0);
        this.ctx.translate(this.x,this.y);
        this.ctx.restore();
        this.tournerSurSoi();
    }
    
    tournerSurSoi(){
        //console.log(this.keyboard.keys);
        if(this.keyboard.keys.right){
           this.orientation++;
        }
        if(this.keyboard.keys.left){
            this.orientation--;
        }
        
    }
    
}

class Tir{
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
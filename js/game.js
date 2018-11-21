import { loadAssets } from './loader.js';
import { Keyboard } from './keyboard.js';
import { Asteroid} from './asteroid.js';
import { Menu } from './menu.js';
import { Vaisseau } from './vaisseau.js';
import { Tir } from './tir.js';

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
        this.score = 0;
        this.bestScore= [];
        this.end = false;
        this.vie = 3;

        //État du jeu (menu | game | scores)
        this.state = 'menu';
        this.checkWaveNb = 0;
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
                this.vaisseau.draw();
                break;
            }

            case 'scores':
            {
                break;
            }
        }
        
        requestAnimationFrame(this.animate.bind(this));
    }

    createAsteroid(n, size){   
        for (let i=0;i<n * this.wave;i++){
            let posX = Math.random() * this.ctx.canvas.clientWidth ;
            let posY = Math.random() * this.ctx.canvas.clientHeight ;
            let velo =  2;
            this.asteroids.push(new Asteroid(posX, posY, velo, this.assets, this.ctx, size));
        }
    }
    createAsteroid2(n, size, posX, posY){   
        for (let i=0;i<n * this.wave;i++){
            let velo =  2;
            this.asteroids.push(new Asteroid(posX, posY, velo, this.assets, this.ctx, size));
        }
    }
    checkWave(){
        if (this.asteroids.length == 0){
          this.wave+=1;
          this.createAsteroid(5,'large');
        }
        
        if (this.checkWaveNb % 3 == 0)
        {
            this.createAsteroid(1 * this.wave,'large');
        }

        this.checkWaveNb++;
        setTimeout(this.checkWave.bind(this), 1000);
    }

    checkAsteroids(){
        for(let i =0; i<this.asteroids.length;i++){
            if(!this.asteroids[i].exist){
                let posX = this.asteroids.posX;
                let posY = this.asteroids.posY;
                let size = this.asteroids.size;
                this.asteroids.splice(i,1);
                this.score += this.asteroids.size.score * wave;
                switch (this.asteroids.size.name){
                  case 'small':{
                    break;
                  }
                  case 'medium':{
                    createAsteroid2(2, 'small', posX, posY);
                    break;
                  }
                  case 'large':{
                    createAsteroid2(2, 'medium', posX, posY);
                    break;
                  }
                }
            }
        }
    }

    bestScore(){
        if(this.end == true){
            //ajouter le score au tableau
            this.bestScore.push(this.score);
            this.bestScore.sort();
            if (this.bestScore.length > 10){
                this.bestScore = this.bestScore.splice(10);
            }
            let bestscoreStr = JSON.stringify(this.bestScore);
            localStorage.setItem('bestScore',bestscoreStr);
        }
    }
    
}




import { loadAssets } from './loader.js';
import { Keyboard } from './keyboard.js';
import { Asteroid} from './asteroid.js';
import { Menu } from './menu.js';
import { Vaisseau } from './vaisseau.js';
import { Tir } from './tir.js';
import { ScoresScreen } from './scoresscreen.js';

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
        this.peutPerdreVie = true;

        //État du jeu (menu | game | scores)
        this.state = 'menu';
        this.checkWaveNb = 0;
        if (localStorage.getItem('highscores') == null)
        {
            localStorage.setItem('highscores', JSON.stringify([]));
        }
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
        let changeState = state => { this.state = state};
        this.menu = new Menu(this.ctx, this.keyboard, changeState);
        this.scoresScreen = new ScoresScreen(this.ctx, this.keyboard, changeState);
        
        this.vaisseau = new Vaisseau(100,100,0,this.ctx,this.keyboard);
        this.checkAsteroids();
        requestAnimationFrame(this.animate.bind(this));
    }

    //Gère le dessin du jeu
    animate()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);

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

                for(let i = 0; i<this.asteroids.length; i++){
                    this.asteroids[i].draw();
                }   
                break;
            }

            case 'scores':
            {
                this.scoresScreen.refreshScores();
                this.scoresScreen.draw();
                break;
            }
            case 'mort':
            {
                this.ctx.save();

                this.ctx.fillStyle = '#000000';
                this.ctx.fillRect(0,0,this.ctx.canvas.clientHeight,this.ctx.canvas.clientHeight);

                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.font = '34px Verdana';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Astero World', this.width / 2, 100);

                this.ctx.font = '26px Verdana';
                this.ctx.fillText("Vous etes mort", this.width / 2, 250 + 60);

                this.ctx.restore();
                break;
            }
        }
        this.collisionVaisseauAsteroide();
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
        if (this.checkWaveNb % 3 == 0 && this.checkWaveNb <= 30)
        {
            this.createAsteroid(1 * this.wave,'large');
        }

        this.checkWaveNb++;
        setTimeout(this.checkWave.bind(this), 1000);
    }
    
    collisionVaisseauAsteroide(){

        var vaisseau=this.vaisseau;
        this.asteroids.forEach(function(element) {
            if(vaisseau.x < element.posX+element.width && vaisseau.x > element.posX-element.width && vaisseau.y < element.posY+element.height && vaisseau.y > element.posY-element.height && this.peutPerdreVie){
                this.vie--;
                this.peutPerdreVie = false;
                if(this.vie <=0){
                    this.state = "mort";
                }
                setTimeout((() => {
                    this.peutPerdreVie = true;      
                }).bind(this),2000);
            }
        
        }.bind(this));
    }

    checkAsteroids(){
        for(let i =0; i<this.asteroids.length;i++){
            for (let z=0;z<this.vaisseau.tir.length;z++){
               // console.log("x:" + this.vaisseau.tir[z].x + "y:" + this.vaisseau.tir[z].y);
                if(this.asteroids[i].exist){
                    if(this.vaisseau.tir[z].x < this.asteroids[i].posX + this.asteroids[i].size.width && this.vaisseau.tir[z].x > this.asteroids[i].posX - this.asteroids[i].size.width && this.vaisseau.tir[z].y < this.asteroids[i].posY + this.asteroids[i].size.height && this.vaisseau.tir[z].y > this.asteroids[i].posY - this.asteroids[i].size.height){
                        let posX = this.asteroids[i].posX;
                        let posY = this.asteroids[i].posY;
                        let size = this.asteroids[i].size;
                      //  this.asteroids.splice(i,1);
                        this.vaisseau.tir.splice(z,1);
                        this.score += this.asteroids[i].score * this.wave;
                        switch (this.asteroids[i].size.name){
                          case 'small':{
                            break;
                          }
                          case 'medium':{
                            this.createAsteroid2(2, 'small', posX, posY);
                            break;
                          }
                          case 'large':{
                            this.createAsteroid2(2, 'medium', posX, posY);
                            break;
                          }
                        }
                        this.asteroids[i].exist = false;
                    }
                    
                }
            }
        }

        for (let i = 0; i<this.asteroids.length;i++)
        {
            if (!this.asteroids[i].exist)
            {
                this.asteroids.splice(i,1);
            }
        }
        setTimeout(this.checkAsteroids.bind(this), 50);
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




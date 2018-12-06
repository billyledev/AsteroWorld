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
    asteroidLarge: { url: './js/image/AsteroidSolo_large.png' },
    vaisseau: { url: './js/Image/Vaisseau.png' },
    //Ajoute tous les sons
    thrust: {url:'../sound/thrust.wav', buffer:false, loop:false, volume:0.9},
    fire: {url:'../sound/fire.wav', buffer:false, loop:false, volume:0.9},
    bangSmall: {url:'../sound/bangSmall.wav', buffer:false, loop:false, volume:0.9},
    bangMedium: {url:'../sound/bangMedium.wav', buffer:false, loop:false, volume:0.9},
    bangLarge: {url:'../sound/bangLarge.wav', buffer:false, loop:false, volume:0.9},
    //ajout des musiques du jeu
   // track1: {url:'../sound/travis-scott-5-tint-audio.mp3', buffer:false, loop:false, volume:0.2},
    
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
        
        this.vaisseau = new Vaisseau(this.width/2,this.height/2,0,this.ctx,this.keyboard,this.assets);
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
                this.collisionVaisseauAsteroide();
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
                this.ctx.fillRect(0,0,this.ctx.canvas.clientWidth,this.ctx.canvas.clientHeight);

                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.font = '34px Verdana';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Astero World', this.width / 2, 100);

                this.ctx.font = '26px Verdana';
                this.ctx.fillText("Vous etes mort", this.width / 2, 250 + 60);
                
               
                this.ctx.fillText("Votre score est", this.width / 4, 300 + 60);
                this.ctx.fillText(this.score, this.width / 2, 300 + 60);

                this.ctx.restore();
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
        if (this.checkWaveNb % 3 == 0 && this.checkWaveNb <= 30)
        {
            this.createAsteroid(1 * this.wave,'large');
        }

        this.checkWaveNb++;
        setTimeout(this.checkWave.bind(this), 1000);
    }
    
    collisionVaisseauAsteroide(){

        var vaisseau=this.vaisseau;
        document.getElementById("vie").innerHTML=this.vie;
        this.asteroids.forEach(function(element) {

            if((vaisseau.x - vaisseau.width/2 > element.posX && vaisseau.x - vaisseau.width/2 < element.posX + element.width &&
                vaisseau.y - vaisseau.height/2 > element.posY && vaisseau.y - vaisseau.height/2 < element.posY + element.height || //Point haut gauche
                
                vaisseau.x + vaisseau.width/2 > element.posX && vaisseau.x + vaisseau.width/2 < element.posX + element.width &&
                vaisseau.y + vaisseau.height/2 > element.posY && vaisseau.y + vaisseau.height/2 < element.posY + element.height || //Point bas droite
                
                vaisseau.x + vaisseau.width/2 > element.posX && vaisseau.x + vaisseau.width/2 < element.posX + element.width &&
                vaisseau.y - vaisseau.height/2 > element.posY && vaisseau.y - vaisseau.height/2 < element.posY + element.height || //Point haut droite
                
                vaisseau.x - vaisseau.width/2 > element.posX && vaisseau.x - vaisseau.width/2 < element.posX + element.width &&
                vaisseau.y + vaisseau.height/2 > element.posY && vaisseau.y + vaisseau.height/2 < element.posY + element.height) && //Point bas gauche
                this.peutPerdreVie)
            {
                this.vie--;
                this.peutPerdreVie = false;
                vaisseau.x=this.width/2;
                vaisseau.y=this.height/2;
                if(this.vie <= 0){
                    this.state = "mort";
                    let scores = JSON.parse(localStorage.getItem('highscores'));
                    scores.push(this.score);
                    scores.sort((a, b) => {
                        return b - a;
                    });
                    if (scores.length > 10){
                        scores.splice(10);
                    }
                    localStorage.setItem('highscores', JSON.stringify(scores));
                }
                setTimeout((() => {
                    this.peutPerdreVie = true;      
                }).bind(this),2000);
            }

            if (this.debug)
            {
                this.ctx.beginPath();
                this.ctx.fillStyle = '#FF0000';
                this.ctx.arc(vaisseau.x, vaisseau.y, 5, 0, 2*Math.PI, false);
                this.ctx.fill();
                this.ctx.strokeStyle = '#0000FF';
                this.ctx.strokeRect(vaisseau.x - vaisseau.width/2, vaisseau.y - vaisseau.width/2,
                    vaisseau.width, vaisseau.height);
                this.ctx.strokeStyle = '#00FF00';
                this.ctx.strokeRect(element.posX, element.posY, element.width, element.height);
            }
        }.bind(this));
    }

    checkAsteroids(){
        for(let i =0; i<this.asteroids.length;i++){
            for (let z=0;z<this.vaisseau.tir.length;z++){
                if(this.asteroids[i].exist){
                    if(this.vaisseau.tir[z].x < this.asteroids[i].posX + this.asteroids[i].size.width && this.vaisseau.tir[z].x > this.asteroids[i].posX - this.asteroids[i].size.width && this.vaisseau.tir[z].y < this.asteroids[i].posY + this.asteroids[i].size.height && this.vaisseau.tir[z].y > this.asteroids[i].posY - this.asteroids[i].size.height){
                        let posX = this.asteroids[i].posX;
                        let posY = this.asteroids[i].posY;
                        let size = this.asteroids[i].size;
                        this.vaisseau.tir.splice(z,1);
                        this.score += this.asteroids[i].score * this.wave;
                        document.getElementById("score").innerHTML=this.score;
                        switch (this.asteroids[i].size.name){
                          case 'small':{
                            this.assets.bangSmall.play();
                            break;
                          }
                          case 'medium':{
                            this.assets.bangMedium.play();
                            this.createAsteroid2(2, 'small', posX, posY);
                            break;
                          }
                          case 'large':{
                            this.assets.bangLarge.play();
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
}
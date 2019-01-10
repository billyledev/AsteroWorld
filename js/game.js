import { loadAssets } from './loader.js';
import { Keyboard } from './keyboard.js';
import { Asteroid} from './asteroid.js';
import { Menu } from './menu.js';
import { Vaisseau } from './vaisseau.js';
//import { Tir } from './tir.js';
import { ScoresScreen } from './scoresscreen.js';
import { Particule } from './particule.js';

let assetsToLoad = {
    // nomImage: { url: 'https://example.org/image.png' }
    asteroidSmall: { url: './js/image/AsteroidSolo_small.png' },
    asteroidMedium: { url: './js/image/AsteroidSolo_medium.png' },
    asteroidLarge: { url: './js/image/AsteroidSolo_large.png' },
    vaisseau5: { url: './js/Image/Vaisseau5.png' },
    vaisseau52: { url: './js/Image/Vaisseau5_2.png' },
    vaisseau53: { url: './js/Image/Vaisseau5_3.png' },
    //Ajoute tous les sons
    thrust: {url:'./sound/thrust.wav', buffer:false, loop:false, volume:0.9},
    fire: {url:'./sound/fire.wav', buffer:false, loop:false, volume:0.9},
    bangSmall: {url:'./sound/bangSmall.wav', buffer:false, loop:false, volume:0.9},
    bangMedium: {url:'./sound/bangMedium.wav', buffer:false, loop:false, volume:0.9},
    bangLarge: {url:'./sound/bangLarge.wav', buffer:false, loop:false, volume:0.9},
    //ajout de la musique du jeu
    track1: {url:'./sound/disfigure-blank-ncs-release.mp3', buffer:false, loop:true, volume:0.05},
    
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
        this.wave= 0;
        this.score = 0;
        this.bestScore= [];
        this.end = false;
        this.vie = 3;
        this.peutPerdreVie = false;
        this.peutAppuyerTouche = false;

        this.particles = [];
        this.particlesColorsAsteroid = ['#9A9A9A', '#BBBBBB', '#D4D4D4', '#898989'];
        this.particlesColorsVaisseau = ['#f44242', '#f45f41', '#f47641', '#f49441', '#f4a941', '#f4be41', '#f4d641', '#f4ee41'];

        this.wiggleNb = 0;

        //État du jeu (menu | game | scores)
        this.state = 'menu';
        this.checkWaveNb = 1;
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

        this.vaisseau = new Vaisseau(this.ctx.canvas.clientWidth/2,this.ctx.canvas.clientHeight/2,0,this.ctx,this.keyboard,this.assets,this);

        //Création de l'asteroid du début
        //this.createAsteroid(2,'large');
        this.checkWave();
        let changeState = state => { this.state = state};
        this.menu = new Menu(this.ctx, this.keyboard, changeState, this);
        this.scoresScreen = new ScoresScreen(this.ctx, this.keyboard, changeState, this.menu);

        this.assets.track1.play();
        setTimeout((() => {
            this.peutPerdreVie = true;      
        }).bind(this),2000);

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
                
                this.ctx.fillText("Votre score est " + this.score, this.width / 2, 300 + 60);
            

                this.ctx.restore();

                if (this.keyboard.keys.space && this.peutAppuyerTouche)
                {
                    this.state = 'menu';
                    this.peutAppuyerTouche = false;
                    this.score = 0;
                    this.asteroids = [];
                    this.wave = 1;
                    //this.createAsteroid(2,'large');

                    this.menu.canPressKey = false;
                    this.menu.setKeyboardTimeout(500);
                }

                break;  
            }
        }
        
        requestAnimationFrame(this.animate.bind(this));
    }

    createAsteroid(n, size){   
        for (let i=0;i<n;i++){
            let posX, posY;

            let randomPos = Math.floor(Math.random()*2);
            if (randomPos == 0)
            {
                posX = - Math.random() * 200 ;
                posY = Math.random() * this.ctx.canvas.clientHeight ;
            }
            else if (randomPos == 1)
            {
                posX = Math.random() * this.ctx.canvas.clientWidth + 200 ;
                posY = - Math.random() * this.ctx.canvas.clientHeight ;
            }
            else if (randomPos == 2)
            {
                posX = Math.random() * this.ctx.canvas.clientWidth ;
                posY = - Math.random() * 200;
            }
            else
            {
                posX = Math.random() * this.ctx.canvas.clientWidth ;
                posY = - Math.random() * this.ctx.canvas.clientHeight + 200 ;
            }
            let velo =  2;
            this.asteroids.push(new Asteroid(posX, posY, velo, this.assets, this.ctx, size, 0));
        }
    }
    createAsteroid2(size, posX, posY, orientation){
        let velo = 2;
        let randomizer = (Math.random() * 45)*Math.PI/180;

        this.asteroids.push(new Asteroid(posX, posY, velo, this.assets, this.ctx, size, (orientation+randomizer)+Math.PI/2));
        this.asteroids.push(new Asteroid(posX, posY, velo, this.assets, this.ctx, size, (orientation-randomizer)+Math.PI/2));
    }
    checkWave(){
        if (this.asteroids.length == 0){
          this.createAsteroid(this.wave * 2,'large');
          this.wave += 1;
        }
        /*if (this.wave % 3 == 0 && this.wave <= 30)
        {
            this.createAsteroid(1 * this.wave,'large');
        }*/
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

                switch (element.size.name)
                {
                    case 'large':
                    {
                        this.assets.bangLarge.play();
                        this.wiggleScreen(0, 0, false, 20, 40);
                        this.createAsteroid2('medium', element.posX, element.posY, vaisseau.orientationDeplacement);
                        this.ejecterParticules(element.posX, element.posY, 240, 6);
                        break;
                    }

                    case 'medium':
                    {
                        this.assets.bangMedium.play();
                        this.wiggleScreen(0, 0, false, 20, 20);
                        this.createAsteroid2('small', element.posX, element.posY, vaisseau.orientationDeplacement);
                        this.ejecterParticules(element.posX, element.posY, 120, 6);
                        break;
                    }

                    case 'small':
                    {
                        this.assets.bangSmall.play();
                        this.wiggleScreen(0, 0, false, 10, 10);
                        this.ejecterParticules(element.posX, element.posY, 60, 3);
                        break;
                    }        
                }
                element.exist = false;

                this.peutPerdreVie = false;
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
                    this.vie = 3;
                    this.vaisseau.vitesse = 0;
                    this.vaisseau.tir = [];
                    setTimeout((() => {
                        this.peutAppuyerTouche = true;
                    }).bind(this), 1000);
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
                        let tirOrientation = this.vaisseau.tir[z].orientation;
                        this.vaisseau.tir.splice(z,1);
                        this.score += this.asteroids[i].score * this.wave;
                        document.getElementById("score").innerHTML=this.score;
                        switch (size.name){
                          case 'small':{
                            this.assets.bangSmall.play();
                            this.ejecterParticules(posX, posY, 60, 3);
                            break;
                          }
                          case 'medium':{
                            this.assets.bangMedium.play();
                            this.createAsteroid2('small', posX, posY, tirOrientation);
                            this.ejecterParticules(posX, posY, 120, 6);
                            break;
                          }
                          case 'large':{
                            this.assets.bangLarge.play();
                            this.createAsteroid2('medium', posX, posY, tirOrientation);
                            this.ejecterParticules(posX, posY, 240, 6);
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

    ejecterParticules(x, y, nb, size)
    {
        for (let i = 0; i < nb; i++)
        {
            size = Math.random() * size + 1;
            let randomizer = (Math.random() * 360)*Math.PI/180;
            let life = Math.random() * 1500;
            let vx = -Math.cos(randomizer);
            let vy = -Math.sin(randomizer);
            x = x + Math.cos(randomizer);
            y = y + Math.sin(randomizer);
            let color = this.particlesColorsAsteroid[Math.floor(Math.random()*this.particlesColorsAsteroid.length)];
            this.particles.push(new Particule(x, y, vx, vy, size, color, life, this.ctx));
        }
    }

    wiggleScreen(wiggleX, wiggleY, wiggleBack, wiggleSize, wiggleTimeout)
    {
        if ((wiggleX == 0 && wiggleY == 0) || wiggleBack == false)
        {
            wiggleX = Math.random() * wiggleSize + 1;
            wiggleY = Math.random() * wiggleSize + 1;
        }

        if (wiggleBack)
        {
            wiggleX = -wiggleX;
            wiggleY = -wiggleY;
        }

        if (this.wiggleNb < 20 && this.vie > 0)
        {
            this.ctx.translate(wiggleX, wiggleY);

            setTimeout((() => {
                this.wiggleScreen(wiggleX, wiggleY, !wiggleBack, wiggleSize, wiggleTimeout);
            }).bind(this), wiggleTimeout);

            this.wiggleNb++;
        }
        else
        {
            this.wiggleNb = 0;
        }
    }
}
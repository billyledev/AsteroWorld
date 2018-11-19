import { loadAssets } from './loader.js';
import { Keyboard } from './keyboard.js';

let assetsToLoad = {
    // nomImage: { url: 'https://example.org/image.png' }
    asteroidSmall: { url: '/image/AsteroidSolo_small.png' };
    asteroidMedium: { url: '/image/AsteroidSolo_medium.png' };
    asteroidLarge: { url: '/image/AsteroidSolo_large.png' };
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

        requestAnimationFrame(this.animate.bind(this));
    }

    //Gère le dessin du jeu
    animate()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for(let i = 0; i<asteroids.length(); i++){
            this.asteroids.draw();
        }

        requestAnimationFrame(this.animate.bind(this));
        //draw();
    }
    createAsteroid(n){       
        for (let i=0;i<n;i++){
            let posX = Math.random() * this.canvasHeight ;
            let posY = Math.random() * this.canvasHeight ;
            let veloX = (Math.random() * 10) - 5;
            let veloY = (Math.random() * 10) - 5;
            asteroids.push(new Asteroid(posX, posY, veloX, veloY, this.assets));
        }
    }
    
}
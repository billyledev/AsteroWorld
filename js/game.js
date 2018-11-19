import { loadAssets } from './loader.js';
import { Keyboard } from './keyboard.js';

let assetsToLoad = {
    // nomImage: { url: 'https://example.org/image.png' }
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
        requestAnimationFrame(this.animate.bind(this));
        //draw();
    }
    createAsteroid(let n){
        var astro = new Asteroid();
        for (let i=0;i<n;i++){
            asto.posX = Math.random() * this.canvasHeight ;
            asto.posY = Math.random() * this.canvasHeight ;
        }
=======
>>>>>>> master
    }
    
}
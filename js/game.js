//Fonction appelée à la fin du chargement du DOM
window.addEventListener('load', () => {
    //On créé une nouvelle instance du jeu
    let game = new Game();
    game.init();
});

//Classe de gestion du jeu
class Game
{
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

        requestAnimationFrame(this.animate.bind(this));
    }

    //Gère le dessin du jeu
    animate()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);

        requestAnimationFrame(this.animate.bind(this));
    }
}
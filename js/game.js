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
    
    //Samuel
    /*function draw() {
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
      };
      img.src = '/Image/Vaisseau';
    }*/
}

//Gestion du clavier
//https://hacks.mozilla.org/2017/03/internationalize-your-keyboard-controls/

class Keyboard
{
    constructor()
    {
        //Touches utilisées dans le jeu
        this.keys = {
            up: false,
            left: false,
            down: false,
            right: false
        };

        //Touche enfoncée
        document.addEventListener('keydown', event => {
            if (event.defaultPrevented)
            {
                return;
            }

            //Garde les racourcis clavier du navigateur
            if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey)
            {
                return;
            }

            //Utilisation de code qui ne dépend pas de la disposition du clavier
            switch (event.code)
            {
                case 'KeyW':
                {
                    this.keys.up = true;
                    break;
                }

                case 'KeyA':
                {
                    this.keys.left = true;
                    break;
                }

                case 'KeyS':
                {
                    this.keys.down = true;
                    break;
                }

                case 'KeyD':
                {
                    this.keys.right = true;
                    break;
                }

                default:
                {
                    return;
                }
            }

            event.preventDefault();
        });

        //Touche relâchée
        window.addEventListener('keyup', event => {
            if (event.defaultPrevented)
            {
                return;
            }

            //Utilisation de code qui ne dépend pas de la disposition du clavier
            switch (event.code)
            {
                case 'KeyW':
                {
                    this.keys.up = false;
                    break;
                }

                case 'KeyA':
                {
                    this.keys.left = false;
                    break;
                }

                case 'KeyS':
                {
                    this.keys.down = false;
                    break;
                }

                case 'KeyD':
                {
                    this.keys.right = false;
                    break;
                }

                default:
                {
                    return;
                }
            }

            event.preventDefault();
        });
    }
}
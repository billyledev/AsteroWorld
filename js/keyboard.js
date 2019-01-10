//Gestion du clavier
//https://hacks.mozilla.org/2017/03/internationalize-your-keyboard-controls/

export class Keyboard
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
                case 'KeyW': case 'ArrowUp':
                {
                    this.keys.up = true;
                    break;
                }

                case 'KeyA': case 'ArrowLeft':
                {
                    this.keys.left = true;
                    break;
                }

                case 'KeyS': case 'ArrowDown':
                {
                    this.keys.down = true;
                    break;
                }

                case 'KeyD': case 'ArrowRight':
                {
                    this.keys.right = true;
                    break;
                }

                case 'Space':
                {
                    this.keys.space = true;
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
                case 'KeyW': case 'ArrowUp':
                {
                    this.keys.up = false;
                    break;
                }

                case 'KeyA': case 'ArrowLeft':
                {
                    this.keys.left = false;
                    break;
                }

                case 'KeyS': case 'ArrowDown':
                {
                    this.keys.down = false;
                    break;
                }

                case 'KeyD': case 'ArrowRight':
                {
                    this.keys.right = false;
                    break;
                }

                case 'Space':
                {
                    this.keys.space = false;
                    break;
                }

                default:
                {
                    console.log(event.code);
                    return;
                }
            }

            event.preventDefault();
        });
    }
}
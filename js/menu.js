export class Menu
{
    constructor(ctx, keyboard, changeState, game)
    {
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.width = this.ctx.canvas.clientWidth;
        this.height = this.ctx.canvas.clientHeight;
        this.changeState = changeState;
        //Time between keypress
        this.timeout = 200;

        this.game = game;

        //Indique l'élément sélectionné dans le menu
        this.selected = 0;
        this.elements = [
            'Jouer',
            'Scores',
            'Boutique',
            'Quitter'
        ];
        this.canPressKey = true;
    }

    checkKeyboard()
    {
        if (this.keyboard.keys.up && this.canPressKey)
        {
            this.selected--;
            this.canPressKey = false;
            this.setKeyboardTimeout(this.timeout);
        }
        
        if (this.keyboard.keys.down && this.canPressKey)
        {
            this.selected++;
            this.canPressKey = false;
            this.setKeyboardTimeout(this.timeout);
        }

        if (this.selected < 0)
        {
            this.selected = this.elements.length - 1;
        }

        if (this.selected > this.elements.length - 1)
        {
            this.selected = 0;
        }

        if (this.keyboard.keys.space && this.canPressKey)
        {
            switch (this.selected)
            {
                case 0:
                {
                    this.changeState('jeu');
                    setTimeout((() => {
                        this.game.vaisseau.peutTirer = true;
                    }).bind(this), 200);            
                    break;
                }

                case 1:
                {
                    this.changeState('scores');
                    setTimeout((() => {
                        this.game.scoresScreen.canPressKey = true;
                    }).bind(this), 200);
                    break;
                }

                case 2:
                {
                    this.changeState('boutique');
                    this.game.shop.canPressKey = false;
                    setTimeout((() => {
                        this.game.shop.canPressKey = true;
                    }).bind(this), 200);
                    break;
                }

                case 3:
                {
                    document.location.href = 'http://google.fr';
                    break;
                }
            }
        }
    }

    setKeyboardTimeout(timeout)
    {
        setTimeout(() => {
            this.canPressKey = true;
        }, timeout);
    }

    draw()
    {
        this.checkKeyboard();

        this.ctx.save();

        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '34px Verdana';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Astero World', this.width / 2, 100);

        this.ctx.font = '26px Verdana';
        for (let i = 0; i < this.elements.length; i++)
        {
            this.ctx.fillStyle = (this.selected == i ? '#888888' : '#FFFFFF');
            this.ctx.fillText(this.elements[i], this.width / 2, 250 + 60 * i);
        }

        this.ctx.restore();
    }
}
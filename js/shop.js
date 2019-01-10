export class Shop
{
    constructor(ctx, game)
    {
        this.ctx = ctx;
        this.width = this.ctx.canvas.clientWidth;
        this.height = this.ctx.canvas.clientHeight;
        this.game = game;
        this.selected = 0;
        this.vaisseaux = [
            this.game.assets.vaisseau1,
            this.game.assets.vaisseau2,
            this.game.assets.vaisseau3,
            this.game.assets.vaisseau4,
            this.game.assets.vaisseau5
        ];
        this.timeout = 200;
        this.canPressKey = false;
    }

    checkKeyboard()
    {
        if (this.game.keyboard.keys.left && this.canPressKey)
        {
            this.selected--;
            this.canPressKey = false;
            this.setKeyboardTimeout(this.timeout);
        }
        
        if (this.game.keyboard.keys.right && this.canPressKey)
        {
            this.selected++;
            this.canPressKey = false;
            this.setKeyboardTimeout(this.timeout);
        }

        if (this.selected < 0)
        {
            this.selected = this.vaisseaux.length - 1;
        }

        if (this.selected > this.vaisseaux.length - 1)
        {
            this.selected = 0;
        }

        if (this.game.keyboard.keys.space && this.canPressKey)
        {
            if (this.game.achats.indexOf(this.selected + 1) == -1)
            {
                let price = ((this.selected + 1) * 13259);

                if (this.game.pieces >= price)
                {
                    this.game.achats.push(this.selected + 1);
                    localStorage.setItem('achats', JSON.stringify(this.game.achats));

                    this.game.pieces -= price;
                    localStorage.setItem('pieces', this.game.pieces);
                    document.getElementById('pieces').innerText = this.game.pieces;

                    this.canPressKey = false;
                    this.setKeyboardTimeout(this.timeout);
                }
            }
            else
            {
                this.game.vaisseauActuel = (this.selected + 1);
                localStorage.setItem('vaisseauActuel', this.game.vaisseauActuel);

                this.game.menu.canPressKey = false;
                this.game.menu.setKeyboardTimeout(500);
                this.game.state = 'menu';
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
        this.ctx.fillText('Boutique', this.width / 2, 100);

        this.ctx.font = '18px Verdana';
        this.ctx.fillText('Vaisseau ' + (this.selected + 1), this.width / 2, 200);
        this.ctx.drawImage(this.vaisseaux[this.selected], this.width / 2 - 16, 224);

        if (this.game.achats.indexOf(this.selected + 1) == -1)
        {
            this.ctx.fillText('Acheter pour ' + ((this.selected + 1) * 13259) + ' pièces', this.width / 2, 296);
        }

        if ((this.selected + 1) == this.game.vaisseauActuel)
        {
            this.ctx.fillText('Vaisseau actuel', this.width / 2, 296);
        }

        this.ctx.restore();
    }
}
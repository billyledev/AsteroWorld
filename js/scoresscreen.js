export class ScoresScreen
{
    constructor(ctx, keyboard, changeState, menu)
    {
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.width = this.ctx.canvas.clientWidth;
        this.height = this.ctx.canvas.clientHeight;
        this.changeState = changeState;
        this.canPressKey = false;
        this.menu = menu;
        this.refreshScores();
    }

    checkKeyboard()
    {
        if (this.keyboard.keys.space && this.canPressKey)
        {
            this.menu.canPressKey = false;
            this.menu.setKeyboardTimeout(200);

            this.changeState('menu');
            this.canPressKey = false;
        }
    }
    
    refreshScores()
    {
        this.highscores = JSON.parse(localStorage.getItem('highscores'));
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
        this.ctx.fillText('High Scores', this.width / 2, 100);

        this.ctx.font = '18px Verdana';
        for (let i = 0; i < this.highscores.length; i++)
        {
            this.ctx.fillText(this.highscores[i], this.width / 2, 200 + 26 * i);
        }

        this.ctx.restore();
    }
}
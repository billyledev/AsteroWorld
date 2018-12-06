export class ScoresScreen
{
    constructor(ctx, keyboard, changeState)
    {
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.width = this.ctx.canvas.clientWidth;
        this.height = this.ctx.canvas.clientHeight;
        this.changeState = changeState;
        this.refreshScores();
    }

    checkKeyboard()
    {
        if (this.keyboard.keys.left)
        {
            this.changeState('menu');
        }
    }
    
    refreshScores()
    {
        this.highscores = JSON.parse(localStorage.getItem('bestScore'));
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
        this.ctx.textAlign = 'left';
        for (let i = 0; i < this.highscores.length; i++)
        {
            this.ctx.textAlign = 'left';
            this.ctx.fillText(this.highscores[i][0], this.width / 4, 200 + 26 * i);
            this.ctx.textAlign = 'right';
            this.ctx.fillText(this.highscores[i][1], this.width/4*3, 200 + 26 * i);
        }

        this.ctx.restore();
    }
}
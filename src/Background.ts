import { Game } from "./Game";
import { InputHandler } from "./InputHandler";

export class Background {
    public game: Game;
    private x: number;
    private y: number;
    private backgroundWidth: number;
    private backgroundHeight: number;
    private speed: number;
    public borderY: number;
    constructor(game: Game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.borderY = this.game.canvas?.height!;
        this.backgroundWidth = this.game.canvas?.width!;
        this.backgroundHeight= 50 * this.game.canvas?.height!;
        this.speed = 3;
    }

    drawBackground(){
        this.game.ctx.drawImage(document.getElementById('backgroundImage')! as CanvasImageSource, this.x, this.y, this.backgroundWidth, this.backgroundHeight)
    }

    update(input: InputHandler){
        if(this.y < -this.backgroundHeight){
            this.y = 0
        }
        if(input.keys.indexOf('h') > -1 ){
            this.speed = 0
        }
        else if(this.y  < -13500){
            this.speed = 4
        }
        else{
            this.speed = 3
        }
        if(this.game.isAlive == false){
            this.speed = 0;
            let x = setTimeout(() => {
                this.y = 0
                this.game.isAlive = true;
                clearTimeout(x);
            }, 300);
            let x2 = setTimeout(() => {
                this.game.audioManager.playStartSound();
                clearTimeout(x2);
            }, 700);
        }
        this.y -= this.speed;
    }
}
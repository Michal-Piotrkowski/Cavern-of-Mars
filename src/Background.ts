import { Game } from "./Game";
import { InputHandler } from "./InputHandler";

export class Background {
    public game: Game;
    private x: number;
    public y: number;
    private backgroundWidth: number;
    public backgroundHeight: number;
    public speed: number;
    public borderY: number;
    private isGameBreak: boolean;
    constructor(game: Game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.borderY = this.game.canvas?.height!;
        this.backgroundWidth = this.game.canvas?.width!;
        this.backgroundHeight= 50 * this.game.canvas?.height!;
        this.speed = 3;
        this.isGameBreak = false;
    }

    drawBackground(){
        this.game.ctx.drawImage(document.getElementById('backgroundImage')! as CanvasImageSource, this.x, this.y, this.backgroundWidth, this.backgroundHeight)
    }

    update(input: InputHandler){
        if(this.isGameBreak){
            return;
        }
        if(this.y < -this.backgroundHeight){
            this.y = 0;
        }
        if(input.keys.indexOf('h') > -1 || this.game.isGameRestarting){
            this.speed = 0;
        }
        else if(this.y  < -13500){
            this.speed = 4;
        }
        else{
            this.speed = 3;
        }
        if(this.game.isAlive == false){
            this.speed = 0;
            this.isGameBreak = true;
            this.game.livesManager.lives -= 1;
            setTimeout(() => {
                this.y = 0;
                this.game.collisionObjects.addBonuses();
                this.game.collisionObjects.addEnemies();
                this.game.isAlive = true;
                this.isGameBreak = false;
            }, 300);
            setTimeout(() => {
                this.game.audioManager.playStartSound();
            }, 700);
        }
        this.y -= this.speed * Game.deltaTime / 8;
    }
}
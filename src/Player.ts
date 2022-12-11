import { Game } from "./Game";
import { InputHandler } from "./InputHandler";

type Border = {
    x: number,
    y: number
};

export class Player {
    public playerWidth: number;
    public playerHeight: number;
    private game: Game;
    public x: number;
    public y: number;
    private speed_x: number;
    private speed_y: number;
    private toCheck: Array<Border>;
    constructor(width: number, height: number, game: Game) {
        this.game = game;
        this.playerWidth = 6 * width;
        this.playerHeight = 6 * height;
        this.x = (this.game.canvas?.width! - this.playerWidth) / 2;
        this.y = this.game.canvas?.height! / 4;
        this.speed_x = 5;
        this.speed_y = 5;
        this.toCheck = [];
    }

    drawPlayer() {
        this.game.ctx.drawImage(
            document.getElementById('playerImage')! as CanvasImageSource,
            this.x, this.y,
            this.playerWidth, this.playerHeight,
        )
    }

    update(input: InputHandler) {
        this.checkBorders();
        this.checkDirection(input);
        this.isPaused(input);
    }

    checkBorders() {
        this.toCheck = [
            { x: this.x, y: this.y },
            { x: this.x + this.playerWidth, y: this.y },
            { x: this.x, y: this.y + this.playerHeight },
            { x: this.x + this.playerWidth, y: this.y + this.playerHeight },
            { x: this.x + this.playerWidth / 2, y: this.y },
            { x: this.x + this.playerWidth / 2, y: this.y + this.playerHeight }
        ];

        for (let i = 0; i < this.toCheck.length; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.game.ctx.getImageData(this.toCheck[i]!.x, this.toCheck[i]!.y, 1, 1).data[j] != 0) {
                    this.game.ctx.clearRect(this.x, this.y, this.playerWidth, this.playerHeight);
                    this.speed_x = 0
                    this.speed_y = 0
                    this.game.ctx.drawImage(document.getElementById('playerDeadImage')! as CanvasImageSource,this.x, this.y, this.playerWidth, this.playerHeight)
                    this.game.isAlive = false;
                    this.game.audioManager.playDieSound();
                    this.game.collisionObjects.objectsArray = [];
                    let x = setTimeout(() => {
                        this.game.ctx.clearRect(this.x, this.y, this.playerWidth, this.playerHeight);
                        this.x = (this.game.canvas?.width! - this.playerWidth) / 2;
                        this.y = this.game.canvas?.height! / 4;
                        clearTimeout(x);
                    }, 300);
                }
            }
        }

        if(this.y >= this.game.canvas?.height! - this.playerHeight){
            this.y = this.game.canvas?.height! - this.playerHeight 
        }
        if(this.y < 0){
            this.y = 0; 
        }
    }

    checkDirection(input: InputHandler) {
        if (input.keys.indexOf('ArrowRight') > -1) {
            this.x += this.speed_x;
        }
        else if (input.keys.indexOf('ArrowLeft') > -1) {
            this.x -= this.speed_x;
        }
        else if (input.keys.indexOf('ArrowDown') > -1) {
            this.y += this.speed_y;
        }
        else if (input.keys.indexOf('ArrowUp') > -1) {
            this.y -= this.speed_y;
        }
    }

    isPaused(input: InputHandler) {
        if (input.keys.indexOf('h') > -1) {
            this.speed_x = 0;
            this.speed_y = 0;
        }
        else {
            this.speed_x = 5;
            this.speed_y = 5;
        }
    }
}
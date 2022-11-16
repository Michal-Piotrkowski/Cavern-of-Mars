import { Game } from "./Game";
import { InputHandler } from "./InputHandler";

type Border = {
    x: number,
    y: number
};

export class Player {
    private playerWidth: number;
    private playerHeight: number;
    private game: Game;
    private x: number;
    private y: number;
    private speed_x: number;
    private speed_y: number;
    private border_x: number;
    private border_y: number;
    private toCheck: Array<Border>;
    private shotPressed: Boolean;
    private speed_of_bullet: number;
    constructor(width: number, height: number, game: Game){
        this.game = game;
        this.playerWidth = 6 * width;
        this.playerHeight = 6 * height;
        this.x = (this.game.canvas?.width!- this.playerWidth) / 2;
        this.y = this.game.canvas?.height! / 4;
        this.speed_x = 5;
        this.speed_y = 5;
        this.border_x = this.game.canvas?.width! - this.playerWidth;
        this.border_y = this.game.canvas?.height! - this.playerHeight;
        this.toCheck = [];
        this.shotPressed = false;
        this.speed_of_bullet = 30;
    }

    drawPlayer(){
        this.game.ctx.drawImage(
            document.getElementById('playerImage')! as CanvasImageSource, 
            this.x, this.y, 
            this.playerWidth, this.playerHeight,
        )
    }

    update(input: InputHandler){
        this.checkBorders();
        this.checkDirection(input);
        this.checkIsShooting(input)
        this.isPaused(input);
    }

    checkBorders(){
        this.toCheck = [
            {x: this.x, y: this.y}, 
            {x: this.x + this.playerWidth,y: this.y}, 
            {x: this.x, y: this.y + this.playerHeight}, 
            {x: this.x + this.playerWidth, y:  this.y + this.playerHeight},
            {x: this.x + this.playerWidth / 2, y: this.y},
            {x: this.x + this.playerWidth / 2, y: this.y + this.playerHeight}
        ];

        for(let i = 0; i < this.toCheck.length; i++){
            for(let j = 0; j < 3; j++){
                if(this.game.ctx.getImageData(this.toCheck[i]!.x, this.toCheck[i]!.y, 1, 1).data[j] != 0){
                    console.log(document.getElementById('playerImage')!.style)
                    this.game.ctx.clearRect(this.x, this.y,  this.playerWidth, this.playerHeight);
                    this.speed_x = 0
                    this.speed_y = 0
                    this.game.isAlive = false;
                    this.x = (this.game.canvas?.width!- this.playerWidth) / 2;
                    this.y = this.game.canvas?.height! / 4;
                    if(this.y < 0){
                        this.y = 0;
                    }
                    return;
                }
            }
        }
    }

    checkDirection(input: InputHandler){
        if(input.keys.indexOf('ArrowRight') > -1 ){
            this.x +=  this.speed_x;
        }
        else if(input.keys.indexOf('ArrowLeft') > -1 ){
            this.x -= this.speed_x;
        }
        else if(input.keys.indexOf('ArrowDown') > -1 ){
            this.y += this.speed_y;
        }
        else if(input.keys.indexOf('ArrowUp') > -1 ){
            this.y -= this.speed_y;
        }
    }

    checkIsShooting(input: InputHandler){
        let pos_shooting: Border = {x: this.x + (this.playerWidth / 2), y: this.y + this.playerWidth}
        pos_shooting.y +=  this.speed_of_bullet;
        if(input.keys.indexOf('p') > -1){
            console.log("X")
            this.game.ctx.fillRect(pos_shooting.x, pos_shooting.y, 10, 10);
            this.game.ctx.fillStyle = "#FF0000";
            this.game.ctx.stroke();
        }
    }

    isPaused(input: InputHandler){
        if(input.keys.indexOf('h') > -1 ){
            this.speed_x = 0;
            this.speed_y = 0;
        }
        else{
            this.speed_x = 5;
            this.speed_y = 5;
        }
    }
}
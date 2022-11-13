import { Game } from "./Game";
import { InputHandler } from "./InputHandler";
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
    }

    drawPlayer(){
        this.game.ctx.drawImage(
            document.getElementById('playerImage')! as CanvasImageSource, 
            this.x, this.y, 
            this.playerWidth, this.playerHeight,
        )
    }

    update(input: InputHandler){

        if(this.x > this.border_x){
            console.log(this.x)
            this.x = this.border_x
        }
        else if(this.x < 0){
            console.log(this.x)
            this.x = 0
        }


        if(this.y > this.border_y){
            this.y = this.border_y
        }
        else if(this.y < 0){
            this.y = 0
        }

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

        if(input.keys.indexOf('h') > -1 ){
            this.speed_x = 0
            this.speed_y = 0
        }
        else{
            this.speed_x = 5;
            this.speed_y = 5;
        }
    }

    detectCollision(){
    }
}
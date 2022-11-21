import { InputHandler } from "./InputHandler";
import { Game } from "./Game";

type coordinates = {
    x: number,
    y: number
};

type playerData = {
    w: number,
    h: number
}

export class Shot {
    private game: Game;
    public coordinates: coordinates;
    private playerData: playerData;
    private bulletSize: number;
    private input: InputHandler;
    private speed: number;
    constructor(game: Game, coordinates: { x: number, y: number }, player: { playerWidth: number, playerHeight: number }, input: InputHandler) {
        this.game = game;
        this.coordinates = { x: coordinates.x, y: coordinates.y };
        this.playerData = { w: player.playerWidth, h: player.playerHeight };
        this.bulletSize = 10;
        this.input = input;
        this.speed = 5;
    }

    draw(coordinates: { x: number, y: number }) {
        this.game.ctx.fillStyle = "#FF0000";
        this.game.ctx.fillRect(coordinates.x, coordinates.y + this.playerData.h + this.playerData.h / 5, this.bulletSize, this.bulletSize);
        this.game.ctx.fillRect(coordinates.x + this.playerData.w, coordinates.y + this.playerData.h + this.playerData.h / 5, this.bulletSize, this.bulletSize);
    }

    update() {
        this.coordinates.y += this.speed;
    }

    check(){
        if(this.coordinates.y > this.game.background.borderY){
            return false;
        }
        if(
            this.game.ctx.getImageData(this.coordinates.x + this.bulletSize / 2, this.coordinates.y + this.bulletSize + this.playerData.h, 1, 1).data[0] == 223 &&
            this.game.ctx.getImageData(this.coordinates.x + this.bulletSize / 2, this.coordinates.y + this.bulletSize + this.playerData.h, 1, 1).data[1] == 146 &&
            this.game.ctx.getImageData(this.coordinates.x + this.bulletSize / 2, this.coordinates.y + this.bulletSize + this.playerData.h, 1, 1).data[2] == 67 
        ){
            let img = this.game.ctx.getImageData(this.coordinates.x + this.bulletSize / 2, this.coordinates.y, 100, 100)
            this.game.ctx.putImageData(img, this.coordinates.x, this.coordinates.y);
        }
        // for (let j = 0; j < 3; j++) {
        //     if (this.game.ctx.getImageData(this.coordinates.x + this.bulletSize / 2, this.coordinates.y + this.bulletSize + this.playerData.h, 1, 1).data[j] != 0) {
        //         return false;
        //     }
        // }
        return true;
    }
}
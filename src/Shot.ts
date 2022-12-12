import { InputHandler } from "./InputHandler";
import { Game } from "./Game";
import { Cover } from "./Cover";
import { CollisionObject } from "./CollisionObject";

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
    constructor(game: Game,coordinates: { x: number, y: number }, player: { playerWidth: number, playerHeight: number }, input: InputHandler) {
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
    }

    update() {
        this.coordinates.y += this.speed;
    }

    check(){
        console.log(this.coordinates.x, this.coordinates.y)
        this.game.collisionObjects.objectsArray.forEach(object => {
            if( this.coordinates.x >= object.x  && this.coordinates.x  <= object.x + object.width && this.coordinates.y >= object.y && this.coordinates.y <= object.y + object.height){
                this.game.pointsManager.check(`${object.type}`);
                this.game.audioManager.playExplosionSound();
                object.imgSrc = "/1.PNG";
                object.generate(this.game, object.y, `${object.imgSrc}`)
                setTimeout(() => {
                    object.imgSrc = "/2.PNG";
                    object.generate(this.game, object.y, `${object.imgSrc}`)
                }, 200);
                setTimeout(() => {
                    object.imgSrc = "/3.PNG";
                    object.generate(this.game, object.y, `${object.imgSrc}`)
                }, 200);
                setTimeout(() => {
                    object.imgSrc = "/4.PNG";
                    object.generate(this.game, object.y, `${object.imgSrc}`)
                }, 200);
                setTimeout(() => {
                    return false;
                }, 100);
            }
        });
        if(this.coordinates.y >  0.7 * this.game.background.borderY){
            return false;
        }
        for (let j = 0; j < 3; j++) {
            if (            
            this.game.ctx.getImageData(this.coordinates.x + this.bulletSize / 2, this.coordinates.y + this.bulletSize, 1, 1).data[0] == 72 &&
            this.game.ctx.getImageData(this.coordinates.x + this.bulletSize / 2, this.coordinates.y + this.bulletSize, 1, 1).data[1] == 128 &&
            this.game.ctx.getImageData(this.coordinates.x + this.bulletSize / 2, this.coordinates.y + this.bulletSize, 1, 1).data[2] == 255 ) {
                return false;
            }
        }
        return true;
    }
}
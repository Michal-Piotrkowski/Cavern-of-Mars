import { Background } from "./Background";
import { InputHandler } from "./InputHandler";
import { Player } from "./Player";
import { Shoot } from "./Shoot";
import { Game } from "./Game";

type coordinates = {
    x: number,
    y: number
};

type playerData = {
    w: number,
    h: number
}

export class Shots {
    private game: Game;
    private coordinates: coordinates;
    private playerData: playerData;
    private bulletSize: number;
    private input: InputHandler;
    private speed: number;
    public shots: Array<Shoot> = [];
    constructor(game: Game, coordinates: { x: number, y: number }, player: { playerWidth: number, playerHeight: number }, input: InputHandler) {
        this.game = game;
        this.coordinates = { x: coordinates.x, y: coordinates.y };
        this.playerData = { w: player.playerWidth, h: player.playerHeight };
        this.bulletSize = 10;
        this.input = input;
        this.speed = 30;
    }

    createShot(coordinates: { x: number, y: number }) {
        this.coordinates = coordinates;
        this.playerData.h += this.speed;
        this.game.ctx.fillStyle = "#FF0000";
        this.game.ctx.fillRect(this.coordinates.x + (this.playerData.w / 2), this.coordinates.y + this.playerData.h, this.bulletSize, this.bulletSize);
        console.log(this.coordinates.y + this.playerData.h)
    }

    update(coordinates: { x: number, y: number }) {
        this.checkIfShooting(coordinates);
        this.hitTheBorder()
    }

    checkIfShooting(coordinates: { x: number, y: number }) {
        if (this.input.keys.indexOf('Control') > -1) {
            this.createShot(coordinates);
            this.shots.push(new Shoot(this.game, { x: this.coordinates.x + (this.playerData.w / 2), y: this.coordinates.y + this.playerData.h }))
            return true;
        }
        return false;
    }

    hitTheBorder() {
        let i: number = 0;
        this.shots.forEach(bullet => {
            this.speed = 0;
            this.shots.splice(i, 1);
            this.input.keys.splice(this.input.keys.indexOf('Control'), 1)
            i++;
        });
    }
}
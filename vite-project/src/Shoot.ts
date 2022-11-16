import { Game } from "./Game";
import { InputHandler } from "./InputHandler";

type coordinates = {
    x: number,
    y: number
};

type playerData = {
    w: number,
    h: number
}

export class Shoot {
    private game: Game;
    private coordinates: coordinates;
    private playerData: playerData;
    private bulletSize: number;
    constructor(game: Game, coordinates: { x: number, y: number }, player: { playerWidth: number, playerHeight: number }) {
        this.game = game;
        this.coordinates = { x: coordinates.x, y: coordinates.y };
        this.playerData = { w: player.playerWidth, h: player.playerHeight };
        this.bulletSize = 10;
    }

    createShot() {
        this.game.ctx.fillStyle = "#FF0000";
        this.game.ctx.fillRect(this.coordinates.x + (this.playerData.w / 2), this.coordinates.y + this.playerData.h + 100, this.bulletSize, this.bulletSize);
    }
}
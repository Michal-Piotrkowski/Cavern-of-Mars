import { Game } from "./Game";

export class FuelManager {
    public fuel: number;
    private game: Game;
    public add: number;
    constructor(game: Game) {
        this.fuel = 99;
        this.game = game;
        this.add = setInterval(() => {
            this.fuel -= 1;
        }, 200);
    }

    check() {
        if (this.fuel == 0) {
            this.game.ctx.clearRect(this.game.player.x, this.game.player.y, this.game.player.playerWidth, this.game.player.playerHeight);
            this.game.player.speed_x = 0
            this.game.player.speed_y = 0
            this.game.ctx.drawImage(document.getElementById('playerDeadImage')! as CanvasImageSource, this.game.player.x, this.game.player.y, this.game.player.playerWidth, this.game.player.playerHeight)
            this.game.isAlive = false;
            this.game.audioManager!.playDieSound();
            this.game.collisionObjects!.objectsArray = [];
            let x = setTimeout(() => {
                this.game.ctx.clearRect(this.game.player.x, this.game.player.y, this.game.player.playerWidth, this.game.player.playerHeight);
                this.game.player.x = (this.game.canvas?.width! - this.game.player.playerWidth) / 2;
                this.game.player.y = this.game.canvas?.height! / 4;
                this.game.fuelManager.fuel = 99;
                clearTimeout(x);
            }, 300);
        }
        document.getElementById("fuel")!.innerHTML = `${this.fuel}`
    }
}
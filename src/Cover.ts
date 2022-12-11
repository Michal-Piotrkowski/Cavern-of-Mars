import { CoveredObjects } from "./CoveredObjects";
import { Game } from "./Game";

export class Cover {
    public covered: Array<CoveredObjects>;
    private game: Game;
    constructor(game: Game){
        this.covered = [];
        this.game = game;
    }

    add(x: number, y: number, width: number, height: number){
        this.covered.push(new CoveredObjects(x, y, width, height));
    }

    update(){
        this.covered.forEach(cover => {
            if(cover.y <= 10){
                this.covered.splice(this.covered.findIndex(cover2 => cover2 == cover), 1);
            }
            this.game.ctx.fillStyle = "black";
            cover.y -= this.game.background.speed
            this.game.ctx.fillRect(cover.x, cover.y, cover.width, cover.height)
        });
    }
}
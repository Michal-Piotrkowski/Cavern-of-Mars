import { Game } from "./Game";

export class Bomb {
    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public game: Game;
    constructor(game: Game, width: number, height: number, x: number, y: number) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.game = game;
    }

    pickTheBomb(){

    }
}
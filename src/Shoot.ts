import { Game } from "./Game";

type coordinates = {
    x: number,
    y: number
};

export class Shoot {
    private game: Game;
    public coordinates: coordinates;
    constructor(game: Game, coordinates: { x: number, y: number }) {
        this.game = game;
        this.coordinates = { x: coordinates.x, y: coordinates.y };
    }
}
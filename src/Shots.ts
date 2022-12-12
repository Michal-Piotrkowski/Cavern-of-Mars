import { Game } from "./Game";
import { InputHandler } from "./InputHandler";
import { Shot } from "./Shot";
export class Shots {
    public shots: Array<Shot>;
    constructor(){
        this.shots = [];
    }

    add(game: Game, coordinates: { x: number, y: number }, player: { playerWidth: number, playerHeight: number }, input: InputHandler){
        this.shots.push(new Shot(game,  { x: coordinates.x - 10, y: coordinates.y - 150 }, player, input), new Shot(game, {x: coordinates.x + player.playerWidth + 10, y: coordinates.y - 150}, player, input));
    }

    update(){
        this.shots.forEach(shot => {
            if(!shot.check()){
                this.shots.splice(this.shots.indexOf(shot), 1);
            }
            shot.update();
            shot.draw({x: shot.coordinates.x, y: shot.coordinates.y});
        });
    }
}
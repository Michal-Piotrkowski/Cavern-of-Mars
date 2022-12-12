import { Game } from "./Game";

export class PointsManager {
    private game: Game;
    public points: number;
    public got: boolean;
    constructor(game: Game){
        this.points = 0;
        this.game = game;
        this.got = true;
    }

    check(type: string){
        if(!this.got){
            return;
        }
        this.got = false;
        switch (type) {
            case "fuelTanks":
                if(this.game.fuelManager.fuel > 90){
                    this.game.fuelManager.fuel = 99;
                }
                else{
                    this.game.fuelManager.fuel += 10;
                }
                this.points += 150;
                break;
            case "creonRockets":
                this.points += 200;
                break;
            case "radarTransmitters":
                this.points += 200;
                break;
            case "pyxiasRockets":
                if(this.game.fuelManager.fuel > 90){
                    this.game.fuelManager.fuel = 99;
                }
                else{
                    this.game.fuelManager.fuel += 10;
                }
                this.points += 150;
                break;
        } 
    }
}
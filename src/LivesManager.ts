import { Game } from "./Game";

export class LivesManager {
    private game: Game;
    public lives: number;
    constructor(game: Game){
        this.game = game;
        this.lives = 5;
    }

    showLives(){
        let stringImg: string = "";
        for (let i = 0; i < this.lives - 1; i++) {
            stringImg += "<img src=\"/player.png\"/>";      
        }
        document.getElementById("livesUI")!.innerHTML = stringImg;
    }

    checkIfDead(){
        if(this.lives == 0){
            if(this.game.pointsManager.points > this.game.highscore){
                this.game.highscore = this.game.pointsManager.points;
            }
            if(!this.game.isGameRestarting){
                document.getElementById("gameover")!.style.display = "flex";
                document.getElementById("scoreDead")!.innerHTML = `${this.game.pointsManager.points}`;
                document.getElementById("highScore")!.innerHTML = `${this.game.highscore}`;
                this.game.isGameRestarting = true;
            }
        }
    }
}
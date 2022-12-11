import { Game } from "./Game";
import { Player } from "./Player";

export class InputHandler {
    public keys: Array<String>;
    private game: Game;
    public player: Player;
    constructor(game: Game, player: Player) {
        this.keys = [];
        this.game = game;
        this.player = player;
        window.addEventListener("keydown", (e) => {
            if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            }
            else if (e.key === 'h') {
                if (this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                    //document.getElementById("pause")!.style.display = "flex";
                }
                else {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                    //document.getElementById("pause")!.style.display = "none";
                }
            }
            
            if (e.key === "Control") {
                this.game.audioManager.StopSounds();
                this.game.shots.add(this.game, {x: this.player.x, y: this.player.y}, { playerWidth: player.playerWidth, playerHeight: player.playerWidth}, this);
                this.game.audioManager.playShootingSound();
            }
        })
        window.addEventListener("keyup", (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
    }
}
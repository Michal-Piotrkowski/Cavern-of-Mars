import { Background } from "./Background";
import { InputHandler } from "./InputHandler";
import { Player } from "./Player";
import { Shots } from "./Shots";
export class Game {
    public canvas: HTMLCanvasElement | null;
    public ctx: CanvasRenderingContext2D;
    private background: Background;
    private inputHandler: InputHandler;
    private player: Player;
    public isAlive: Boolean;
    public shots: Shots;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d")!;
        this.inputHandler = new InputHandler();
        this.player = new Player(25, 15, this);
        this.background = new Background(this);
        this.shots = new Shots(this, { x: this.player.x, y: this.player.y }, { playerWidth: this.player.playerWidth, playerHeight: this.player.playerHeight }, this.inputHandler);
        this.isAlive = true;
        this.animate(this.ctx, this.canvas!);
    }

    animate(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.clearRect(0, 0, canvas?.width, canvas?.height);
        this.background.drawBackground();
        this.background.update(this.inputHandler)
        this.player.drawPlayer();
        this.player.update(this.inputHandler);
        this.shots.update({ x: this.player.x, y: this.player.y });
        requestAnimationFrame(() => this.animate(ctx, canvas));
    }
}

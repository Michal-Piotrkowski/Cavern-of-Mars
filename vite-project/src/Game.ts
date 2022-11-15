import { Background } from "./Background";
import { InputHandler } from "./InputHandler";
import { Player } from "./Player";
export class Game {
    public canvas: HTMLCanvasElement | null;
    public ctx: CanvasRenderingContext2D;
    private background: Background;
    private inputHandler: InputHandler;
    private player: Player;
    public isAlive: Boolean;

    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d")!;
        this.inputHandler = new InputHandler();
        this.player = new Player( 25, 15, this);
        this.background = new Background(this);
        this.isAlive = true;
        this.animate(this.ctx, this.canvas!);
    }

    animate(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
        ctx.clearRect(0, 0, canvas?.width, canvas?.height);
        this.background.drawBackground();
        this.background.update(this.inputHandler)
        this.player.drawPlayer();
        this.player.update(this.inputHandler);
        requestAnimationFrame(() => this.animate(ctx, canvas));
    }
}

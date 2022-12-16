import { Game } from "./Game";

export class CollisionObject {
    public type: String;
    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public imgSrc: string | undefined;
    public isWhite: boolean;
    public img: HTMLImageElement;
    constructor(type: String, width: number, height: number, x: number, y: number, imgSrc: string) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.img = new Image(); // Create new img element
        this.img.src = imgSrc;
        this.isWhite = false;
    }

    generate(game: Game, y: number, imgSrc: string) {
        game.ctx.drawImage(this.img, this.x , y, this.width, this.height);
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }
}
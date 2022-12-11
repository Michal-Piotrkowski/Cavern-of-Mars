import { Game } from "./Game";

export class CollisionObject {
    public type: String;
    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public imgSrc: String;
    public isWhite: boolean;
    constructor(type: String, width: number, height: number, x: number, y: number, imgSrc: String) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.imgSrc = imgSrc;
        this.isWhite = false;
    }

    generate(game: Game, y: number, imgSrc: string) {
        let img: HTMLImageElement = new Image(); // Create new img element
        img.src = `${imgSrc}`; // Set source path
        game.ctx.drawImage(img, this.x , y, this.width, this.height);
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }
}
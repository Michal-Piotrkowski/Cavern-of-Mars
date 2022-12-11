import { Background } from "./Background";
import { InputHandler } from "./InputHandler";
import { Player } from "./Player";
import { Shots } from "./Shots";
import { AudioManager } from "./AudioManager";
import { Cover } from "./Cover";
import {CollisionObjectsManager} from "./CollisionObjectsManager"
import { CollisionObject } from "./CollisionObject";
export class Game {
    public canvas: HTMLCanvasElement | null;
    public ctx: CanvasRenderingContext2D;
    public background: Background;
    private inputHandler: InputHandler;
    public player: Player;
    public isAlive: Boolean;
    public shots: Shots;
    public audioManager: AudioManager;
    public cover: Cover;
    public collisionObjects: CollisionObjectsManager;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d")!;
        this.ctx.imageSmoothingEnabled = false;
        this.player = new Player(25, 15, this);
        this.shots = new Shots();
        this.inputHandler = new InputHandler(this, this.player);
        this.background = new Background(this);
        this.cover = new Cover(this);
        this.audioManager = new AudioManager();
        this.isAlive = true;
        this.collisionObjects = new CollisionObjectsManager(this);
        this.collisionObjects.addBonuses();
        this.collisionObjects.addEnemies();
        setInterval(() => {
            if(this.collisionObjects.objectsArray.length > 0){
                this.collisionObjects.objectsArray.forEach((object: CollisionObject) => {
                    if(!object.isWhite){
                        console.log(object)
                        object.isWhite = !object.isWhite;
                        object.imgSrc = object.imgSrc.substr(1)
                        object.imgSrc = `W-${object.imgSrc}`
                    }else{
                        object.isWhite = !object.isWhite;
                        object.imgSrc = "/" + object.imgSrc.split("-")[1];
                        console.log(object)
                    }
                });
            }
        }, 100);
        this.animate(this.ctx, this.canvas!);
    }

    animate(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.clearRect(0, 0, canvas?.width, canvas?.height);
        this.background.drawBackground();
        this.background.update(this.inputHandler)
        this.player.drawPlayer();
        this.player.update(this.inputHandler);
        this.shots.update();
        this.cover.update();
        this.collisionObjects.update();
        requestAnimationFrame(() => this.animate(ctx, canvas));
    }
}


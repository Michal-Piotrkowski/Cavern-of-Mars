import { Background } from "./Background";
import { InputHandler } from "./InputHandler";
import { Player } from "./Player";
import { Shots } from "./Shots";
import { AudioManager } from "./AudioManager";
import { Cover } from "./Cover";
import {CollisionObjectsManager} from "./CollisionObjectsManager"
import { CollisionObject } from "./CollisionObject";
import { FuelManager } from "./FuelManger";
import { PointsManager } from "./PointsManager";
import { LivesManager } from "./LivesManager";
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
    public fuelManager: FuelManager;
    public pointsManager: PointsManager;
    public livesManager: LivesManager;
    public levelSelected: number;
    public highscore: number;
    public isGameRestarting: boolean;
    static deltaTime: number = 1;
    constructor(levelSelected: number) {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d")!;
        this.ctx.imageSmoothingEnabled = false;
        this.pointsManager = new PointsManager(this);
        this.player = new Player(this.canvas.width/80, this.canvas.height/80, this);
        this.shots = new Shots();
        this.inputHandler = new InputHandler(this, this.player);
        this.background = new Background(this);
        this.cover = new Cover(this);
        this.audioManager = new AudioManager();
        this.levelSelected = levelSelected;
        this.isAlive = true;
        this.collisionObjects = new CollisionObjectsManager(this);
        this.collisionObjects.addBonuses();
        this.collisionObjects.addEnemies();
        this.fuelManager = new FuelManager(this);
        this.livesManager = new LivesManager(this)
        this.highscore = 0;
        this.isGameRestarting = false;
        // setInterval(() => {
        //     if(this.collisionObjects.objectsArray.length > 0){
        //         this.collisionObjects.objectsArray.forEach((object: CollisionObject) => {
        //             if(!object.isWhite){
        //                 object.isWhite = !object.isWhite;
        //                 object.img.src = object.img.src .substr(1)
        //                 object.img.src  = `W-${object.img.src}`
        //             }else{
        //                 object.isWhite = !object.isWhite;
        //                 object.img.src  = "/" + object.img.src.split("-")[1];
        //             }
        //         });
        //     }
        // }, 100);
        this.animate(this.ctx, this.canvas!);
    }

    showUi(){
        switch (this.levelSelected) {
            case 1:
                document.getElementById("level")!.innerHTML = "NOVICE";
                break;
            case 2:
                document.getElementById("level")!.innerHTML = "PILOT";
                break;
            case 3:
                document.getElementById("level")!.innerHTML = "WARRIOR";
                break;
            case 4:
                document.getElementById("level")!.innerHTML = "COMMANDER";
                break;
        } 
        this.livesManager.showLives();
        document.getElementById("score")!.innerHTML = `${this.pointsManager.points}`;
    }

    end(){
        this.ctx.clearRect(this.player.x, this.player.y, this.player.playerWidth, this.player.playerHeight);
        this.player.speed_x = 0
        this.player.speed_y = 0
        this.ctx.drawImage(document.getElementById('playerDeadImage')! as CanvasImageSource,this.player.x, this.player.y, this.player.playerWidth, this.player.playerHeight)
        this.isAlive = false;
        this.audioManager!.playDieSound();
        this.collisionObjects!.objectsArray = [];
        let x = setTimeout(() => {
            this.ctx.clearRect(this.player.x, this.player.y, this.player.playerWidth, this.player.playerHeight);
            this.player.x = (this.canvas?.width! - this.player.playerWidth) / 2;
            this.player.y = this.canvas?.height! / 4;
            this.fuelManager.fuel = 99;
            clearTimeout(x);
        }, 300);
    }

    startNewGame(){
        this.livesManager.lives = 5;
        this.pointsManager.points = 0;
        this.fuelManager.fuel = 99;
        switch (document.getElementById("levelMenu")!.innerHTML) {
            case "NOVICE":
                this.levelSelected = 1;
                break;
            case "PILOT":
                this.levelSelected = 2;
                break;
            case "WARRIOR":
                this.levelSelected = 3;
                break;
            case "COMMANDER":
                this.levelSelected = 4;
                break;
        } 
    }

    animate(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const start = performance.now();
        ctx.clearRect(0, 0, canvas?.width, canvas?.height);
        this.background.drawBackground();
        this.background.update(this.inputHandler)
        this.player.drawPlayer();
        this.player.update(this.inputHandler);
        this.shots.update();
        this.cover.update();
        this.collisionObjects.update();
        this.fuelManager.check();
        this.livesManager.checkIfDead();
        this.showUi();
        if(this.inputHandler.keys.includes('ArrowUp')){
            this.audioManager.playFastSound();
            this.audioManager.slowSound.pause();
        }
        else{
            this.audioManager.playSlowSound();
            this.audioManager.fastSound.pause();
        }
        requestAnimationFrame(() => {
            Game.deltaTime = performance.now() - start;
            this.animate(ctx, canvas
        )});
    }
}


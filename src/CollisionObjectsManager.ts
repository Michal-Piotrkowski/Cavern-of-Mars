import {objects} from './collisionObjects.json';
import { CollisionObject } from './CollisionObject';
import { Game } from './Game';

export class CollisionObjectsManager {
    public objects: any;
    public objectsArray: Array<CollisionObject>; 
    public game: Game;
    constructor(game: Game){
        this.game = game;
        this.objects = objects;
        this.objectsArray = [];
    }
    addBonuses(){
        if(this.game.levelSelected == 1){
            this.objects.lvl.one.bonuses.static.forEach((bonus: { name: String; width: number, height: number, coordinates: {x: number, y: number}, imgSrc: string; }) => {
                let bonusObject: CollisionObject = new CollisionObject(bonus.name, bonus.width, bonus.height, bonus.coordinates.x, bonus.coordinates.y, bonus.imgSrc);
                bonusObject.generate(this.game, bonus.coordinates.y, bonus.imgSrc);
                this.objectsArray.push(bonusObject)
            });
        }
    } 

    addEnemies(){
        if(this.game.levelSelected == 1){
            this.objects.lvl.one.enemies.static.forEach((enemy: { name: String; width: number, height: number, coordinates: {x: number, y: number}, imgSrc: string; }) => {
                let enemyObject: CollisionObject = new CollisionObject(enemy.name, enemy.width, enemy.height, enemy.coordinates.x, enemy.coordinates.y, enemy.imgSrc);
                if(enemy.name == "theFusionBomb"){
                }
                enemyObject.generate(this.game, enemy.coordinates.y, enemy.imgSrc);
                this.objectsArray.push(enemyObject);
            });
        }
        this.generateRockets();
    }

    generateRockets(){
        for(let i = 1; i < 218; i++){
            let x = Math.random() * ((this.game.canvas!.width - 500) - 300) + 300;
            let y = 15000 + 100*i;
            if(i%10 == 0){
                let enemyObject: CollisionObject = new CollisionObject("pyxiasRockets", 110, 75, x, y, "/pyxiasRocket.PNG");
                enemyObject.generate(this.game, y, "/pyxiasRocket.PNG");
                this.objectsArray.push(enemyObject);
            }
            else{
                let enemyObject: CollisionObject = new CollisionObject("creonRockets", 75, 110, x, y, "/creonRocket.PNG");
                enemyObject.generate(this.game, y, "/creonRocket.PNG");
                this.objectsArray.push(enemyObject);
            }
        }
    }

    update(){
        this.objectsArray.forEach((object: CollisionObject) => {
            if(object.y < -object.height){
                this.objectsArray.splice(this.objectsArray.findIndex((object2: CollisionObject) => object2 == object), 1);
                return;
            }
            object.y -= this.game.background.speed * Game.deltaTime / 8;
            object.generate(this.game, object.y, `${object.imgSrc}`);
        });
    }
}
import {objects} from './collisionObjects.json';
import { CollisionObject } from './CollisionObject';
import { Game } from './Game';

export class CollisionObjectsManager {
    public objects: any;
    private lvl: String;
    public objectsArray: Array<CollisionObject>; 
    public game: Game;
    constructor(game: Game){
        this.game = game;
        this.objects = objects;
        this.lvl = "one";
        this.objectsArray = [];
    }
    addBonuses(){
        if(this.lvl === "one"){
            this.objects.lvl.one.bonuses.static.forEach((bonus: { name: String; width: number, height: number, coordinates: {x: number, y: number}, imgSrc: string; }) => {
                let bonusObject: CollisionObject = new CollisionObject(bonus.name, bonus.width, bonus.height, bonus.coordinates.x, bonus.coordinates.y, bonus.imgSrc);
                bonusObject.generate(this.game, bonus.coordinates.y, bonus.imgSrc);
                this.objectsArray.push(bonusObject)
            });
        }
    } 

    addEnemies(){
        if(this.lvl === "one"){
            this.objects.lvl.one.enemies.static.forEach((enemy: { name: String; width: number, height: number, coordinates: {x: number, y: number}, imgSrc: string; }) => {
                let enemyObject: CollisionObject = new CollisionObject(enemy.name, enemy.width, enemy.height, enemy.coordinates.x, enemy.coordinates.y, enemy.imgSrc);
                enemyObject.generate(this.game, enemy.coordinates.y, enemy.imgSrc);
                this.objectsArray.push(enemyObject);
            });
        }
    }

    update(){
        this.objectsArray.forEach((object: CollisionObject) => {
            if(object.y < -object.height){
                this.objectsArray.splice(this.objectsArray.findIndex((object2: CollisionObject) => object2 == object), 1);
                return;
            }
            object.y -= this.game.background.speed;
            object.generate(this.game, object.y, `${object.imgSrc}`);
        });
    }
}
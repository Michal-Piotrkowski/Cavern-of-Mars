export class AudioManager {
    public dieSound: HTMLAudioElement;
    public startSound: HTMLAudioElement;
    public shotSound: HTMLAudioElement;
    public explosionSound: HTMLAudioElement;
    public fastSound: HTMLAudioElement;
    public slowSound: HTMLAudioElement;
    constructor(){
        this.dieSound = new Audio('/roblox-death-sound-effect.mp3'); 
        this.startSound = new Audio('/kb.mp3')
        this.shotSound = new Audio('/shot.mp3')
        this.explosionSound = new Audio('/explosion.mp3')
        this.fastSound = new Audio('/engine.mp3')
        this.slowSound = new Audio('/slow.mp3')
    }

    playDieSound(){
        this.dieSound.play();
    }

    playStartSound(){
        this.explosionSound.volume = 0.1;
        this.startSound.play();
    }

    playShootingSound(){
        this.explosionSound.volume = 0.1;
        this.shotSound.play();
    }

    playExplosionSound(){
        this.explosionSound.volume = 0.05;
        this.explosionSound.play();
    }

    playFastSound(){
        this.fastSound.volume = 0.01;
        this.fastSound.play();
    }

    playSlowSound(){
        this.slowSound.volume = 0.01;
        this.slowSound.play();
    }

    StopSounds(){
        this.shotSound.pause();
        this.startSound.pause();
        this.dieSound.pause();
    }
}
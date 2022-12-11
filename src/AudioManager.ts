export class AudioManager {
    public dieSound: HTMLAudioElement;
    public startSound: HTMLAudioElement;
    public shotSound: HTMLAudioElement;
    constructor(){
        this.dieSound = new Audio('/roblox-death-sound-effect.mp3'); 
        this.startSound = new Audio('/kb.mp3')
        this.shotSound = new Audio('/shot.mp3')
    }

    playDieSound(){
        this.dieSound.play();
    }

    playStartSound(){
        this.startSound.play();
    }

    playShootingSound(){
        this.shotSound.play();
    }

    StopSounds(){
        this.shotSound.pause();
        this.startSound.pause();
        this.dieSound.pause();
    }
}
export class AudioManager {
    public dieSound: HTMLAudioElement;
    public startSound: HTMLAudioElement;
    constructor(){
        this.dieSound = new Audio('/roblox-death-sound-effect.mp3'); 
        this.startSound = new Audio('/kb.mp3')
    }

    playDieSound(){
        this.dieSound.play();
    }

    playStartSound(){
        this.startSound.play();
    }
}
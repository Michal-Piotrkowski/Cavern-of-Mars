import { Game } from "./Game";
import { Ui} from "./Ui";
let ui: Ui = new Ui();
let isGamestarted: boolean = false;
let sound = new Audio('/horn.mp3')
sound.volume = 0.1;
sound.loop = true;
// sound.play();
window.addEventListener("keydown", (e) => {
    sound.pause();
    if(e.key === 's' && !isGamestarted){
        isGamestarted = true;
        document.getElementById("menu")!.style.display = "none";
        new Game(ui.levelSelect);
    }
})


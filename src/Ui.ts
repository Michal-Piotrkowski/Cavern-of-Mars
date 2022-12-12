export class Ui {
    public levelSelect: number;
    private background: boolean;
    public isGameStarted: boolean;
    constructor(){
        this.levelSelect = 1;
        this.background = false;
        this.isGameStarted = false;
        setInterval(() => {
            if(this.background){
                document.getElementById("menu")!.style.backgroundImage = "url('/menu.png')";
                this.background = !this.background;
            }
            else{
                document.getElementById("menu")!.style.backgroundImage = "url('/Ymenu.png')";
                this.background = !this.background;
            }
        }, 100);
        window.addEventListener("keydown", (e) => {
            if(e.key === 'o') {
                if(this.levelSelect == 4){
                    this.levelSelect = 0;
                }
                this.levelSelect++;
                switch (this.levelSelect) {
                    case 1:
                        document.getElementById("levelMenu")!.innerHTML = "NOVICE";
                        break;
                    case 2:
                        document.getElementById("levelMenu")!.innerHTML = "PILOT";
                        break;
                    case 3:
                        document.getElementById("levelMenu")!.innerHTML = "WARRIOR";
                        break;
                    case 4:
                        document.getElementById("levelMenu")!.innerHTML = "COMMANDER";
                        break;
                } 
            }
        })
    }

    hideUi(){

    }
}
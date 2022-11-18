export class InputHandler {
    public keys: Array<String>;
    constructor() {
        this.keys = [];
        window.addEventListener("keydown", (e) => {
            if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            }
            else if (e.key === 'h') {
                if (this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                    document.getElementById("pause")!.style.display = "flex";
                }
                else {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                    document.getElementById("pause")!.style.display = "none";
                }
            }
            else if (e.key === "Control") {
                console.log("POLSKA!");
                this.keys.push(e.key)
            }
        })
        window.addEventListener("keyup", (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
    }
}
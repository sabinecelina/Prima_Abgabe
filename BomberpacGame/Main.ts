namespace Bomberpac {
    import ƒ = FudgeCore;
    export import fCore = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;
    export let gameField: number[][];
    let floor: Floor;
    let game: fCore.Node = new fCore.Node("game");
    function init(_event: Event): void {
        showMenue();
        document.getElementById("startButton").addEventListener("click", hndLoad);
    }
    function fillArray() {
        gameField = new Array<Array<number>>();
        for (let y = 0; y <= 100; y++) {
            let row: number[] = new Array<number>();
            for (let x = 0; x <= 100; x++) {
                row.push(0);
            }
            gameField.push(row);
        }
    }
    function hndLoad(_event: Event): void {
        fillArray();
        document.getElementById("menue").style.display = "none";
        document.getElementById("gameWrapper").style.display = "initial";
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        initializeGame();
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.backgroundColor = ƒ.Color.CSS("black");
        cmpCamera.pivot.translateZ(30.3);
        cmpCamera.pivot.translateX(14.5);
        cmpCamera.pivot.translateY(10);
        cmpCamera.pivot.rotateY(180);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        viewport.draw();
    }
    function initializeGame() {
        floor = new Floor("Floor", gameField, game);
        game.appendChild(floor);
    }
}
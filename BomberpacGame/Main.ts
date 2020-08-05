namespace Bomberpac {
    export interface Data {
        level: {
            text: string,
            number: string,
            amountOfBombs: string,
            lives: string,
            amountOfObstacles: string
        }[];
    }
    export interface ToggleData {
        text: string,
        number: string,
        amountOfBombs: string,
        lives: string,
        amountOfObstacles: string
    }
    import ƒ = FudgeCore;
    export import fCore = FudgeCore;
    load("data.json");
    window.addEventListener("load", init);
    export let viewport: ƒ.Viewport;
    export let gameField: number[][];
    let floor: Floor;
    let game: fCore.Node = new fCore.Node("game");
    export let data: Data;
    function init(_event: Event): void {
        showMenue();
        document.getElementById("startButton").addEventListener("click", hndLoad);
    }
    async function load(_filename: string): Promise<void> {
        let response: Response = await fetch("data.json");
        let text: string = await response.text();
        data = JSON.parse(text);
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
        let value = (<HTMLSelectElement>document.getElementById('level')).value;
        switch (value) {
            case "EASY":
                initializeGame(data.level[0]);
                console.log("easy");
                break;
            case "MIDDLE":
                initializeGame(data.level[1]);
                console.log("middle");
                break;
            case "HARD":
                initializeGame(data.level[2]);
                console.log("hard");
                break;
        }
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
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
    function initializeGame(data: ToggleData) {
        floor = new Floor("Floor", gameField, game, data);
        game.appendChild(floor);
    }
}
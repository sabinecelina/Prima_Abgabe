namespace Bomberpac {
    export interface Data {
        level: {
            text: string,
            number: string,
            amountOfBombs: string,
            lives: string,
            amountOfObstacles: string,
            amountOfFood: string,
            amountOfItems: string
        }[];
    }
    export interface ToggleData {
        text: string,
        number: string,
        amountOfBombs: string,
        lives: string,
        amountOfObstacles: string,
        amountOfFood: string,
        amountOfItems: string
    }
    let pacmans: fCore.Node[];
    import ƒ = FudgeCore;
    export import fCore = FudgeCore;
    import fAid = FudgeAid;
    export import ƒAid = FudgeAid;
    load("data.json");
    window.addEventListener("load", init);
    export let viewport: ƒ.Viewport;
    export let gameField: number[][];
    export let musicMuted: boolean = true;
    export let soundMuted: boolean = true;
    export let nav: HTMLElement;
    export let navPlayerTwo: HTMLElement;
    let pacman: PacmanPlayerOne;
    let pacmanTwo: PacmanPlayerTwo;
    let floor: Floor;
    export let keyBoard: boolean = false;
    let game: fCore.Node = new fCore.Node("game");
    export let data: Data;
    let toggleData: ToggleData;
    function init(_event: Event): void {
        showMenue();
        document.getElementById("startButton").addEventListener("click", hndLoad);
        document.getElementById("musicButton").addEventListener("click", toggleMusic);
        document.getElementById("soundButton").addEventListener("click", toggleSounds);
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
        let gameTime: fCore.Time = new fCore.Time();
        console.log(gameTime);
        document.getElementById("reloadMap").addEventListener("click", reloadMap);
        document.getElementById("menue").style.display = "none";
        document.getElementById("gameWrapper").style.display = "initial";
        let img: HTMLImageElement = document.querySelector("img");
        let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Spritesheet", img);
        Pacman.generateSprites(spritesheet);
        PacmanPlayerTwo.generateSprites(spritesheet);
        let value = (<HTMLSelectElement>document.getElementById('level')).value;
        switch (value) {
            case "EASY":
                toggleData = data.level[0];
                ("easy");
                break;
            case "MIDDLE":
                toggleData = data.level[1];
                ("middle");
                break;
            case "HARD":
                toggleData = data.level[2];
                ("hard");
                break;
        }
        initializeGame(toggleData);
        pacman = new PacmanPlayerOne("PacmanOne", 2, 1, gameField, game, toggleData);
        pacmanTwo = new PacmanPlayerTwo("PacmanTwo", 28, 1, gameField, game, toggleData);
        pacmanTwo.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * -1);
        game.appendChild(pacmanTwo);
        game.appendChild(pacman);
        ("pacman added");
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
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
    }
    function update(_event: ƒ.Eventƒ): void {
        viewport.draw();
        processInput();
    }
    function initializeGame(data: ToggleData) {
        floor = new Floor("Floor", gameField, game, data);
        game.appendChild(floor);
    }
    function reloadMap() {
        let node: fCore.Node[] = game.getChildrenByName("Obstacles")[0].getChildren();
        let node2: fCore.Node = game.getChildrenByName("Obstacles")[0];
        let translation: fCore.Vector3;
        console.log(node);
        //let node: fCore.Node[] = game.getChildren();
        for (let obstacles of node) {
            translation = obstacles.mtxLocal.translation;
            gameField[translation.x][translation.y] == 0;
            node2.removeChild(obstacles);
        }
        initializeGame(toggleData);
    }
    function processInput(): void {

    }
}
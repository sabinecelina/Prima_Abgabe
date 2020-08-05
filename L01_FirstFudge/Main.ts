
namespace BomberpacGame {
  interface Data {
    level: {
      text: string,
      number: string,
      amountOfBombs: string,
      lives: string,
      amountOfObstacles: string
    }[];
  }
  export import ƒ = FudgeCore;
  export import ƒAid = FudgeAid;
  load("data.json");
  window.addEventListener("load", test);

  export let musicMuted: boolean = true;
  export let soundMuted: boolean = true;
  export let game: ƒ.Node;
  export let matrix: number[][];
  export let scale: number = 1;
  let level: Level;
  export let pacman: Pacman;
  let pacmanPlayer: PacmanPlayer;
  export let data: Data;
  function fillArray() {
    matrix = new Array<Array<number>>();
    for (let y = 0; y <= 100; y++) {
      let row: number[] = new Array<number>();
      for (let x = 0; x <= 100; x++) {
        row.push(0);
      }
      matrix.push(row);
    }
  }
  async function load(_filename: string): Promise<void> {
    let response: Response = await fetch("data.json");
    let text: string = await response.text();
    data = JSON.parse(text);
  }
  function init(_event: Event): void {
    showMenue();
    document.getElementById("startButton").addEventListener("click", test);
    document.getElementById("musicButton").addEventListener("click", toggleMusic);
    document.getElementById("soundButton").addEventListener("click", toggleSounds);
  }
  function test(): void {
    fillArray();
    document.getElementById("menue").style.display = "none";
    document.getElementById("gameWrapper").style.display = "initial";
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let img: HTMLImageElement = document.querySelector("img");
    let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Hare", img);
    Pacman.generateSprites(spritesheet);
    PacmanPlayer.generateSprites(spritesheet);
    game = new ƒ.Node("Game");
    pacman = new Pacman("Pacman", 1, 1);
    pacmanPlayer = new PacmanPlayer("Enemy");
    level = new Level("obstacles");
    game.appendChild(pacman);
    game.appendChild(pacmanPlayer);
    game.appendChild(level);
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(30);
    cmpCamera.pivot.translateX(14.4);
    cmpCamera.pivot.translateY(10);

    cmpCamera.pivot.rotateY(180);
    cmpCamera.backgroundColor = ƒ.Color.CSS("black");

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);

    function update(_event: ƒ.Eventƒ): void {
      viewport.draw();
    }
  }
}

"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    BomberpacGame.ƒ = FudgeCore;
    BomberpacGame.ƒAid = FudgeAid;
    load("data.json");
    window.addEventListener("load", test);
    BomberpacGame.musicMuted = true;
    BomberpacGame.soundMuted = true;
    BomberpacGame.scale = 1;
    let level;
    let pacmanPlayer;
    function fillArray() {
        BomberpacGame.matrix = new Array();
        for (let y = 0; y <= 100; y++) {
            let row = new Array();
            for (let x = 0; x <= 100; x++) {
                row.push(0);
            }
            BomberpacGame.matrix.push(row);
        }
    }
    async function load(_filename) {
        let response = await fetch("data.json");
        let text = await response.text();
        BomberpacGame.data = JSON.parse(text);
    }
    function init(_event) {
        BomberpacGame.showMenue();
        document.getElementById("startButton").addEventListener("click", test);
        document.getElementById("musicButton").addEventListener("click", BomberpacGame.toggleMusic);
        document.getElementById("soundButton").addEventListener("click", BomberpacGame.toggleSounds);
    }
    function test() {
        fillArray();
        document.getElementById("menue").style.display = "none";
        document.getElementById("gameWrapper").style.display = "initial";
        let canvas = document.querySelector("canvas");
        let img = document.querySelector("img");
        let spritesheet = BomberpacGame.ƒAid.createSpriteSheet("Hare", img);
        BomberpacGame.Pacman.generateSprites(spritesheet);
        BomberpacGame.PacmanPlayer.generateSprites(spritesheet);
        BomberpacGame.game = new BomberpacGame.ƒ.Node("Game");
        BomberpacGame.pacman = new BomberpacGame.Pacman("Pacman", 1, 1);
        pacmanPlayer = new BomberpacGame.PacmanPlayer("Enemy");
        level = new BomberpacGame.Level("obstacles");
        BomberpacGame.game.appendChild(BomberpacGame.pacman);
        BomberpacGame.game.appendChild(pacmanPlayer);
        BomberpacGame.game.appendChild(level);
        let cmpCamera = new BomberpacGame.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
        cmpCamera.pivot.translateX(14.4);
        cmpCamera.pivot.translateY(10);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.backgroundColor = BomberpacGame.ƒ.Color.CSS("black");
        let viewport = new BomberpacGame.ƒ.Viewport();
        viewport.initialize("Viewport", BomberpacGame.game, cmpCamera, canvas);
        viewport.draw();
        BomberpacGame.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        BomberpacGame.ƒ.Loop.start(BomberpacGame.ƒ.LOOP_MODE.TIME_GAME, 60);
        function update(_event) {
            viewport.draw();
        }
    }
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=Main.js.map
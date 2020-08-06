"use strict";
var Bomberpac;
(function (Bomberpac) {
    var ƒ = FudgeCore;
    Bomberpac.fCore = FudgeCore;
    Bomberpac.ƒAid = FudgeAid;
    load("data.json");
    window.addEventListener("load", init);
    Bomberpac.musicMuted = true;
    Bomberpac.soundMuted = true;
    let pacman;
    let enemy;
    let pacmanTwo;
    let floor;
    Bomberpac.keyBoard = false;
    let game = new Bomberpac.fCore.Node("game");
    let toggleData;
    function init(_event) {
        Bomberpac.showMenue();
        document.getElementById("startButton").addEventListener("click", hndLoad);
        document.getElementById("musicButton").addEventListener("click", Bomberpac.toggleMusic);
        document.getElementById("soundButton").addEventListener("click", Bomberpac.toggleSounds);
    }
    async function load(_filename) {
        let response = await fetch("data.json");
        let text = await response.text();
        Bomberpac.data = JSON.parse(text);
    }
    function fillArray() {
        Bomberpac.gameField = new Array();
        for (let y = 0; y <= 100; y++) {
            let row = new Array();
            for (let x = 0; x <= 100; x++) {
                row.push(0);
            }
            Bomberpac.gameField.push(row);
        }
    }
    function hndLoad(_event) {
        fillArray();
        let gameTime = new Bomberpac.fCore.Time();
        console.log(gameTime);
        document.getElementById("reloadMap").addEventListener("click", reloadMap);
        document.getElementById("menue").style.display = "none";
        document.getElementById("gameWrapper").style.display = "initial";
        let img = document.querySelector("img");
        let spritesheet = Bomberpac.ƒAid.createSpriteSheet("Spritesheet", img);
        Bomberpac.PacmanPlayerTwo.generateSprites(spritesheet);
        Bomberpac.Enemy.generateSprites(spritesheet);
        let value = document.getElementById('level').value;
        switch (value) {
            case "EASY":
                toggleData = Bomberpac.data.level[0];
                ("easy");
                break;
            case "MIDDLE":
                toggleData = Bomberpac.data.level[1];
                ("middle");
                break;
            case "HARD":
                toggleData = Bomberpac.data.level[2];
                ("hard");
                break;
        }
        initializeGame(toggleData);
        pacman = new Bomberpac.PacmanPlayerOne("PacmanOne", 2, 1, Bomberpac.gameField, game, toggleData);
        pacmanTwo = new Bomberpac.PacmanPlayerTwo("PacmanTwo", 28, 1, Bomberpac.gameField, game, toggleData);
        for (let i = 0; i < 5; i++) {
            enemy = new Bomberpac.Enemy("Enemy", Bomberpac.gameField, game);
            game.appendChild(enemy);
        }
        pacmanTwo.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * -1);
        game.appendChild(pacmanTwo);
        game.appendChild(pacman);
        ("pacman added");
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.backgroundColor = ƒ.Color.CSS("black");
        cmpCamera.pivot.translateZ(30.3);
        cmpCamera.pivot.translateX(14.5);
        cmpCamera.pivot.translateY(10);
        cmpCamera.pivot.rotateY(180);
        Bomberpac.viewport = new ƒ.Viewport();
        Bomberpac.viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log(Bomberpac.viewport);
        Bomberpac.viewport.draw();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
    }
    function update(_event) {
        Bomberpac.viewport.draw();
    }
    function initializeGame(data) {
        floor = new Bomberpac.Floor("Floor", Bomberpac.gameField, game, data);
        game.appendChild(floor);
    }
    function reloadMap() {
    }
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Main.js.map
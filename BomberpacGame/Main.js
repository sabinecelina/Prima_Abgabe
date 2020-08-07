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
    let enemy;
    let floor;
    Bomberpac.keyBoard = false;
    Bomberpac.game = new Bomberpac.fCore.Node("game");
    let toggleData;
    function init(_event) {
        Bomberpac.showMenue();
        document.getElementById("startButton").addEventListener("click", hndLoad);
        document.getElementById("controlButton").addEventListener("click", Bomberpac.showControls);
        document.getElementById("musicButton").addEventListener("click", Bomberpac.toggleMusic);
        document.getElementById("soundButton").addEventListener("click", Bomberpac.toggleSounds);
        document.getElementById("creditsButton").addEventListener("click", Bomberpac.showCredits);
        document.getElementById("backButton").addEventListener("click", Bomberpac.showMenue);
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
        Bomberpac.Sound.init();
        document.getElementById("endScreen").style.display = "none";
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
        Bomberpac.pacman = new Bomberpac.PacmanPlayerOne("PacmanOne", 1, 1, Bomberpac.gameField, Bomberpac.game, toggleData);
        Bomberpac.pacmanTwo = new Bomberpac.PacmanPlayerTwo("PacmanTwo", 28, 1, Bomberpac.gameField, Bomberpac.game, toggleData);
        let number = Number(toggleData.amountOfEnemies);
        let enemies = new Bomberpac.fCore.Node("Enemies");
        for (let i = 0; i < number; i++) {
            enemy = new Bomberpac.Enemy("Enemy", Bomberpac.gameField, Bomberpac.game);
            enemies.appendChild(enemy);
        }
        Bomberpac.game.appendChild(enemies);
        Bomberpac.pacmanTwo.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * -1);
        Bomberpac.game.appendChild(Bomberpac.pacmanTwo);
        Bomberpac.game.appendChild(Bomberpac.pacman);
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
        Bomberpac.viewport.initialize("Viewport", Bomberpac.game, cmpCamera, canvas);
        ƒ.Debug.log(Bomberpac.viewport);
        Bomberpac.viewport.draw();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
    }
    function update(_event) {
        Bomberpac.viewport.draw();
    }
    function initializeGame(data) {
        floor = new Bomberpac.Floor("Floor", Bomberpac.gameField, Bomberpac.game, data);
        Bomberpac.game.appendChild(floor);
    }
    function reloadMap() {
        let floorChild = Bomberpac.game.getChildrenByName("Floor")[0].getChildrenByName("Obstacles")[0];
        let floor = Bomberpac.game.getChildrenByName("Floor")[0].getChildrenByName("Obstacles")[0].getChildren();
        console.log("removing floor");
        for (let item of floor) {
            console.log(Bomberpac.gameField[item.mtxLocal.translation.x][item.mtxLocal.translation.y]);
            Bomberpac.gameField[item.mtxLocal.translation.x][item.mtxLocal.translation.y] = 0;
            console.log(Bomberpac.gameField[item.mtxLocal.translation.x][item.mtxLocal.translation.y]);
            floorChild.removeChild(item);
        }
        let foodChild = Bomberpac.game.getChildrenByName("Floor")[0].getChildrenByName("Food")[0];
        let food = Bomberpac.game.getChildrenByName("Floor")[0].getChildrenByName("Food")[0].getChildren();
        console.log("removing floor");
        for (let item of food) {
            Bomberpac.gameField[item.mtxLocal.translation.x][item.mtxLocal.translation.y] = 0;
            foodChild.removeChild(item);
        }
        let itemChild = Bomberpac.game.getChildrenByName("Floor")[0].getChildrenByName("Items")[0];
        let item = Bomberpac.game.getChildrenByName("Floor")[0].getChildrenByName("Items")[0].getChildren();
        console.log("removing floor");
        for (let items of item) {
            Bomberpac.gameField[items.mtxLocal.translation.x][items.mtxLocal.translation.y] = 0;
            itemChild.removeChild(items);
        }
        initializeGame(toggleData);
    }
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Main.js.map
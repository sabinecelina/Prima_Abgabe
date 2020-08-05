"use strict";
var Bomberpac;
(function (Bomberpac) {
    var ƒ = FudgeCore;
    Bomberpac.fCore = FudgeCore;
    load("data.json");
    window.addEventListener("load", init);
    let floor;
    let game = new Bomberpac.fCore.Node("game");
    let toggleData;
    function init(_event) {
        Bomberpac.showMenue();
        document.getElementById("startButton").addEventListener("click", hndLoad);
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
        document.getElementById("menue").style.display = "none";
        document.getElementById("gameWrapper").style.display = "initial";
        let value = document.getElementById('level').value;
        switch (value) {
            case "EASY":
                toggleData = Bomberpac.data.level[0];
                console.log("easy");
                break;
            case "MIDDLE":
                toggleData = Bomberpac.data.level[1];
                console.log("middle");
                break;
            case "HARD":
                toggleData = Bomberpac.data.level[2];
                console.log("hard");
                break;
        }
        initializeGame(toggleData);
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
    }
    function initializeGame(data) {
        floor = new Bomberpac.Floor("Floor", Bomberpac.gameField, game, data);
        game.appendChild(floor);
    }
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Main.js.map
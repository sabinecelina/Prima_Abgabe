"use strict";
var Bomberpac;
(function (Bomberpac) {
    class Floor extends Bomberpac.Gameobject {
        constructor(_name, gameField, game) {
            super(_name, gameField);
            this.color = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")));
            this.obstacles = new Bomberpac.fCore.Node("Obstacles");
            this.scale = 1;
            this.gameField = gameField;
            this.game = game;
            this.createFloor(200);
        }
        createFloor(_amountOfObstacles) {
            for (let i = 0; i < 31; i++) {
                let obstacle = new Bomberpac.Obstacle("wall", Bomberpac.gameField, i, 0, this.scale, Floor.mesh, this.color);
                this.obstacles.appendChild(obstacle);
                obstacle = new Bomberpac.Obstacle("wall", Bomberpac.gameField, i, 20, this.scale, Floor.mesh, this.color);
                this.obstacles.appendChild(obstacle);
            }
            for (let i = 0; i < 31; i++) {
                let obstacle = new Bomberpac.Obstacle("wall", Bomberpac.gameField, 0, i, this.scale, Floor.mesh, this.color);
                this.obstacles.appendChild(obstacle);
                obstacle = new Bomberpac.Obstacle("wall", Bomberpac.gameField, 29, i, this.scale, Floor.mesh, this.color);
                this.obstacles.appendChild(obstacle);
            }
            for (let i = 0; i < _amountOfObstacles; i++) {
                let randomTranslateX = Bomberpac.getRandomTranslateX();
                let randomTranslateY = Bomberpac.getRandomTranslateX();
                if ((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 28 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1 || (randomTranslateX == 3 && randomTranslateY == 1))) {
                }
                else {
                    let obstacles = new Bomberpac.Obstacle("obstacles", Bomberpac.gameField, randomTranslateX, randomTranslateY, this.scale, Floor.mesh, this.color);
                    this.obstacles.appendChild(obstacles);
                }
            }
            this.game.appendChild(this.obstacles);
        }
    }
    Floor.mesh = new Bomberpac.fCore.MeshCube();
    Bomberpac.Floor = Floor;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Floor.js.map
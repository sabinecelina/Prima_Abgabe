"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    var fCore = FudgeCore;
    class Level extends BomberpacGame.Gameobject {
        constructor(_name) {
            super(_name, BomberpacGame.matrix);
            this.img = document.querySelector("img");
            this.spritesheet = BomberpacGame.ƒAid.createSpriteSheet("Food", this.img);
            this.mesh = new BomberpacGame.ƒ.MeshCube();
            this.mtrSolidWhite = new BomberpacGame.ƒ.Material("SolidWhite", BomberpacGame.ƒ.ShaderUniColor, new BomberpacGame.ƒ.CoatColored(BomberpacGame.ƒ.Color.CSS("BLUE")));
            this.obstacle = new fCore.Node("Obstacles");
            this.amountOfObstacles = 20;
            this.createLevel(220);
            this.createFood(110);
            this.generateItem();
        }
        static randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        createLevel(_amountOfObstacles) {
            for (let i = 0; i < 30; i++) {
                let obstacles = new BomberpacGame.Obstacles("wall", BomberpacGame.matrix, i, 0, BomberpacGame.scale, this.mesh, this.mtrSolidWhite);
                this.obstacle.appendChild(obstacles);
                obstacles = new BomberpacGame.Obstacles("wall", BomberpacGame.matrix, i, 20, BomberpacGame.scale, this.mesh, this.mtrSolidWhite);
                this.obstacle.appendChild(obstacles);
            }
            for (let i = 0; i < 20; i++) {
                let obstacles = new BomberpacGame.Obstacles("wall", BomberpacGame.matrix, 0, i, BomberpacGame.scale, this.mesh, this.mtrSolidWhite);
                this.obstacle.appendChild(obstacles);
                obstacles = new BomberpacGame.Obstacles("wall", BomberpacGame.matrix, 29, i, BomberpacGame.scale, this.mesh, this.mtrSolidWhite);
                this.obstacle.appendChild(obstacles);
            }
            for (let i = 0; i < _amountOfObstacles; i++) {
                let randomTranslateX = Level.randomInteger(1, 28);
                let randomTranslateY = Level.randomInteger(1, 19);
                if ((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 28 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1 || (randomTranslateX == 3 && randomTranslateY == 1))) {
                }
                else {
                    let obstacles = new BomberpacGame.Obstacles("obstacles", BomberpacGame.matrix, randomTranslateX, randomTranslateY, BomberpacGame.scale, this.mesh, this.mtrSolidWhite);
                    this.obstacle.appendChild(obstacles);
                }
            }
            BomberpacGame.game.appendChild(this.obstacle);
        }
        createFood(_amountofFood) {
            let foodNode = new fCore.Node("Food");
            let food;
            BomberpacGame.Food.generateSprites(this.spritesheet);
            for (let i = 0; i < _amountofFood; i++) {
                let randomTranslateX = Level.randomInteger(1, 28);
                let randomTranslateY = Level.randomInteger(1, 19);
                if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || BomberpacGame.matrix[randomTranslateX][randomTranslateY] == 1)) {
                    food = new BomberpacGame.Food("food", randomTranslateX, randomTranslateY, BomberpacGame.matrix);
                    foodNode.appendChild(food);
                    BomberpacGame.game.appendChild(foodNode);
                }
            }
        }
        generateItem() {
            let itemNode = new fCore.Node("Items");
            let item;
            let id = 0;
            let img = document.querySelector("img");
            let spritesheet = BomberpacGame.ƒAid.createSpriteSheet("Item", img);
            for (let i = 0; i < 230; i += 32.6) {
                id = id + 1;
                let randomTranslateX = Level.randomInteger(2, 27);
                let randomTranslateY = Level.randomInteger(2, 19);
                BomberpacGame.Item.generateSprites(spritesheet, i);
                item = new BomberpacGame.Item("Item", 1, randomTranslateY, BomberpacGame.matrix, id);
                itemNode.appendChild(item);
            }
            BomberpacGame.game.appendChild(itemNode);
        }
    }
    BomberpacGame.Level = Level;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=Level.js.map
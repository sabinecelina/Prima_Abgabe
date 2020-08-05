"use strict";
var Bomberpac;
(function (Bomberpac) {
    var ƒAid = FudgeAid;
    class Floor extends Bomberpac.Gameobject {
        constructor(_name, gameField, game, data) {
            super(_name, gameField);
            this.img = document.querySelector("img");
            this.spritesheet = ƒAid.createSpriteSheet("Spritesheet", this.img);
            this.color = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")));
            this.obstacles = new Bomberpac.fCore.Node("Obstacles");
            this.scale = 1;
            this.gameField = gameField;
            this.game = game;
            this.data = data;
            this.fetchData();
            this.createFloor(this.amountOfObstacles);
            this.createFood(this.amountOfFood);
            this.createItems(this.amountOfItems);
            console.log(this.data);
        }
        fetchData() {
            this.amountOfObstacles = Number(this.data.amountOfObstacles);
            this.amountOfFood = Number(this.data.amountOfFood);
            this.amountOfItems = Number(this.data.amountOfItems);
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
            while (this.obstacles.getChildrenByName("obstacles").length < _amountOfObstacles) {
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
        createFood(_amountofFood) {
            let foodNode = new Bomberpac.fCore.Node("Food");
            let food;
            Bomberpac.Food.generateSprites(this.spritesheet);
            for (let i = 0; i < _amountofFood; i++) {
                let randomTranslateX = Bomberpac.randomInteger(1, 28);
                let randomTranslateY = Bomberpac.randomInteger(1, 19);
                if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || this.gameField[randomTranslateX][randomTranslateY] == 1)) {
                    food = new Bomberpac.Food("food", randomTranslateX, randomTranslateY, this.gameField);
                    foodNode.appendChild(food);
                    this.game.appendChild(foodNode);
                }
            }
        }
        createItems(_amountOfItems) {
            let id = 0;
            let sprites = [0, 32.6, 65.2, 97.8, 130.3, 163, 195.6, 228.2];
            let itemNode = new Bomberpac.fCore.Node("Items");
            let pill;
            let img = document.querySelector("img");
            let spritesheet = ƒAid.createSpriteSheet("Item", img);
            for (let i = 0; i < _amountOfItems; i++) {
                let randomNumber = Bomberpac.randomInteger(0, 7);
                switch (randomNumber) {
                    case 0:
                        id = 0;
                        break;
                    case 1:
                        id = 1;
                        break;
                    case 2:
                        id = 2;
                        break;
                    case 3:
                        id = 3;
                        break;
                    case 4:
                        id = 4;
                        break;
                    case 5:
                        id = 5;
                        break;
                    case 6:
                        id = 6;
                        break;
                    case 7:
                        id = 7;
                        break;
                }
                console.log(i);
                let randomTranslateX = Bomberpac.getRandomTranslateX();
                let randomTranslateY = Bomberpac.getRandomTranslateY();
                Bomberpac.Pill.generateSprites(spritesheet, sprites[randomNumber]);
                pill = new Bomberpac.Pill("Item", randomTranslateX, randomTranslateY, this.gameField, id);
                itemNode.appendChild(pill);
            }
            this.game.appendChild(itemNode);
        }
    }
    Floor.mesh = new Bomberpac.fCore.MeshCube();
    Bomberpac.Floor = Floor;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Floor.js.map
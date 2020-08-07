"use strict";
var Bomberpac;
(function (Bomberpac) {
    var fCore = FudgeCore;
    class Man extends Bomberpac.Sprite {
        constructor(_name, translateX, translateY, gameField, game, data) {
            super(_name, translateX, translateY, gameField);
            this.speed = fCore.Vector3.ZERO();
            this.img = document.querySelector("img");
            this.spritesheet = Bomberpac.ƒAid.createSpriteSheet("Pacman", this.img);
            this.score = 0;
            this.game = game;
            this.gameField = gameField;
            this.data = data;
            this.fetchData();
        }
        /*
        private checkCollision(): boolean {
          let cmpTransform: fCore.Vector3 = this.cmpTransform.local.translation;
          let x: number = cmpTransform.x / scale;
          let y: number = cmpTransform.y / scale;
          //console.log(x + ", " + y);^
          let yMinus: number = Math.floor(y);
          let yPlus: number = Math.ceil(y);
          let xMinus: number = Math.floor(x);
          let xPlus: number = Math.ceil(x);
          let isCollided: boolean = false;
          if (matrix[xMinus][yPlus] == 1) {
            isCollided = true;
          }
          if (matrix[xMinus][yMinus] == 1) {
            isCollided = true;
          }
          if (matrix[xPlus][yPlus] == 1) {
            isCollided = true;
          }
          if (matrix[xPlus][yMinus] == 1) {
            isCollided = true;
          }
          return isCollided;
        }*/
        collide() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Obstacles")[0].getChildren();
            let check = false;
            for (let obstacle of node) {
                if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.9)) {
                    check = true;
                }
            }
            return check;
        }
        fetchData() {
            this.amountOfBombs = Number(this.data.amountOfBombs);
            this.lives = Number(this.data.lives);
        }
        //console.log(this.speed.x);
        static generateSprites(_spritesheet) {
            Man.animations = {};
            let sprite = new Bomberpac.ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.WALK, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            Man.animations[Bomberpac.ACTION.WALK] = sprite;
            sprite = new Bomberpac.ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            Man.animations[Bomberpac.ACTION.IDLE] = sprite;
            sprite.frames[2].timeScale = 10;
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Man.animations[_action]);
        }
        eatFood() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Food")[0].getChildren();
            for (let food of node) {
                if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
                    let _currentTranslation = food.mtxLocal.translation;
                    this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
                    let randomTranslateX = Bomberpac.getRandomTranslateX();
                    let randomTranslateY = Bomberpac.getRandomTranslateY();
                    this.gameField[randomTranslateX][randomTranslateY] = 1;
                    food.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
                    this.score++;
                    Bomberpac.Sound.play("pacman_eat");
                }
            }
        }
        createBomb() {
            let node = Bomberpac.game.getChildrenByName("bomb");
            if (node.length < 2) {
                let bomb;
                Bomberpac.Bomb.generateSprites(this.spritesheet);
                let manTranslation = this.mtxLocal.translation;
                bomb = new Bomberpac.Bomb("bomb", manTranslation.x, manTranslation.y, this.gameField);
                this.game.appendChild(bomb);
                if (bomb.mtxLocal.translation.isInsideSphere(Bomberpac.pacman.mtxLocal.translation, range)) {
                    if (this.name == Bomberpac.pacman.name) {
                        Bomberpac.pacmanTwo.mtxLocal.translation = new fCore.Vector3(11, 11, 0);
                        Bomberpac.pacman.lives - 1;
                    }
                    else if (bomb.mtxLocal.translation.isInsideSphere(Bomberpac.pacmanTwo.mtxLocal.translation, 0.9)) {
                        if (Bomberpac.pacmanTwo.name = this.name) {
                            Bomberpac.pacman.mtxLocal.translation = new fCore.Vector3(11, 11, 0);
                            Bomberpac.pacman.lives - 1;
                        }
                    }
                }
            }
        }
    }
    Man.color = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("DEEPPINK")));
    Bomberpac.Man = Man;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Man.js.map
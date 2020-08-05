"use strict";
var Bomberpac;
(function (Bomberpac) {
    var fCore = FudgeCore;
    class Pacman extends Bomberpac.Sprite {
        constructor(_name = "Pacman", translateX, translateY, gameField, game) {
            super(_name, translateX, translateY, gameField);
            this.speed = fCore.Vector3.ZERO();
            this.speedMax = new ƒ.Vector3(3, 3, 3); // units per second
            this.score = 0;
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.eatFood();
                this.collide();
            };
            this.nav = document.getElementById("scorePlayerOne");
            this.game = game;
            this.gameField = gameField;
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Pacman.animations = {};
            let sprite = new Bomberpac.ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.WALK, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            Pacman.animations[Bomberpac.ACTION.WALK] = sprite;
            sprite = new Bomberpac.ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            Pacman.animations[Bomberpac.ACTION.IDLE] = sprite;
            sprite.frames[2].timeScale = 10;
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Pacman.animations[_action]);
        }
        act(_action, _direction) {
            let oldDirection = this.cmpTransform.local.rotation;
            let cmpTr = new fCore.Vector3();
            switch (_action) {
                case Bomberpac.ACTION.IDLE:
                    this.speed.x = 0;
                    this.speed.y = 0;
                    break;
                case Bomberpac.ACTION.WALK:
                    if (_direction == 0 || _direction == 1) {
                        let direction = (_direction == Bomberpac.DIRECTION.RIGHT ? 1 : -1);
                        this.speed.x = this.speedMax.x; // * direction;
                        cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
                    }
                    else if (_direction == 2 || _direction == 3) {
                        let direction = (_direction == Bomberpac.DIRECTION.UP ? 1 : -1);
                        this.speed.x = this.speedMax.x;
                        cmpTr = ƒ.Vector3.Z(90 * direction);
                    }
                    if (this.collide()) {
                        this.speed.x = -1;
                        cmpTr = oldDirection;
                    }
                    this.cmpTransform.local.rotation = cmpTr;
                    break;
            }
            if (_action == this.action)
                return;
            this.action = _action;
            this.show(_action);
        }
        collide() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Obstacles")[0].getChildren();
            let check = false;
            for (let obstacle of node) {
                if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.8)) {
                    check = true;
                    this.speedMax.x = 7;
                }
            }
            return check;
        }
        /*private checkCollision(): boolean {
          let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
          let node: fCore.Node[] = game.getChildrenByName("Node")[0].getChildrenByName("food");
          for (let food of node) {
            if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.9)) {
              console.log("attached");
            }
          }
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
        }
        */
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
                    this.nav.innerText = "Score: " + this.score;
                    this.score++;
                    Bomberpac.Sound.play("pacman_eat");
                }
            }
        }
    }
    Bomberpac.Pacman = Pacman;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Pacman.js.map
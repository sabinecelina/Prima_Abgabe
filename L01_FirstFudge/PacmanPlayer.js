"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    var ƒ = FudgeCore;
    var fCore = FudgeCore;
    var ƒAid = FudgeAid;
    class PacmanPlayer extends BomberpacGame.Sprite {
        constructor(_name = "PacmanPlayer") {
            super(_name, 28, 1, BomberpacGame.matrix);
            this.speed = ƒ.Vector3.ZERO();
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
                this.eatFood();
                this.collide();
            };
            this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * -1);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        collide() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = BomberpacGame.game.getChildrenByName("Obstacles")[0].getChildren();
            let check = false;
            for (let obstacle of node) {
                if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.9)) {
                    console.log("attached");
                    check = true;
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
        static generateSprites(_spritesheet) {
            PacmanPlayer.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(BomberpacGame.ACTION.WALK, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            PacmanPlayer.animations[BomberpacGame.ACTION.WALK] = sprite;
            sprite = new ƒAid.SpriteSheetAnimation(BomberpacGame.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            PacmanPlayer.animations[BomberpacGame.ACTION.IDLE] = sprite;
            sprite.frames[2].timeScale = 10;
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(PacmanPlayer.animations[_action]);
        }
        act(_action, _direction) {
            let oldDirection = this.cmpTransform.local.rotation;
            let cmpTr = new fCore.Vector3();
            switch (_action) {
                case BomberpacGame.ACTION.IDLE:
                    this.speed.x = 0;
                    this.speed.y = 0;
                    break;
                case BomberpacGame.ACTION.WALK:
                    if (_direction == 0 || _direction == 1) {
                        let direction = (_direction == BomberpacGame.DIRECTION.RIGHT ? 1 : -1);
                        this.speed.x = PacmanPlayer.speedMax.x; // * direction;
                        cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
                    }
                    else if (_direction == 2 || _direction == 3) {
                        let direction = (_direction == BomberpacGame.DIRECTION.UP ? 1 : -1);
                        this.speed.x = PacmanPlayer.speedMax.x;
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
        processInput() {
            if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A]))
                this.act(BomberpacGame.ACTION.WALK, BomberpacGame.DIRECTION.LEFT);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D]))
                this.act(BomberpacGame.ACTION.WALK, BomberpacGame.DIRECTION.RIGHT);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.W]))
                this.act(BomberpacGame.ACTION.WALK, BomberpacGame.DIRECTION.UP);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.S]))
                this.act(BomberpacGame.ACTION.WALK, BomberpacGame.DIRECTION.DOWN);
            else
                this.act(BomberpacGame.ACTION.IDLE);
        }
        eatFood() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = BomberpacGame.game.getChildrenByName("Food")[0].getChildrenByName("food");
            for (let food of node) {
                if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
                    let _currentTranslation = food.mtxLocal.translation;
                    BomberpacGame.matrix[_currentTranslation.x][_currentTranslation.y] = 0;
                    let randomTranslateX = BomberpacGame.Level.randomInteger(1, 28);
                    let randomTranslateY = BomberpacGame.Level.randomInteger(1, 19);
                    BomberpacGame.matrix[randomTranslateX][randomTranslateY] = 1;
                    food.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
                }
            }
        }
    }
    PacmanPlayer.speedMax = new ƒ.Vector3(4, 4, 4); // units per second
    BomberpacGame.PacmanPlayer = PacmanPlayer;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=PacmanPlayer.js.map
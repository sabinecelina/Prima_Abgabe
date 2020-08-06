"use strict";
var Bomberpac;
(function (Bomberpac) {
    var ƒ = FudgeCore;
    var fCore = FudgeCore;
    var ƒAid = FudgeAid;
    class Enemy extends Bomberpac.Sprite {
        constructor(_name = "Enemy", gamfield, game) {
            super(_name, 10, 10, gamfield);
            this.speedMaxEnemy = new ƒ.Vector3(4, 4, 4); // units per second
            this.speed = ƒ.Vector3.ZERO();
            this.number = 0;
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
                this.eatFood();
            };
            this.game = game;
            this.gameField = gamfield;
            this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.RIGHT);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        collide() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Obstacles")[0].getChildren();
            let check = false;
            for (let obstacle of node) {
                if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.95)) {
                    check = true;
                }
            }
            return check;
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.WALK, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 64, 32, 30), 2, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            Enemy.animations[Bomberpac.ACTION.WALK] = sprite;
            sprite = new ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 64, 32, 30), 2, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            Enemy.animations[Bomberpac.ACTION.IDLE] = sprite;
            sprite.frames[1].timeScale = 1;
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Enemy.animations[_action]);
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
                        if (_direction == Bomberpac.DIRECTION.RIGHT) {
                            this._enemyDirection = Bomberpac.DIRECTION.RIGHT;
                        }
                        else {
                            this._enemyDirection = Bomberpac.DIRECTION.LEFT;
                        }
                        this.speed.x = this.speedMaxEnemy.x; // * direction;
                        cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
                    }
                    else if (_direction == 2 || _direction == 3) {
                        let direction = (_direction == Bomberpac.DIRECTION.UP ? 1 : -1);
                        if (_direction == Bomberpac.DIRECTION.UP) {
                            this._enemyDirection = Bomberpac.DIRECTION.UP;
                        }
                        else {
                            this._enemyDirection = Bomberpac.DIRECTION.DOWN;
                        }
                        this.speed.x = this.speedMaxEnemy.x;
                        cmpTr = ƒ.Vector3.Z(90 * direction);
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
            if (this.collide()) {
                console.log(this.number);
                this.number = 1;
                let randomNumber = Bomberpac.randomInteger(0, 4);
                this.speed.x = -this.speedMaxEnemy.x;
                let oldTranslation = this.mtxLocal.translation.copy;
                this.mtxLocal.translation = new fCore.Vector3(Bomberpac.getRandomTranslateX(), Bomberpac.getRandomTranslateY());
                console.log("it worked");
                if (this._enemyDirection == randomNumber) {
                }
                else if (this._enemyDirection == Bomberpac.DIRECTION.LEFT || this._enemyDirection == Bomberpac.DIRECTION.RIGHT) {
                    randomNumber = Bomberpac.randomInteger(2, 4);
                    this.act(Bomberpac.ACTION.WALK, randomNumber);
                }
                else if (this._enemyDirection == Bomberpac.DIRECTION.UP || this._enemyDirection == Bomberpac.DIRECTION.DOWN) {
                    randomNumber = Bomberpac.randomInteger(0, 2);
                    this.act(Bomberpac.ACTION.WALK, randomNumber);
                }
            }
        }
        eatFood() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Food")[0].getChildrenByName("food");
            let nodeTwo = this.game.getChildrenByName("Food")[0];
            for (let food of node) {
                if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
                    let _currentTranslation = food.mtxLocal.translation;
                    this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
                    nodeTwo.removeChild(food);
                }
            }
        }
    }
    Bomberpac.Enemy = Enemy;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Enemy.js.map
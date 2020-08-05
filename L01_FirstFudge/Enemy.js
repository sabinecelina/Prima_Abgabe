"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    var ƒ = FudgeCore;
    var fCore = FudgeCore;
    var ƒAid = FudgeAid;
    class Enemy extends BomberpacGame.Sprite {
        constructor(_name = "Enemy") {
            super(_name, 10, 10, BomberpacGame.matrix);
            this.speedMaxEnemy = new ƒ.Vector3(4, 4, 4); // units per second
            this.speed = ƒ.Vector3.ZERO();
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
                this.eatFood();
            };
            this.act(BomberpacGame.ACTION.WALK, BomberpacGame.DIRECTION.RIGHT);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        collide() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = BomberpacGame.game.getChildrenByName("Obstacles")[0].getChildren();
            let check = false;
            for (let obstacle of node) {
                if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.9)) {
                    check = true;
                }
            }
            return check;
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(BomberpacGame.ACTION.WALK, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 64, 32, 30), 2, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            Enemy.animations[BomberpacGame.ACTION.WALK] = sprite;
            sprite = new ƒAid.SpriteSheetAnimation(BomberpacGame.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 64, 32, 30), 2, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
            Enemy.animations[BomberpacGame.ACTION.IDLE] = sprite;
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
                case BomberpacGame.ACTION.IDLE:
                    this.speed.x = 0;
                    this.speed.y = 0;
                    break;
                case BomberpacGame.ACTION.WALK:
                    if (_direction == 0 || _direction == 1) {
                        let direction = (_direction == BomberpacGame.DIRECTION.RIGHT ? 1 : -1);
                        if (_direction == BomberpacGame.DIRECTION.RIGHT) {
                            this._enemyDirection = BomberpacGame.DIRECTION.RIGHT;
                        }
                        else {
                            this._enemyDirection = BomberpacGame.DIRECTION.LEFT;
                        }
                        this.speed.x = this.speedMaxEnemy.x; // * direction;
                        cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
                    }
                    else if (_direction == 2 || _direction == 3) {
                        let direction = (_direction == BomberpacGame.DIRECTION.UP ? 1 : -1);
                        if (_direction == BomberpacGame.DIRECTION.UP) {
                            this._enemyDirection = BomberpacGame.DIRECTION.UP;
                        }
                        else {
                            this._enemyDirection = BomberpacGame.DIRECTION.DOWN;
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
                let randomNumber = BomberpacGame.Level.randomInteger(0, 4);
                if (this._enemyDirection == randomNumber) {
                }
                else if (this._enemyDirection == BomberpacGame.DIRECTION.LEFT || this._enemyDirection == BomberpacGame.DIRECTION.RIGHT) {
                    randomNumber = BomberpacGame.Level.randomInteger(2, 4);
                    this.act(BomberpacGame.ACTION.WALK, randomNumber);
                }
                else if (this._enemyDirection == BomberpacGame.DIRECTION.UP || this._enemyDirection == BomberpacGame.DIRECTION.DOWN) {
                    randomNumber = BomberpacGame.Level.randomInteger(0, 2);
                    this.act(BomberpacGame.ACTION.WALK, randomNumber);
                }
            }
        }
        eatFood() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = BomberpacGame.game.getChildrenByName("Node")[0].getChildrenByName("food");
            let nodeTwo = BomberpacGame.game.getChildrenByName("Node")[0];
            for (let food of node) {
                if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
                    let _currentTranslation = food.mtxLocal.translation;
                    BomberpacGame.matrix[_currentTranslation.x][_currentTranslation.y] = 0;
                    nodeTwo.removeChild(food);
                }
            }
        }
    }
    BomberpacGame.Enemy = Enemy;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=Enemy.js.map
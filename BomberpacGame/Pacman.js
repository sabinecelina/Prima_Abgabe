"use strict";
var Bomberpac;
(function (Bomberpac) {
    var fCore = FudgeCore;
    class PacmanPlayerTwo extends Bomberpac.Man {
        constructor(_name, translateX, translateY, gamefield, game, data) {
            super(_name, translateX, translateY, gamefield, game, data);
            this.img = document.querySelector("img");
            this.spritesheet = Bomberpac.ƒAid.createSpriteSheet("Pacman", this.img);
            this.translation = fCore.Vector3.ZERO();
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
                this.eatFood();
                this.eatItem();
                this.isWinning();
                if (this.gameOver()) {
                    Bomberpac.Sound.play("pacman_death");
                    Bomberpac.gameOverScreen("playerTwo");
                }
                this.collide();
            };
            this.game = game;
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        gameOver() {
            if (this.lives < 1)
                return true;
            return false;
        }
        isWinning() {
            if (this.score = 5)
                return true;
            console.log(this.score);
            return false;
        }
        processInput() {
            if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.LEFT);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.RIGHT);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.W]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.UP);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.S]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.DOWN);
            else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SHIFT_LEFT])) {
                this.act(Bomberpac.ACTION.EXPLODE);
            }
            else
                this.act(Bomberpac.ACTION.IDLE);
        }
        act(_action, _direction) {
            let oldDirection = this.cmpTransform.local.rotation;
            let cmpRotation = new fCore.Vector3();
            switch (_action) {
                case Bomberpac.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case Bomberpac.ACTION.WALK:
                    if (_direction == 0 || _direction == 1) {
                        let direction = (_direction == Bomberpac.DIRECTION.RIGHT ? 1 : -1);
                        this.speed.x = PacmanPlayerTwo.speedMaxPlayerTwo.x; // * direction;
                        this.translation = this.mtxLocal.translation;
                        cmpRotation = ƒ.Vector3.Y(90 - 90 * direction);
                    }
                    else if (_direction == 2 || _direction == 3) {
                        let direction = (_direction == Bomberpac.DIRECTION.UP ? 1 : -1);
                        this.speed.x = PacmanPlayerTwo.speedMaxPlayerTwo.x;
                        this.translation = this.mtxLocal.translation;
                        cmpRotation = ƒ.Vector3.Z(90 * direction);
                    }
                    if (this.collide()) {
                        this.speed.x = -1;
                        cmpRotation = oldDirection;
                    }
                    this.cmpTransform.local.rotation = cmpRotation;
                    break;
                case Bomberpac.ACTION.EXPLODE:
                    this.createBomb();
                    break;
            }
            if (_action == this.action)
                return;
            this.action = _action;
            this.show(_action);
        }
        eatItem() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Floor")[0].getChildrenByName("Items")[0].getChildren();
            for (let item of node) {
                let rect = item.getID();
                if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
                    let _currentTranslation = item.mtxLocal.translation;
                    this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
                    let randomTranslateX = Bomberpac.getRandomTranslateX();
                    let randomTranslateY = Bomberpac.getRandomTranslateY();
                    this.gameField[randomTranslateX][randomTranslateY] = 1;
                    item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
                    this.score++;
                    Bomberpac.Sound.play("pacman_eatfruit");
                    switch (rect) {
                        case 1:
                            ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
                            PacmanPlayerTwo.speedMaxPlayerTwo.x = 10;
                            break;
                        case 2:
                            let randomTranslateX = Bomberpac.getRandomTranslateX();
                            let randomTranslateY = Bomberpac.getRandomTranslateY();
                            if (!(this.gameField[randomTranslateX][randomTranslateY] == 1))
                                this.mtxLocal.translation = new fCore.Vector3(Bomberpac.getRandomTranslateX(), Bomberpac.getRandomTranslateY(), 0);
                            break;
                        case 3:
                            this.amountOfBombs++;
                        case 4:
                            ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
                            PacmanPlayerTwo.speedMaxPlayerTwo.x = 1;
                        case 5:
                            ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
                            PacmanPlayerTwo.speedMaxPlayerTwo.x = 0;
                        case 6:
                            this.score++;
                        case 7:
                            break;
                    }
                }
            }
        }
        handleEventItem() {
            console.log("something happened");
            PacmanPlayerTwo.speedMaxPlayerTwo.x = 3;
        }
        createBomb() {
            console.log(this.name);
            if (this.amountOfBombs != 0) {
                let node = Bomberpac.game.getChildrenByName("bomb");
                let bomb;
                if (node.length < 1) {
                    Bomberpac.Bomb.generateSprites(this.spritesheet);
                    let manTranslation = this.mtxLocal.translation;
                    bomb = new Bomberpac.Bomb("bomb", manTranslation.x, manTranslation.y, this.gameField);
                    this.game.appendChild(bomb);
                    console.log(this.amountOfBombs);
                    console.log(this.mtxLocal.translation);
                    if (bomb.mtxLocal.translation.isInsideSphere(Bomberpac.pacman.mtxLocal.translation, bomb.range)) {
                        Bomberpac.pacman.mtxLocal.translation = new fCore.Vector3(12, 12, 0);
                    }
                }
                let enemies = this.game.getChildrenByName("Enemies")[0].getChildren();
                for (let enemy of enemies) {
                    if (enemy.mtxLocal.translation.isInsideSphere(bomb.mtxLocal.translation, bomb.range)) {
                        this.game.removeChild(enemy);
                        //ƒ.Time.game.setTimer(5000, 1, this.setTranslationReset);
                    }
                }
                this.amountOfBombs--;
                Bomberpac.pacman.lives--;
                node = this.game.getChildrenByName("bomb");
                console.log(node);
                for (let bomb of node) {
                    this.game.removeChild(bomb);
                }
            }
        }
    }
    PacmanPlayerTwo.speedMaxPlayerTwo = new ƒ.Vector3(3, 3, 3); // units per second
    Bomberpac.PacmanPlayerTwo = PacmanPlayerTwo;
    class PacmanPlayerOne extends Bomberpac.Man {
        constructor(_name, translateX, translateY, gamefield, game, data) {
            super(_name, translateX, translateY, gamefield, game, data);
            this.img = document.querySelector("img");
            this.spritesheet = Bomberpac.ƒAid.createSpriteSheet("Bomb", this.img);
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
                this.eatFood();
                this.eatItem();
                if (this.gameOver()) {
                    Bomberpac.Sound.play("pacman_death");
                    Bomberpac.gameOverScreen("playerTwo");
                }
            };
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        gameOver() {
            if (this.lives < 1)
                return true;
            return false;
        }
        eatItem() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Floor")[0].getChildrenByName("Items")[0].getChildren();
            for (let item of node) {
                let rect = item.getID();
                if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
                    let _currentTranslation = item.mtxLocal.translation;
                    this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
                    let randomTranslateX = Bomberpac.getRandomTranslateX();
                    let randomTranslateY = Bomberpac.getRandomTranslateY();
                    this.gameField[randomTranslateX][randomTranslateY] = 1;
                    item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
                    this.score++;
                    Bomberpac.Sound.play("pacman_eatfruit");
                    switch (rect) {
                        case 1:
                            ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
                            PacmanPlayerOne.speedMaxPlayerOne.x = 10;
                            break;
                        case 2:
                            let randomTranslateX = Bomberpac.getRandomTranslateX();
                            let randomTranslateY = Bomberpac.getRandomTranslateY();
                            if (!(this.gameField[randomTranslateX][randomTranslateY] == 1))
                                this.mtxLocal.translation = new fCore.Vector3(Bomberpac.getRandomTranslateX(), Bomberpac.getRandomTranslateY(), 0);
                            break;
                        case 3:
                            this.amountOfBombs++;
                            console.log(this.amountOfBombs);
                        case 4:
                            ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
                            PacmanPlayerOne.speedMaxPlayerOne.x = 0.5;
                        case 5:
                            ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
                            PacmanPlayerOne.speedMaxPlayerOne.x = 1;
                        case 6:
                            this.score++;
                        case 7:
                            ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
                            PacmanPlayerOne.speedMaxPlayerOne.x = 0;
                            break;
                    }
                }
            }
        }
        act(_action, _direction) {
            let oldDirection = this.cmpTransform.local.rotation;
            let cmpTr = new fCore.Vector3();
            switch (_action) {
                case Bomberpac.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case Bomberpac.ACTION.WALK:
                    if (_direction == 0 || _direction == 1) {
                        let direction = (_direction == Bomberpac.DIRECTION.RIGHT ? 1 : -1);
                        this.speed.x = PacmanPlayerOne.speedMaxPlayerOne.x; // * direction;
                        cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
                    }
                    else if (_direction == 2 || _direction == 3) {
                        let direction = (_direction == Bomberpac.DIRECTION.UP ? 1 : -1);
                        this.speed.x = PacmanPlayerOne.speedMaxPlayerOne.x;
                        cmpTr = ƒ.Vector3.Z(90 * direction);
                    }
                    if (this.collide()) {
                        this.speed.x = -1;
                        cmpTr = oldDirection;
                    }
                    this.cmpTransform.local.rotation = cmpTr;
                    break;
                case Bomberpac.ACTION.EXPLODE:
                    this.createBomb();
                    break;
            }
            if (_action == this.action)
                return;
            this.action = _action;
            this.show(_action);
        }
        handleEventItem() {
            console.log("something happened");
            PacmanPlayerOne.speedMaxPlayerOne.x = 3;
        }
        //@Override
        processInput() {
            if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.LEFT);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.RIGHT);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_UP]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.UP);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_DOWN]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.DOWN);
            else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
                this.act(Bomberpac.ACTION.EXPLODE);
            else
                this.act(Bomberpac.ACTION.IDLE);
        }
        createBomb() {
            console.log(this.name);
            if (this.amountOfBombs != 0) {
                let node = Bomberpac.game.getChildrenByName("bomb");
                let bomb;
                if (node.length < 1) {
                    Bomberpac.Bomb.generateSprites(this.spritesheet);
                    let manTranslation = this.mtxLocal.translation;
                    bomb = new Bomberpac.Bomb("bomb", manTranslation.x, manTranslation.y, this.gameField);
                    this.game.appendChild(bomb);
                    this.amountOfBombs--;
                    console.log(this.amountOfBombs);
                    console.log(this.mtxLocal.translation);
                    if (bomb.mtxLocal.translation.isInsideSphere(Bomberpac.pacmanTwo.mtxLocal.translation, bomb.range)) {
                        Bomberpac.pacmanTwo.mtxLocal.translation = new fCore.Vector3(12, 12, 0);
                    }
                }
                let enemies = this.game.getChildrenByName("Enemies")[0].getChildren();
                for (let enemy of enemies) {
                    if (enemy.mtxLocal.translation.isInsideSphere(bomb.mtxLocal.translation, bomb.range)) {
                        this.game.removeChild(enemy);
                        //ƒ.Time.game.setTimer(5000, 1, this.setTranslationReset);
                    }
                }
                node = this.game.getChildrenByName("bomb");
                console.log(node);
                for (let bomb of node) {
                    this.game.removeChild(bomb);
                }
            }
            this.amountOfBombs--;
            Bomberpac.pacmanTwo.lives--;
        }
    }
    PacmanPlayerOne.speedMaxPlayerOne = new ƒ.Vector3(3, 3, 3); // units per second
    Bomberpac.PacmanPlayerOne = PacmanPlayerOne;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Pacman.js.map
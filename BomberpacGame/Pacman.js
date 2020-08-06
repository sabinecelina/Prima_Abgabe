"use strict";
var Bomberpac;
(function (Bomberpac) {
    var fCore = FudgeCore;
    class PacmanPlayerTwo extends Bomberpac.Man {
        constructor(_name, translateX, translateY, gamefield, game, data) {
            super(_name, translateX, translateY, gamefield, game, data);
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
                this.eatFood();
                this.eatItem();
            };
            this.game = game;
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
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
            /*else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
              console.log("LEFT");
            this.act(ACTION.EXPLODE);*/
            else
                this.act(Bomberpac.ACTION.IDLE);
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
                        this.speed.x = PacmanPlayerTwo.speedMaxPlayerTwo.x; // * direction;
                        cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
                    }
                    else if (_direction == 2 || _direction == 3) {
                        let direction = (_direction == Bomberpac.DIRECTION.UP ? 1 : -1);
                        this.speed.x = PacmanPlayerTwo.speedMaxPlayerTwo.x;
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
        eatItem() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Items")[0].getChildren();
            for (let item of node) {
                let rect = item.getID();
                if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
                    console.log("eat");
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
                            let timer = new fCore.Timer(ƒ.Time.game, 10000, 1, this.eatFirstItem);
                            console.log(timer.active);
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
                            console.log(this.amountOfBombs);
                        case 4:
                            let timerTwo = new fCore.Timer(ƒ.Time.game, 10000, 1, this.eatFirstItem);
                            PacmanPlayerTwo.speedMaxPlayerTwo.x = 1;
                        case 5:
                        case 6:
                        case 7:
                            console.log("yeah, i got it");
                            for (let i = 1; i < 5; i++) {
                                /*let randomTranslateX: number = getRandomTranslateX();
                                let randomTranslateY: number = getRandomTranslateY();
                                if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || gameField[randomTranslateX][randomTranslateY] == 1)) {
                                  this.pacmanDouble = new PacmanPlayerOne("PacmanOne", randomTranslateX, randomTranslateY, gameField, this.game, this.data)
                                  this.game.appendChild(pacmans[i]);
                                }*/
                            }
                            break;
                        /*
                      case 3:
                        console.log("three");
                        break;
                      case 4:
                        console.log("four");
                        break;
                      case 5:
                        console.log("five");
                        break;
                      case 6:
                        console.log("six");
                        break;
                      case 7:
                        console.log("seven");
                        break;
                      case 8:
                        let canvas: HTMLCanvasElement = document.querySelector("canvas");
                        let img: HTMLImageElement = document.querySelector("img");
                        let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Pacman", img);
                        Pacman.generateSprites(spritesheet);
                        for (let i: number = 0; i < 5; i++) {
                          let randomTranslateX: number = Level.randomInteger(2, 27);
                          let randomTranslateY: number = Level.randomInteger(2, 19);
                          let hare: Pacman = new Pacman("Pacman", randomTranslateX, randomTranslateY);
                          game.appendChild(hare);
                        }
                        let _currentTranslation: fCore.Vector3 = item.mtxLocal.translation;
                        matrix[_currentTranslation.x][_currentTranslation.y] = 0;
                        let randomTranslateX: number = Level.randomInteger(1, 28);
                        let randomTranslateY: number = Level.randomInteger(1, 19);
                        matrix[randomTranslateX][randomTranslateY] = 1;
                        item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
                        this.period++;
                        console.log(game);
                        break;
                        break;*/
                    }
                }
            }
        }
        eatFirstItem() {
            console.log("something happened");
            PacmanPlayerTwo.speedMaxPlayerTwo.x = 3;
        }
    }
    PacmanPlayerTwo.speedMaxPlayerTwo = new ƒ.Vector3(3, 3, 3); // units per second
    Bomberpac.PacmanPlayerTwo = PacmanPlayerTwo;
    class PacmanPlayerOne extends Bomberpac.Man {
        constructor(_name, translateX, translateY, gamefield, game, data) {
            super(_name, translateX, translateY, gamefield, game, data);
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
                this.eatFood();
                this.eatItem();
            };
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        eatItem() {
            let pacmanTranslation = this.mtxLocal.translation;
            let node = this.game.getChildrenByName("Items")[0].getChildren();
            for (let item of node) {
                let rect = item.getID();
                if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
                    console.log("eat");
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
                            let timer = new fCore.Timer(ƒ.Time.game, 10000, 1, this.eatFirstItem);
                            console.log(timer.active);
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
                            let timerTwo = new fCore.Timer(ƒ.Time.game, 10000, 1, this.eatFirstItem);
                            PacmanPlayerOne.speedMaxPlayerOne.x = 1;
                        case 5:
                        case 6:
                        case 7:
                            break;
                        /*
                      case 8:
                        let canvas: HTMLCanvasElement = document.querySelector("canvas");
                        let img: HTMLImageElement = document.querySelector("img");
                        let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Pacman", img);
                        Pacman.generateSprites(spritesheet);
                        for (let i: number = 0; i < 5; i++) {
                          let randomTranslateX: number = Level.randomInteger(2, 27);
                          let randomTranslateY: number = Level.randomInteger(2, 19);
                          let hare: Pacman = new Pacman("Pacman", randomTranslateX, randomTranslateY);
                          game.appendChild(hare);
                        }
                        let _currentTranslation: fCore.Vector3 = item.mtxLocal.translation;
                        matrix[_currentTranslation.x][_currentTranslation.y] = 0;
                        let randomTranslateX: number = Level.randomInteger(1, 28);
                        let randomTranslateY: number = Level.randomInteger(1, 19);
                        matrix[randomTranslateX][randomTranslateY] = 1;
                        item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
                        this.period++;
                        console.log(game);
                        break;
                        break;*/
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
        eatFirstItem() {
            console.log("something happened");
            PacmanPlayerOne.speedMaxPlayerOne.x = 3;
        }
        //@Override
        processInput() {
            if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.LEFT);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.RIGHT);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.W]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.UP);
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.S]))
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.DOWN);
            else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SHIFT_LEFT]))
                this.act(Bomberpac.ACTION.EXPLODE);
            else
                this.act(Bomberpac.ACTION.IDLE);
        }
    }
    PacmanPlayerOne.speedMaxPlayerOne = new ƒ.Vector3(3, 3, 3); // units per second
    Bomberpac.PacmanPlayerOne = PacmanPlayerOne;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Pacman.js.map
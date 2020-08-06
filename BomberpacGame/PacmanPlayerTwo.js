"use strict";
var Bomberpac;
(function (Bomberpac) {
    class PacmanPlayerTwo extends Bomberpac.Man {
        constructor(_name, translateX, translateY, gamefield, game, data) {
            super(_name, translateX, translateY, gamefield, game, data);
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
            };
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        //@Override
        processInput() {
            if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                console.log("LEFT");
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.LEFT);
            }
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                console.log("LEFT");
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.RIGHT);
            }
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_UP])) {
                console.log("LEFT");
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.UP);
            }
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
                console.log("LEFT");
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.DOWN);
            }
            /*else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
              console.log("LEFT");
            this.act(ACTION.EXPLODE);*/
            else
                this.act(Bomberpac.ACTION.IDLE);
        }
    }
    Bomberpac.PacmanPlayerTwo = PacmanPlayerTwo;
    class PacmanPlayerOne extends Bomberpac.Man {
        constructor(_name, translateX, translateY, gamefield, game, data) {
            super(_name, translateX, translateY, gamefield, game, data);
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.processInput();
            };
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        //@Override
        processInput() {
            if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A])) {
                console.log("LEFT");
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.LEFT);
            }
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D])) {
                console.log("LEFT");
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.RIGHT);
            }
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.W])) {
                console.log("LEFT");
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.UP);
            }
            else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.S])) {
                console.log("LEFT");
                this.act(Bomberpac.ACTION.WALK, Bomberpac.DIRECTION.DOWN);
            }
            /*else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
              console.log("LEFT");
            this.act(ACTION.EXPLODE);*/
            else
                this.act(Bomberpac.ACTION.IDLE);
        }
    }
    Bomberpac.PacmanPlayerOne = PacmanPlayerOne;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=PacmanPlayerTwo.js.map
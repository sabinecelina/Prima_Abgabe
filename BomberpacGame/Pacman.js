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
                this.eatFood();
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
                this.eatFood();
            };
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
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
            /*else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
              console.log("LEFT");
            this.act(ACTION.EXPLODE);*/
            else
                this.act(Bomberpac.ACTION.IDLE);
        }
    }
    Bomberpac.PacmanPlayerOne = PacmanPlayerOne;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Pacman.js.map
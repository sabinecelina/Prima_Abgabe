"use strict";
var Bomberpac;
(function (Bomberpac) {
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["EXPLODE"] = "Explode";
    })(ACTION = Bomberpac.ACTION || (Bomberpac.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
        DIRECTION[DIRECTION["UP"] = 2] = "UP";
        DIRECTION[DIRECTION["DOWN"] = 3] = "DOWN";
    })(DIRECTION = Bomberpac.DIRECTION || (Bomberpac.DIRECTION = {}));
    class Collectible extends Bomberpac.GameobjectSprite {
        constructor(_name = "Collectible", translateX, translateY, matrix) {
            super(_name, matrix);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(translateX, translateY, 0))));
            this.show(ACTION.IDLE);
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Collectible.animations[_action]);
        }
    }
    Bomberpac.Collectible = Collectible;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Collectible.js.map
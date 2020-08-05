"use strict";
var Bomberpac;
(function (Bomberpac) {
    class Food extends Bomberpac.Collectible {
        constructor(_name = "Food", translateX, translateY, matrix) {
            super(_name, translateX, translateY, matrix);
            matrix[translateX][translateY] = 1;
            this.show(Bomberpac.ACTION.IDLE);
        }
        static generateSprites(_spritesheet) {
            Food.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 288, 33, 30), 1, ƒ.Vector2.ZERO(), 60, ƒ.ORIGIN2D.CENTER);
            Food.animations[Bomberpac.ACTION.IDLE] = sprite;
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Food.animations[_action]);
        }
    }
    Bomberpac.Food = Food;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Item.js.map
"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    class Food extends BomberpacGame.Sprite {
        constructor(_name = "Food", translateX, translateY, matrix) {
            super(_name, translateX, translateY, matrix);
            matrix[translateX][translateY] = 2;
            this.show(BomberpacGame.ACTION.IDLE);
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Food.animations[_action]);
        }
        static generateSprites(_spritesheet) {
            Food.animations = {};
            let sprite = new BomberpacGame.ƒAid.SpriteSheetAnimation(BomberpacGame.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(BomberpacGame.ƒ.Rectangle.GET(0, 288, 33, 30), 1, BomberpacGame.ƒ.Vector2.ZERO(), 60, BomberpacGame.ƒ.ORIGIN2D.CENTER);
            Food.animations[BomberpacGame.ACTION.IDLE] = sprite;
        }
    }
    BomberpacGame.Food = Food;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=Food.js.map
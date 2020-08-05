"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    class Bomb extends BomberpacGame.Sprite {
        constructor(_name = "Food", translateX, translateY, matrix) {
            super(_name, translateX, translateY, matrix);
            matrix[translateX][translateY] = 2;
            this.show(BomberpacGame.ACTION.IDLE);
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Bomb.animations[_action]);
        }
        static generateSprites(_spritesheet) {
            Bomb.animations = {};
            let sprite = new BomberpacGame.ƒAid.SpriteSheetAnimation(BomberpacGame.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(BomberpacGame.ƒ.Rectangle.GET(0, 221, 40, 40), 3, BomberpacGame.ƒ.Vector2.ZERO(), 30, BomberpacGame.ƒ.ORIGIN2D.CENTER);
            Bomb.animations[BomberpacGame.ACTION.IDLE] = sprite;
            for (let i = 0; i < 3; i++) {
                sprite.frames[i].timeScale = 5;
            }
        }
    }
    BomberpacGame.Bomb = Bomb;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=Bomb.js.map
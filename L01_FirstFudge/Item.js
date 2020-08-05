"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    class Item extends BomberpacGame.Sprite {
        constructor(_name, translateX, translateY, matrix, id) {
            super(_name, translateX, translateY, matrix);
            matrix[translateX][translateY] = 2;
            this.id = id;
            this.show(BomberpacGame.ACTION.IDLE);
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Item.animations[_action]);
        }
        static generateSprites(_spritesheet, translateX) {
            Item.animations = {};
            let sprite = new BomberpacGame.ƒAid.SpriteSheetAnimation(BomberpacGame.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(BomberpacGame.ƒ.Rectangle.GET(translateX, 257, 33, 30), 1, BomberpacGame.ƒ.Vector2.ZERO(), 60, BomberpacGame.ƒ.ORIGIN2D.CENTER);
            Item.animations[BomberpacGame.ACTION.IDLE] = sprite;
        }
        getID() {
            return this.id;
        }
    }
    BomberpacGame.Item = Item;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=Item.js.map
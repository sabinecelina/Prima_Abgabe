"use strict";
var Bomberpac;
(function (Bomberpac) {
    var ƒAid = FudgeAid;
    class Food extends Bomberpac.Sprite {
        constructor(_name = "Food", translateX, translateY, matrix) {
            super(_name, translateX, translateY, matrix);
            matrix[translateX][translateY] = 2;
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
    class Pill extends Bomberpac.Sprite {
        constructor(_name, translateX, translateY, matrix, id) {
            super(_name, translateX, translateY, matrix);
            matrix[translateX][translateY] = 2;
            this.id = id;
            this.show(Bomberpac.ACTION.IDLE);
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Pill.animations[_action]);
        }
        static generateSprites(_spritesheet, translateX) {
            Pill.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(translateX, 257, 33, 30), 1, ƒ.Vector2.ZERO(), 60, ƒ.ORIGIN2D.CENTER);
            Pill.animations[Bomberpac.ACTION.IDLE] = sprite;
        }
        getID() {
            return this.id;
        }
    }
    Bomberpac.Pill = Pill;
    class Bomb extends Bomberpac.Sprite {
        constructor(_name = "Bomb", translateX, translateY, matrix) {
            super(_name, translateX, translateY, matrix);
            this.range = 0.9;
            this.show(Bomberpac.ACTION.IDLE);
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Bomb.animations[_action]);
        }
        static generateSprites(_spritesheet) {
            Bomb.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(Bomberpac.ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(0, 217, 38, 40), 3, ƒ.Vector2.ZERO(), 37, ƒ.ORIGIN2D.CENTER);
            Bomb.animations[Bomberpac.ACTION.IDLE] = sprite;
            for (let i = 0; i < 3; i++) {
                sprite.frames[i].timeScale = 10;
            }
        }
    }
    Bomberpac.Bomb = Bomb;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Item.js.map
namespace Bomberpac {
  export class Food extends Collectible {
    constructor(_name: string = "Food", translateX: number, translateY: number, matrix: number[][]) {
      super(_name, translateX, translateY, matrix);
      matrix[translateX][translateY] = 1;
      this.show(ACTION.IDLE);
    }
    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Food.animations = {};
      let sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 288, 33, 30), 1, ƒ.Vector2.ZERO(), 60, ƒ.ORIGIN2D.CENTER);
      Food.animations[ACTION.IDLE] = sprite;
    }
    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Food.animations[_action]);
    }
  }
}
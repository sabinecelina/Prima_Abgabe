namespace BomberpacGame {
  import fCore = FudgeCore;

  export class Item extends Sprite {
    private id: number;
    constructor(_name: string, translateX: number, translateY: number, matrix: number[][], id: number) {
      super(_name, translateX, translateY, matrix);
      matrix[translateX][translateY] = 2;
      this.id = id;
      this.show(ACTION.IDLE);
    }
    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Item.animations[_action]);
    }
    public static generateSprites(_spritesheet: ƒ.CoatTextured, translateX: number): void {
      Item.animations = {};
      let sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(translateX, 257, 33, 30), 1, ƒ.Vector2.ZERO(), 60, ƒ.ORIGIN2D.CENTER);
      Item.animations[ACTION.IDLE] = sprite;
    }
    public getID(): number {
      return this.id;
    }
  }
}
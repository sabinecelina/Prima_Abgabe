namespace BomberpacGame {
  import fCore = FudgeCore;
  export class Bomb extends Sprite {
    constructor(_name: string = "Food", translateX: number, translateY: number, matrix: number[][]) {
      super(_name, translateX, translateY, matrix);
      matrix[translateX][translateY] = 2;
      this.show(ACTION.IDLE);
    }
    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Bomb.animations[_action]);
    }
    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Bomb.animations = {};
      let sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 221, 40, 40), 3, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.CENTER);
      Bomb.animations[ACTION.IDLE] = sprite;
      for (let i: number = 0; i < 3; i++) {
        sprite.frames[i].timeScale = 5;
      }
    }
  }
}
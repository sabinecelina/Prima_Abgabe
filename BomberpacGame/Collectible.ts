namespace Bomberpac {

  import fAid = FudgeAid;
  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk",
    EXPLODE = "Explode"
  }

  export enum DIRECTION {
    LEFT, RIGHT, UP, DOWN
  }
  export class Collectible extends GameobjectSprite {
    public static animations: fAid.SpriteSheetAnimations;
    constructor(_name: string = "Collectible", translateX: number, translateY: number, matrix: number[][]) {
      super(_name, matrix);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(translateX, translateY, 0))));
      this.show(ACTION.IDLE);
    }
    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Collectible.animations[_action]);
    }
  }
}
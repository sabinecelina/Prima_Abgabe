namespace Bomberpac {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class Man extends Sprite {
    protected speed: fCore.Vector3 = fCore.Vector3.ZERO();
    public static speedMax: ƒ.Vector3 = new ƒ.Vector3(3, 3, 3); // units per second
    public action: ACTION;
    private score: number = 0;
    private game: fCore.Node;
    private nextLevel: number;
    private data: ToggleData;
    private amountOfBombs: number;
    private gameField: number[][];
    private static color: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("DEEPPINK")));

    constructor(_name: string, translateX: number, translateY: number, gameField: number[][], game: fCore.Node, data: ToggleData) {
      super(_name, translateX, translateY, gameField);
      this.game = game;
      this.data = data;
      this.fetchData();
    }
    private fetchData() {
      this.amountOfBombs = Number(this.data.amountOfBombs);
    }
    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Man.animations = {};
      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      Man.animations[ACTION.WALK] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      Man.animations[ACTION.IDLE] = sprite;
      sprite.frames[2].timeScale = 10;
    }
    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Pacman.animations[_action]);
    }
    public act(_action: ACTION, _direction?: DIRECTION): void {      let cmpTr: fCore.Vector3 = new fCore.Vector3();
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          if (_direction == 0 || _direction == 1) {
            let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
            this.speed.x = PacmanPlayerTwo.speedMax.x; // * direction;
            cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
          }
          else if (_direction == 2 || _direction == 3) {
            let direction: number = (_direction == DIRECTION.UP ? 1 : -1);
            this.speed.x = PacmanPlayerTwo.speedMax.x;
            cmpTr = ƒ.Vector3.Z(90 * direction);
          }
          /*if (this.collide()) {
            this.speed.x = -1;
            cmpTr = oldDirection;
          }*/
          this.cmpTransform.local.rotation = cmpTr;
          break;
      }
      if (_action == this.action)
        return;
      this.action = _action;
      this.show(_action);
    }
  }
}
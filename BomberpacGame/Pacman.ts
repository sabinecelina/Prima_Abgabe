namespace Bomberpac {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class Pacman extends Sprite {
    private nav: HTMLElement;
    private speed: fCore.Vector3 = fCore.Vector3.ZERO();
    private speedMax: ƒ.Vector3 = new ƒ.Vector3(3, 3, 3); // units per second
    public action: ACTION;
    private score: number = 0;
    private game: fCore.Node;
    private nextLevel: number;
    private gameField: number[][];
    constructor(_name: string = "Pacman", translateX: number, translateY: number, gameField: number[][], game: fCore.Node) {
      super(_name, translateX, translateY, gameField);
      this.nav = document.getElementById("scorePlayerOne");
      this.game = game;
      this.gameField = gameField;
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }
    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Pacman.animations = {};
      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      Pacman.animations[ACTION.WALK] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      Pacman.animations[ACTION.IDLE] = sprite;
      sprite.frames[2].timeScale = 10;
    }
    private processInput(): void {
      if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
        this.act(ACTION.WALK, DIRECTION.LEFT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
        this.act(ACTION.WALK, DIRECTION.RIGHT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_UP]))
        this.act(ACTION.WALK, DIRECTION.UP);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_DOWN]))
        this.act(ACTION.WALK, DIRECTION.DOWN);
      else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
        this.act(ACTION.EXPLODE);
      else
        this.act(ACTION.IDLE);
    }
    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Pacman.animations[_action]);
    }
    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      this.processInput();
      this.eatFood();
    }
    public act(_action: ACTION, _direction?: DIRECTION): void {
      let oldDirection: fCore.Vector3 = this.cmpTransform.local.rotation;
      let cmpTr: fCore.Vector3 = new fCore.Vector3();
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          this.speed.y = 0;
          break;
        case ACTION.WALK:
          if (_direction == 0 || _direction == 1) {
            let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
            this.speed.x = this.speedMax.x; // * direction;
            cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
          }
          else if (_direction == 2 || _direction == 3) {
            let direction: number = (_direction == DIRECTION.UP ? 1 : -1);
            this.speed.x = this.speedMax.x;
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
    private eatFood(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Food")[0].getChildren(); for (let food of node) {
        if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = food.mtxLocal.translation;
          this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = getRandomTranslateX();
          let randomTranslateY: number = getRandomTranslateY();
          this.gameField[randomTranslateX][randomTranslateY] = 1;
          food.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
          this.nav.innerText = "Score: " + this.score;
          this.score++;
          Sound.play("pacman_eat");
        }
      }
    }
  }
}
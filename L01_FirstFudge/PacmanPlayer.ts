namespace BomberpacGame {
  import ƒ = FudgeCore;
  import fCore = FudgeCore;
  import ƒAid = FudgeAid;

  export class PacmanPlayer extends Sprite {
    private static speedMax: ƒ.Vector3 = new ƒ.Vector3(4, 4, 4); // units per second
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    constructor(_name: string = "PacmanPlayer") {
      super(_name, 28, 1, matrix);
      this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * -1);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }
    private collide(): boolean {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = game.getChildrenByName("Obstacles")[0].getChildren(); let check: boolean = false;
      for (let obstacle of node) {
        if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.9)) {
          console.log("attached");
          check = true;
        }
      }
      return check;
    }
    /*private checkCollision(): boolean {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = game.getChildrenByName("Node")[0].getChildrenByName("food");
      for (let food of node) {
        if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.9)) {
          console.log("attached");
        }
      }
      let cmpTransform: fCore.Vector3 = this.cmpTransform.local.translation;
      let x: number = cmpTransform.x / scale;
      let y: number = cmpTransform.y / scale;
      //console.log(x + ", " + y);^
      let yMinus: number = Math.floor(y);
      let yPlus: number = Math.ceil(y);
      let xMinus: number = Math.floor(x);
      let xPlus: number = Math.ceil(x);
      let isCollided: boolean = false;
      if (matrix[xMinus][yPlus] == 1) {
        isCollided = true;
      }
      if (matrix[xMinus][yMinus] == 1) {
        isCollided = true;
      }
      if (matrix[xPlus][yPlus] == 1) {
        isCollided = true;
      }
      if (matrix[xPlus][yMinus] == 1) {
        isCollided = true;
      }
      return isCollided;
    }
    */
    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      PacmanPlayer.animations = {};
      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      PacmanPlayer.animations[ACTION.WALK] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      PacmanPlayer.animations[ACTION.IDLE] = sprite;
      sprite.frames[2].timeScale = 10;
    }

    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>PacmanPlayer.animations[_action]);
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
            this.speed.x = PacmanPlayer.speedMax.x; // * direction;
            cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
          }
          else if (_direction == 2 || _direction == 3) {
            let direction: number = (_direction == DIRECTION.UP ? 1 : -1);
            this.speed.x = PacmanPlayer.speedMax.x;
            cmpTr = ƒ.Vector3.Z(90 * direction);
          }
          if (this.collide()) {
            this.speed.x = -1;
            cmpTr = oldDirection;
          }
          this.cmpTransform.local.rotation = cmpTr;
          break;
      }
      if (_action == this.action)
        return;
      this.action = _action;
      this.show(_action);
    }
    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      this.processInput();
      this.eatFood();
      this.collide();
    }
    private processInput(): void {
      if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A]))
        this.act(ACTION.WALK, DIRECTION.LEFT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D]))
        this.act(ACTION.WALK, DIRECTION.RIGHT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.W]))
        this.act(ACTION.WALK, DIRECTION.UP);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.S]))
        this.act(ACTION.WALK, DIRECTION.DOWN);
      else
        this.act(ACTION.IDLE);
    }
    private eatFood(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = game.getChildrenByName("Food")[0].getChildrenByName("food");
      for (let food of node) {
        if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = food.mtxLocal.translation;
          matrix[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = Level.randomInteger(1, 28);
          let randomTranslateY: number = Level.randomInteger(1, 19);
          matrix[randomTranslateX][randomTranslateY] = 1;
          food.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
        }
      }
    }
  }
}
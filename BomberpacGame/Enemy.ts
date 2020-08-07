namespace Bomberpac {
  import ƒ = FudgeCore;
  import fCore = FudgeCore;
  import ƒAid = FudgeAid;

  export class Enemy extends Sprite {
    private speedMaxEnemy: ƒ.Vector3 = new ƒ.Vector3(4, 4, 4); // units per second
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    private _enemyDirection: DIRECTION;
    private gameField: number[][]
    private game: fCore.Node;
    private number: number = 0;
    constructor(_name: string = "Enemy", gamfield: number[][], game: fCore.Node) {
      super(_name, 1, 2, gamfield);
      this.game = game;
      this.gameField = gamfield; this.act(ACTION.IDLE);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }
    private collide(): boolean {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Obstacles")[0].getChildren();
      let check: boolean = false;
      for (let obstacle of node) {
        if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.95)) {
          check = true;
        }
      }
      return check;
    }
    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Enemy.animations = {};
      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 64, 32, 30), 2, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      Enemy.animations[ACTION.WALK] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 64, 32, 30), 2, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      Enemy.animations[ACTION.IDLE] = sprite;
      sprite.frames[1].timeScale = 1;
    }

    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Enemy.animations[_action]);
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
            if (_direction == DIRECTION.RIGHT) {
              this._enemyDirection = DIRECTION.RIGHT;
            } else {
              this._enemyDirection = DIRECTION.LEFT;
            }
            this.speed.x = this.speedMaxEnemy.x; // * direction;
            cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
          }
          else if (_direction == 2 || _direction == 3) {
            let direction: number = (_direction == DIRECTION.UP ? 1 : -1);
            if (_direction == DIRECTION.UP) {
              this._enemyDirection = DIRECTION.UP;
            } else {
              this._enemyDirection = DIRECTION.DOWN;
            }
            this.speed.x = this.speedMaxEnemy.x;
            cmpTr = ƒ.Vector3.Z(90 * direction);
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
      this.killPacman();
    }
    private processInput(): void {
      if (this.collide()) {
        this.number = 1;
        let randomNumber: number = randomInteger(0, 4);
        this.speed.x = -this.speedMaxEnemy.x;
        let randomTranslateX: number;
        let randomTranslateY: number;
        if (this.mtxLocal.translation.x < 5) {
          randomTranslateX = randomInteger(1, this.mtxLocal.translation.x - 5);
          randomTranslateY = randomInteger(1, this.mtxLocal.translation.y - 5);
        }
        randomTranslateX = randomInteger(this.mtxLocal.translation.x - 2, this.mtxLocal.translation.x + 2);
        randomTranslateY = randomInteger(this.mtxLocal.translation.y - 2, this.mtxLocal.translation.y + 2);
        this.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY);
        if (this._enemyDirection == randomNumber) {
        } else if (this._enemyDirection == DIRECTION.LEFT || this._enemyDirection == DIRECTION.RIGHT) {
          randomNumber = randomInteger(2, 4);
          this.act(ACTION.WALK, randomNumber);
        } else if (this._enemyDirection == DIRECTION.UP || this._enemyDirection == DIRECTION.DOWN) {
          randomNumber = randomInteger(0, 2);
          this.act(ACTION.WALK, randomNumber);
        }
      }
    }
    public killPacman(): boolean {
      let check: boolean = false;
      let pacmanOne: fCore.Node = this.game.getChildrenByName("PacmanOne")[0];
      let pacman: PacmanPlayerOne = (<PacmanPlayerOne>pacmanOne);
      let mtxTranslationOne = pacmanOne.mtxLocal.translation;
      let pacmanTwo: fCore.Node = this.game.getChildrenByName("PacmanTwo")[0];
      let mtxTRanslationTwo: fCore.Vector3 = this.game.getChildrenByName("PacmanOne")[0].mtxLocal.translation;
      if (this.mtxLocal.translation.isInsideSphere(mtxTranslationOne, 0.9)) {
        pacman.lives--;
        check = true;
      }
      else if (this.mtxLocal.translation.isInsideSphere(mtxTRanslationTwo, 0.9)) {
        (<PacmanPlayerOne>pacmanTwo).lives--;
        check = false;
      }
      return check;
    }
    private eatFood(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Food")[0].getChildrenByName("food");
      let nodeTwo: fCore.Node = this.game.getChildrenByName("Food")[0];
      for (let food of node) {
        if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = food.mtxLocal.translation;
          this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
          nodeTwo.removeChild(food);
        }
      }
    }
  }
}
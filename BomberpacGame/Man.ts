namespace Bomberpac {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class Man extends Sprite {
    protected speed: fCore.Vector3 = fCore.Vector3.ZERO();
    public action: ACTION;
    public lives: number;
    public game: fCore.Node;
    public data: ToggleData;
    public amountOfBombs: number;
    public gameField: number[][];

    constructor(_name: string, translateX: number, translateY: number, gameField: number[][], game: fCore.Node, data: ToggleData) {
      super(_name, translateX, translateY, gameField);
      this.game = game;
      this.gameField = gameField;
      this.data = data;
      this.fetchData();
    }
    /*
    //tried collision checker with matrix so I dont need to check every single floor
    private checkCollision(): boolean {
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
    }*/
    public collide(): boolean {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Floor")[0].getChildrenByName("Obstacles")[0].getChildren();
      let check: boolean = false;
      for (let obstacle of node) {
        if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.9)) {
          check = true;
        }
      }
      return check;
    }
    private fetchData() {
      this.amountOfBombs = Number(this.data.amountOfBombs);
      this.lives = Number(this.data.lives);
    }
    //console.log(this.speed.x);
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
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Man.animations[_action]);
    }
    public eatFood(): boolean {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Floor")[0].getChildrenByName("Food")[0].getChildren();
      for (let food of node) {
        if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = food.mtxLocal.translation;
          this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = getRandomTranslateX();
          let randomTranslateY: number = getRandomTranslateY();
          this.gameField[randomTranslateX][randomTranslateY] = 1;
          food.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
          Sound.play("pacman_eat");
          return true;
        }
      }
      return false;
    }
  }
}

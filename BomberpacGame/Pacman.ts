namespace Bomberpac {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class Pacman extends Sprite {
    private nav: HTMLElement;
    private navPlayerTwo: HTMLElement;
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
      this.navPlayerTwo = document.getElementById("scorePlayerTwo");
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

    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Pacman.animations[_action]);
    }
    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      this.eatFood();
      this.collide();
      this.eatItem();
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
    private collide(): boolean {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Obstacles")[0].getChildren();
      let check: boolean = false;
      for (let obstacle of node) {
        if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.8)) {
          check = true;
          this.speedMax.x = 7;
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
    private eatFood(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Food")[0].getChildren(); for (let food of node) {
        if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = food.mtxLocal.translation;
          this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = getRandomTranslateX();
          let randomTranslateY: number = getRandomTranslateY();
          this.gameField[randomTranslateX][randomTranslateY] = 1;
          food.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0); this.score++;
          console.log(this.score);
          Sound.play("pacman_eat");
        }
      }
    }
    private eatItem(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Items")[0].getChildren();
      for (let item of node) {
        let rect: number = (<Pill>item).getID();
        if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
          console.log("eat");
          switch (rect) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
              let thisScore: number = this.score;
              console.log(thisScore);
              for (let i: number = 0; i < 10; i++) {
                console.log(i);
                fCore.ga
              }
            //if (this.score == 10) {
            //}
            /*case 2:
              console.log("two");
              break;
            case 3:
              console.log("three");
              break;
            case 4:
              console.log("four");
              break;
            case 5:
              console.log("five");
              break;
            case 6:
              console.log("six");
              break;
            case 7:
              console.log("seven");
              break;
            case 8:
              let canvas: HTMLCanvasElement = document.querySelector("canvas");
              let img: HTMLImageElement = document.querySelector("img");
              let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Pacman", img);
              Pacman.generateSprites(spritesheet);
              for (let i: number = 0; i < 5; i++) {
                let randomTranslateX: number = Level.randomInteger(2, 27);
                let randomTranslateY: number = Level.randomInteger(2, 19);
                let hare: Pacman = new Pacman("Pacman", randomTranslateX, randomTranslateY);
                game.appendChild(hare);
              }
              let _currentTranslation: fCore.Vector3 = item.mtxLocal.translation;
              matrix[_currentTranslation.x][_currentTranslation.y] = 0;
              let randomTranslateX: number = Level.randomInteger(1, 28);
              let randomTranslateY: number = Level.randomInteger(1, 19);
              matrix[randomTranslateX][randomTranslateY] = 1;
              item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
              this.period++;
              console.log(game);
              break;
              break;*/
          }
        }
      }
    }
  }
}
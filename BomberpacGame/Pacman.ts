namespace Bomberpac {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class PacmanPlayerTwo extends Man {
    private static speedMaxPlayerTwo: ƒ.Vector3 = new ƒ.Vector3(3, 3, 3); // units per second
    protected translation: fCore.Vector3 = fCore.Vector3.ZERO();
    constructor(_name: string, translateX: number, translateY: number, gamefield: number[][], game: fCore.Node, data: ToggleData) {
      super(_name, translateX, translateY, gamefield, game, data);
      this.game = game;
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }
    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      this.processInput();
      this.eatFood();
      this.eatItem();
      this.isKilled();
      if (this.checkScore()) {
        this.levelUp();
      }
    }
    public levelUp(): void {
      PacmanPlayerTwo.speedMaxPlayerTwo.x += 0.5;
    }
    public checkScore(): boolean {
      if (this.score % 5 == 0 || this.score != 0)
        return true;
      return false;
    }
    public isKilled(): void {
      let enemies: fCore.Node[] = this.game.getChildrenByName("Enemies")[0].getChildren();
      let rect: Enemy;
      let checkHit: boolean;
      for (let enemy of enemies) {
        rect = (<Enemy>enemy);
        checkHit = rect.killPacman();
        if (checkHit) {
          this.lives--;
          console.log("got killed");
          //ƒ.Time.game.setTimer(5000, 1, this.setTranslationReset);
        }
      }
    }
    /*private setTranslationReset(): void {
      console.log("something happened");
      this.translation.x = 5;
      this.translation.y = 5;
    }*/
    public processInput(): void {
      if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
        this.act(ACTION.WALK, DIRECTION.LEFT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
        this.act(ACTION.WALK, DIRECTION.RIGHT)
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_UP]))
        this.act(ACTION.WALK, DIRECTION.UP);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_DOWN]))
        this.act(ACTION.WALK, DIRECTION.DOWN);
      else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SHIFT_LEFT]))
        this.act(ACTION.EXPLODE);
      else
        this.act(ACTION.IDLE);
    }
    public act(_action: ACTION, _direction?: DIRECTION): void {
      let oldDirection: fCore.Vector3 = this.cmpTransform.local.rotation;
      let cmpRotation: fCore.Vector3 = new fCore.Vector3();
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          if (_direction == 0 || _direction == 1) {
            let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
            this.speed.x = PacmanPlayerTwo.speedMaxPlayerTwo.x; // * direction;
            this.translation = this.mtxLocal.translation;
            cmpRotation = ƒ.Vector3.Y(90 - 90 * direction);
          }
          else if (_direction == 2 || _direction == 3) {
            let direction: number = (_direction == DIRECTION.UP ? 1 : -1);
            this.speed.x = PacmanPlayerTwo.speedMaxPlayerTwo.x;
            this.translation = this.mtxLocal.translation;
            cmpRotation = ƒ.Vector3.Z(90 * direction);
          }
          if (this.collide()) {
            this.speed.x = -1;
            cmpRotation = oldDirection;
          }
          this.cmpTransform.local.rotation = cmpRotation;
          break;
        case ACTION.EXPLODE:
          this.createBomb();
          let node: fCore.Node = this.game.getChildrenByName("bomb")[0];
          let nodeTwo: fCore.Node = this.game.getChildrenByName("Bomb")[0];
          console.log(node);
          this.game.removeChild(nodeTwo);
          break;
      }
      if (_action == this.action)
        return;
      this.action = _action;
      this.show(_action);
    }
    public eatItem(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Items")[0].getChildren();
      for (let item of node) {
        let rect: number = (<Pill>item).getID();
        if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = item.mtxLocal.translation;
          this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = getRandomTranslateX();
          let randomTranslateY: number = getRandomTranslateY();
          this.gameField[randomTranslateX][randomTranslateY] = 1;
          item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
          this.score++;
          Sound.play("pacman_eatfruit");
          switch (rect) {
            case 1:
              ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
              PacmanPlayerTwo.speedMaxPlayerTwo.x = 10;
              break;
            case 2:
              let randomTranslateX: number = getRandomTranslateX();
              let randomTranslateY: number = getRandomTranslateY()
              if (!(this.gameField[randomTranslateX][randomTranslateY] == 1))
                this.mtxLocal.translation = new fCore.Vector3(getRandomTranslateX(), getRandomTranslateY(), 0);
              break;
            case 3:
              this.amountOfBombs++;
            case 4:
              ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
              PacmanPlayerTwo.speedMaxPlayerTwo.x = 1;
            case 5:
            case 6:
            case 7:
              for (let i: number = 1; i < 5; i++) {
                /*let randomTranslateX: number = getRandomTranslateX();
                let randomTranslateY: number = getRandomTranslateY();
                if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || gameField[randomTranslateX][randomTranslateY] == 1)) {
                  this.pacmanDouble = new PacmanPlayerOne("PacmanOne", randomTranslateX, randomTranslateY, gameField, this.game, this.data)
                  this.game.appendChild(pacmans[i]);
                }*/
              }
              break;
            /*
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
    private handleEventItem(): void {
      console.log("something happened");
    }
  }
  export class PacmanPlayerOne extends Man {
    private static speedMaxPlayerOne: ƒ.Vector3 = new ƒ.Vector3(3, 3, 3); // units per second
    public static translation: fCore.Vector3 = new fCore.Vector3(2, 1, 0);
    constructor(_name: string, translateX: number, translateY: number, gamefield: number[][], game: fCore.Node, data: ToggleData) {
      super(_name, translateX, translateY, gamefield, game, data);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }
    public update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      this.processInput();
      this.eatFood();
      this.eatItem();
    }
    public eatItem(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Items")[0].getChildren();
      for (let item of node) {
        let rect: number = (<Pill>item).getID();
        if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = item.mtxLocal.translation;
          this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = getRandomTranslateX();
          let randomTranslateY: number = getRandomTranslateY();
          this.gameField[randomTranslateX][randomTranslateY] = 1;
          item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
          this.score++;
          Sound.play("pacman_eatfruit");
          switch (rect) {
            case 1:
              ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
              PacmanPlayerOne.speedMaxPlayerOne.x = 10;
              break;
            case 2:
              let randomTranslateX: number = getRandomTranslateX();
              let randomTranslateY: number = getRandomTranslateY()
              if (!(this.gameField[randomTranslateX][randomTranslateY] == 1))
                this.mtxLocal.translation = new fCore.Vector3(getRandomTranslateX(), getRandomTranslateY(), 0);
              break;
            case 3:
              this.amountOfBombs++;
              console.log(this.amountOfBombs);
            case 4:
              ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
              PacmanPlayerOne.speedMaxPlayerOne.x = 0.5;
            case 5:
            case 6:
            case 7:
              break;
            /*
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
    public act(_action: ACTION, _direction?: DIRECTION): void {
      let oldDirection: fCore.Vector3 = this.cmpTransform.local.rotation;
      let cmpTr: fCore.Vector3 = new fCore.Vector3();
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          if (_direction == 0 || _direction == 1) {
            let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
            this.speed.x = PacmanPlayerOne.speedMaxPlayerOne.x; // * direction;
            cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
          }
          else if (_direction == 2 || _direction == 3) {
            let direction: number = (_direction == DIRECTION.UP ? 1 : -1);
            this.speed.x = PacmanPlayerOne.speedMaxPlayerOne.x;
            cmpTr = ƒ.Vector3.Z(90 * direction);
          }
          if (this.collide()) {
            this.speed.x = -1;
            cmpTr = oldDirection;
          }
          this.cmpTransform.local.rotation = cmpTr;
          break;
        case ACTION.EXPLODE:
          this.createBomb();
          break;
      }
      if (_action == this.action)
        return;
      this.action = _action;
      this.show(_action);
    }
    private handleEventItem(): void {
      console.log("something happened");
      PacmanPlayerOne.speedMaxPlayerOne.x = 3;
    }
    //@Override
    public processInput(): void {
      if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A]))
        this.act(ACTION.WALK, DIRECTION.LEFT);

      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D]))
        this.act(ACTION.WALK, DIRECTION.RIGHT);

      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.W]))
        this.act(ACTION.WALK, DIRECTION.UP);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.S]))
        this.act(ACTION.WALK, DIRECTION.DOWN);
      else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
        this.act(ACTION.EXPLODE);
      else
        this.act(ACTION.IDLE);
    }
  }
}
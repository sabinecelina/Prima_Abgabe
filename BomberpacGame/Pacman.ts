namespace Bomberpac {
  import fCore = FudgeCore;

  export class PacmanPlayerTwo extends Man {
    private won: boolean = false;
    private img: HTMLImageElement = document.querySelector("img");
    private spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Pacman", this.img);
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
      if (this.won) {
        Sound.play("pacman_win");
        gameWinningScreen(2);
      }
      this.collide();
    }
    public processInput(): void {
      if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.A]))
        this.act(ACTION.WALK, DIRECTION.LEFT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.D]))
        this.act(ACTION.WALK, DIRECTION.RIGHT)
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.W]))
        this.act(ACTION.WALK, DIRECTION.UP);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.S]))
        this.act(ACTION.WALK, DIRECTION.DOWN);
      else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SHIFT_LEFT])) {
        this.act(ACTION.EXPLODE);
      }
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
          break;
      }
      if (_action == this.action)
        return;
      this.action = _action;
      this.show(_action);
    }
    public eatItem(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Floor")[0].getChildrenByName("Items")[0].getChildren();
      for (let item of node) {
        let rect: number = (<Pill>item).getID();
        if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = item.mtxLocal.translation;
          this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = getRandomTranslateX();
          let randomTranslateY: number = getRandomTranslateY();
          this.gameField[randomTranslateX][randomTranslateY] = 1;
          item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
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
              break;
            case 4:
              ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
              PacmanPlayerTwo.speedMaxPlayerTwo.x = 0.5;
              break;
            case 5:
              console.log("case 5");
              for (let i: number = 0; i < 10; i++) {
                let obstacle: fCore.Node = this.game.getChildrenByName("Floor")[0].getChildrenByName("Items")[0];
                let randomTranslateX = getRandomTranslateX();
                let randomTranslateY = getRandomTranslateX();
                if (!((randomTranslateX == 28 && randomTranslateY == 19) || (randomTranslateX == 10 && randomTranslateY == 10) || (randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 28 && randomTranslateY == 1)
                  || (randomTranslateX == 2 && randomTranslateY == 1 || (randomTranslateX == 3 && randomTranslateY == 1)))) {
                  let obstacles = new Obstacle("obstacles", gameField, randomTranslateX, randomTranslateY, Floor.scale, Floor.mesh, Floor.color);
                  obstacle.appendChild(obstacles);
                }
              }
              break;
            case 6:
              ƒ.Time.game.setTimer(5000, 1, this.handleEventItem);
              PacmanPlayerTwo.speedMaxPlayerTwo.x = 0;
              break;
            case 7:
              this.won = true;
              break;
          }
        }
      }
    }
    private handleEventItem(): void {
      console.log("something happened");
      PacmanPlayerTwo.speedMaxPlayerTwo.x = 3;
    }
    public createBomb(): void {
      let node: fCore.Node[] = game.getChildrenByName("bomb");
      let bomb: Bomb;
      if (node.length < 1) {
        Bomb.generateSprites(this.spritesheet);
        let manTranslation: fCore.Vector3 = this.mtxLocal.translation;
        bomb = new Bomb("bomb", manTranslation.x, manTranslation.y, this.gameField);
        this.game.appendChild(bomb);
        if (bomb.mtxLocal.translation.isInsideSphere(pacman.mtxLocal.translation, bomb.range)) {
          pacman.mtxLocal.translation = new fCore.Vector3(12, 12, 0);
          pacman.lives--;
        }
      }
      let enemies: fCore.Node[] = this.game.getChildrenByName("Enemies")[0].getChildren();
      for (let enemy of enemies) {
        if (enemy.mtxLocal.translation.isInsideSphere(bomb.mtxLocal.translation, bomb.range)) {
          this.game.removeChild(enemy);
          //ƒ.Time.game.setTimer(5000, 1, this.setTranslationReset);
        }
      }
      node = this.game.getChildrenByName("bomb");
      for (let bomb of node) {
        this.game.removeChild(bomb);
      }
    }
  }




  export class PacmanPlayerOne extends Man {
    public won: boolean = false;
    private static speedMaxPlayerOne: ƒ.Vector3 = new ƒ.Vector3(3, 3, 3); // units per second
    private img: HTMLImageElement = document.querySelector("img");
    private spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Bomb", this.img);
    constructor(_name: string, translateX: number, translateY: number, gamefield: number[][], game: fCore.Node, data: ToggleData) {
      super(_name, translateX, translateY, gamefield, game, data);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }
    public update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      this.processInput();
      if (this.eatFood()) {
        PacmanPlayerOne.speedMaxPlayerOne.x += 10;
      }
      this.eatItem();
      if (this.won) {
        Sound.play("pacman_win");
        gameWinningScreen(1);
      }
    }
    public eatItem(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = this.game.getChildrenByName("Floor")[0].getChildrenByName("Items")[0].getChildren();
      for (let item of node) {
        let id: number = (<Pill>item).getID();
        if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = item.mtxLocal.translation;
          this.gameField[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = getRandomTranslateX();
          let randomTranslateY: number = getRandomTranslateY();
          this.gameField[randomTranslateX][randomTranslateY] = 1;
          item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
          Sound.play("pacman_eatfruit");
          switch (id) {
            case 1:
              ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
              PacmanPlayerOne.speedMaxPlayerOne.x = 7;
              break;
            case 2:
              let randomTranslateX: number = getRandomTranslateX();
              let randomTranslateY: number = getRandomTranslateY()
              if (!(this.gameField[randomTranslateX][randomTranslateY] == 1))
                this.mtxLocal.translation = new fCore.Vector3(getRandomTranslateX(), getRandomTranslateY(), 0);
              break;
            case 3:
              this.amountOfBombs++;
              break;
            case 4:
              ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
              PacmanPlayerOne.speedMaxPlayerOne.x = 0.5;
              break;
            case 5:
              for (let i: number = 0; i < 10; i++) {
                let obstacle: fCore.Node = this.game.getChildrenByName("Floor")[0].getChildrenByName("Items")[0];
                randomTranslateX = getRandomTranslateX();
                randomTranslateY = getRandomTranslateX();
                if (!((randomTranslateX == 28 && randomTranslateY == 19) || (randomTranslateX == 10 && randomTranslateY == 10) || (randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 28 && randomTranslateY == 1)
                  || (randomTranslateX == 2 && randomTranslateY == 1 || (randomTranslateX == 3 && randomTranslateY == 1)))) {
                  let obstacles = new Obstacle("obstacles", gameField, randomTranslateX, randomTranslateY, Floor.scale, Floor.mesh, Floor.color);
                  obstacle.appendChild(obstacles);
                }
              }
              break;
            case 6:
              ƒ.Time.game.setTimer(10000, 1, this.handleEventItem);
              PacmanPlayerOne.speedMaxPlayerOne.x = 0;
              break;
            case 7:
              this.won = true;
              break;
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
    public createBomb(): void {
      let bomb: Bomb;
      Bomb.generateSprites(this.spritesheet);
      let manTranslation: fCore.Vector3 = this.mtxLocal.translation;
      bomb = new Bomb("bomb", manTranslation.x, manTranslation.y, this.gameField);
      this.game.appendChild(bomb);
      if (bomb.mtxLocal.translation.isInsideSphere(pacmanTwo.mtxLocal.translation, bomb.range)) {
        pacmanTwo.mtxLocal.translation = new fCore.Vector3(12, 12, 0);
      }
      let enemies: fCore.Node[] = this.game.getChildrenByName("Enemies")[0].getChildren();
      for (let enemy of enemies) {
        if (enemy.mtxLocal.translation.isInsideSphere(bomb.mtxLocal.translation, bomb.range)) {
          this.game.removeChild(enemy);
        }
      }
      let node: fCore.Node[] = this.game.getChildrenByName("bomb");
      console.log(node);
      for (let bomb of node) {
        this.game.removeChild(bomb);
      }
    }
  }
}
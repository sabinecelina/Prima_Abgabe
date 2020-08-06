namespace Bomberpac {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class PacmanPlayerTwo extends Man {
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
    }
    public processInput(): void {
      if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
        this.act(ACTION.WALK, DIRECTION.LEFT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
        this.act(ACTION.WALK, DIRECTION.RIGHT)
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_UP]))
        this.act(ACTION.WALK, DIRECTION.UP);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_DOWN]))
        this.act(ACTION.WALK, DIRECTION.DOWN);
      /*else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
        console.log("LEFT");
      this.act(ACTION.EXPLODE);*/
      else
        this.act(ACTION.IDLE);
    }
  }
  export class PacmanPlayerOne extends Man {
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

      /*else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
        console.log("LEFT");
      this.act(ACTION.EXPLODE);*/
      else
        this.act(ACTION.IDLE);
    }
  }
}
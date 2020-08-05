namespace Bomberpac {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class Gameobject extends fCore.Node {
    private _gameField: number[][];
    constructor(_name: string, _matrix: number[][]) {
      super(_name);
    }
  }
  export class GameobjectSprite extends fAid.NodeSprite {
    private _gameField: number[][];
    constructor(_name: string, _matrix: number[][]) {
      super(_name);
      this._gameField = _matrix;
    }
  }
}
namespace Bomberpac {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class Gameobject extends fCore.Node {
    private _gameField: number[][];
    constructor(_name: string, _matrix: number[][]) {
      super(_name);
      this._gameField = _matrix;
    }
    public setGameField(x: number, y: number, id: number): void {
      this._gameField[x][y] = id;
    }
    public checkGameField(x: number, y: number, id: number): number {
      return this._gameField[x][y] = id;
    }
  }
  export class GameobjectSprite extends fAid.NodeSprite {
    private _gameField: number[][];
    constructor(_name: string, _matrix: number[][]) {
      super(_name);
      this._gameField = _matrix;
    }
    public setGameField(x: number, y: number, id: number): void {
      this._gameField[x][y] = id;
    }
    public checkGameField(x: number, y: number, id: number): number {
      return this._gameField[x][y] = id;
    }
  }
}
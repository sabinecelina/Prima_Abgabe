namespace BomberpacGame {
  import fCore = FudgeCore;
  import fAid = FudgeAid;

  export class Gameobject extends fCore.Node {
    private _gameField: number[][];
    constructor(_name: string, _matrix: number[][]) {
      super(_name);
      this._gameField = _matrix;
    }
  }
  export class GameobjectSprite extends fAid.NodeSprite {
    private _gameField: number[][];
    constructor(_name: string, _matrix: number[][]) {
      super(_name);
      this._gameField = _matrix;
    }
  }
  export class Obstacles extends Gameobject {
    private scale: number;
    constructor(_name: string, matrix: number[][], x: number, y: number, scale: number, mesh: fCore.MeshCube, color: fCore.Material) {
      super(_name, matrix);
      this.scale = scale;
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(new ƒ.Vector3(scale, scale, 0));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(color);
      this.addComponent(cmpMaterial);
      matrix[x][y] = 1;
      this.calculateTranslation(x, y);
    }
    public calculateTranslation(x: number, y: number): void {
      let cmpTransform = new fCore.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(x * this.scale, y * this.scale, 0)));
      this.addComponent(cmpTransform);
    }
  }
}
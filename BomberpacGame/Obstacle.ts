namespace Bomberpac {
  export class Obstacle extends Gameobject {
    private scale: number;
    constructor(_name: string, gameField: number[][], x: number, y: number, scale: number, mesh: fCore.MeshCube, color: fCore.Material) {
      super(_name, gameField);
      this.scale = scale;
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(new ƒ.Vector3(scale, scale, 0));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(color);
      this.addComponent(cmpMaterial);
      gameField[x][y] = 1;
      this.calculateTranslation(x, y);
    }
    public calculateTranslation(x: number, y: number): void {
      let cmpTransform = new fCore.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(x * this.scale, y * this.scale, 0)));
      this.addComponent(cmpTransform);
    }
  }
}
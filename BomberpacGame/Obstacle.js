"use strict";
var Bomberpac;
(function (Bomberpac) {
    class Obstacle extends Bomberpac.Gameobject {
        constructor(_name, gameField, x, y, scale, mesh, color) {
            super(_name, gameField);
            this.scale = scale;
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(new ƒ.Vector3(scale, scale, 0));
            let cmpMaterial = new ƒ.ComponentMaterial(color);
            this.addComponent(cmpMaterial);
            gameField[x][y] = 1;
            this.calculateTranslation(x, y);
        }
        calculateTranslation(x, y) {
            let cmpTransform = new Bomberpac.fCore.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(x * this.scale, y * this.scale, 0)));
            this.addComponent(cmpTransform);
        }
    }
    Bomberpac.Obstacle = Obstacle;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Obstacle.js.map
"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    var fCore = FudgeCore;
    var fAid = FudgeAid;
    class Gameobject extends fCore.Node {
        constructor(_name, _matrix) {
            super(_name);
            this._gameField = _matrix;
        }
    }
    BomberpacGame.Gameobject = Gameobject;
    class GameobjectSprite extends fAid.NodeSprite {
        constructor(_name, _matrix) {
            super(_name);
            this._gameField = _matrix;
        }
    }
    BomberpacGame.GameobjectSprite = GameobjectSprite;
    class Obstacles extends Gameobject {
        constructor(_name, matrix, x, y, scale, mesh, color) {
            super(_name, matrix);
            this.scale = scale;
            let cmpMesh = new BomberpacGame.ƒ.ComponentMesh(mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(new BomberpacGame.ƒ.Vector3(scale, scale, 0));
            let cmpMaterial = new BomberpacGame.ƒ.ComponentMaterial(color);
            this.addComponent(cmpMaterial);
            matrix[x][y] = 1;
            this.calculateTranslation(x, y);
        }
        calculateTranslation(x, y) {
            let cmpTransform = new fCore.ComponentTransform(BomberpacGame.ƒ.Matrix4x4.TRANSLATION(new BomberpacGame.ƒ.Vector3(x * this.scale, y * this.scale, 0)));
            this.addComponent(cmpTransform);
        }
    }
    BomberpacGame.Obstacles = Obstacles;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=Obstacles.js.map
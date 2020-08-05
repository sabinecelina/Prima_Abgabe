"use strict";
var Bomberpac;
(function (Bomberpac) {
    var fCore = FudgeCore;
    var fAid = FudgeAid;
    class Gameobject extends fCore.Node {
        constructor(_name, _matrix) {
            super(_name);
            this._gameField = _matrix;
        }
        setGameField(x, y, id) {
            this._gameField[x][y] = id;
        }
        checkGameField(x, y, id) {
            return this._gameField[x][y] = id;
        }
    }
    Bomberpac.Gameobject = Gameobject;
    class GameobjectSprite extends fAid.NodeSprite {
        constructor(_name, _matrix) {
            super(_name);
            this._gameField = _matrix;
        }
        setGameField(x, y, id) {
            this._gameField[x][y] = id;
        }
        checkGameField(x, y, id) {
            return this._gameField[x][y] = id;
        }
    }
    Bomberpac.GameobjectSprite = GameobjectSprite;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Gameobject.js.map
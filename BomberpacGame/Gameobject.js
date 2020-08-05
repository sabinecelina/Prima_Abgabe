"use strict";
var Bomberpac;
(function (Bomberpac) {
    var fCore = FudgeCore;
    var fAid = FudgeAid;
    class Gameobject extends fCore.Node {
        constructor(_name, _matrix) {
            super(_name);
        }
    }
    Bomberpac.Gameobject = Gameobject;
    class GameobjectSprite extends fAid.NodeSprite {
        constructor(_name, _matrix) {
            super(_name);
            this._gameField = _matrix;
        }
    }
    Bomberpac.GameobjectSprite = GameobjectSprite;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Gameobject.js.map
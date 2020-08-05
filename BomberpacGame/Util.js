"use strict";
var Bomberpac;
(function (Bomberpac) {
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    Bomberpac.randomInteger = randomInteger;
    function getRandomTranslateX() {
        return randomInteger(1, 28);
    }
    Bomberpac.getRandomTranslateX = getRandomTranslateX;
    function getRandomTranslateY() {
        return randomInteger(1, 19);
    }
    Bomberpac.getRandomTranslateY = getRandomTranslateY;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Util.js.map
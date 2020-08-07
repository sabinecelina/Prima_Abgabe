"use strict";
var Bomberpac;
(function (Bomberpac) {
    var fCore = FudgeCore;
    function showMenue() {
        document.getElementById("menueButtons").style.display = "initial";
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("endScreen").style.display = "none";
    }
    Bomberpac.showMenue = showMenue;
    function toggleMusic() {
        Bomberpac.Sound.init();
        if (!Bomberpac.musicMuted) {
            Bomberpac.musicMuted = true;
            document.getElementById("musicButton").innerHTML = "Musik: aus";
            Bomberpac.Sound.stopMusic();
        }
        else if (Bomberpac.musicMuted) {
            Bomberpac.musicMuted = false;
            document.getElementById("musicButton").innerHTML = "Musik: an";
            Bomberpac.Sound.playMusic();
            Bomberpac.Sound.sounds["gameMusic"].muted = false;
        }
    }
    Bomberpac.toggleMusic = toggleMusic;
    function toggleSounds() {
        Bomberpac.Sound.init();
        if (!Bomberpac.soundMuted) {
            Bomberpac.soundMuted = true;
            document.getElementById("soundButton").innerHTML = "Sound: aus";
        }
        else if (Bomberpac.soundMuted) {
            Bomberpac.soundMuted = false;
            document.getElementById("soundButton").innerHTML = "Sound: an";
        }
    }
    Bomberpac.toggleSounds = toggleSounds;
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
    function gameOverScreen(pacman) {
        Bomberpac.Sound.stopMusic();
        fCore.Loop.stop();
        document.getElementById("endScreen").style.display = "initial";
        document.getElementById("gameWrapper").style.display = "none";
        if (pacman === "PlayerOne") {
            document.getElementById("deathScreenPlayerOne").style.display = "initial";
            document.getElementById("deathScreenPlayerTwo").style.display = "none";
        }
        else {
            document.getElementById("deathScreenPlayerOne").style.display = "none";
            document.getElementById("deathScreenPlayerTwo").style.display = "initial";
        }
    }
    Bomberpac.gameOverScreen = gameOverScreen;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=GameManager.js.map
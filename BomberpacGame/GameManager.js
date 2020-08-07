"use strict";
var Bomberpac;
(function (Bomberpac) {
    var fCore = FudgeCore;
    function showMenue() {
        document.getElementById("menueButtons").style.display = "initial";
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("winScreen").style.display = "none";
        document.getElementById("creditsPage").style.display = "none";
        document.getElementById("controlPage").style.display = "none";
        document.getElementById("backButton").style.display = "none";
        document.getElementById("level").style.display = "initial";
    }
    Bomberpac.showMenue = showMenue;
    function showControls() {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("winScreen").style.display = "none";
        document.getElementById("controlPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
        document.getElementById("level").style.display = "none";
    }
    Bomberpac.showControls = showControls;
    function showCredits() {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("winScreen").style.display = "none";
        document.getElementById("creditsPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
        document.getElementById("level").style.display = "none";
    }
    Bomberpac.showCredits = showCredits;
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
    function gameWinningScreen(pacman) {
        Bomberpac.Sound.stopMusic();
        fCore.Loop.stop();
        document.getElementById("winScreen").style.display = "initial";
        document.getElementById("gameWrapper").style.display = "none";
        if (pacman === 1) {
            document.getElementById("winScreenPlayerOne").style.display = "initial";
            document.getElementById("winScreenPlayerTwo").style.display = "none";
        }
        else {
            document.getElementById("winScreenPlayerOne").style.display = "none";
            document.getElementById("winScreenPlayerTwo").style.display = "initial";
        }
    }
    Bomberpac.gameWinningScreen = gameWinningScreen;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=GameManager.js.map
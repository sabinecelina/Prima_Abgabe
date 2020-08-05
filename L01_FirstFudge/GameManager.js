"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    function showMenue() {
        document.getElementById("menueButtons").style.display = "initial";
        document.getElementById("gameWrapper").style.display = "none";
    }
    BomberpacGame.showMenue = showMenue;
    function toggleMusic() {
        BomberpacGame.Sound.init();
        if (!BomberpacGame.musicMuted) {
            BomberpacGame.musicMuted = true;
            document.getElementById("musicButton").innerHTML = "Musik: aus";
            BomberpacGame.Sound.stopMusic();
        }
        else if (BomberpacGame.musicMuted) {
            BomberpacGame.musicMuted = false;
            document.getElementById("musicButton").innerHTML = "Musik: an";
            BomberpacGame.Sound.playMusic();
            BomberpacGame.Sound.sounds["gameMusic"].muted = false;
        }
    }
    BomberpacGame.toggleMusic = toggleMusic;
    function toggleSounds() {
        BomberpacGame.Sound.init();
        if (!BomberpacGame.soundMuted) {
            BomberpacGame.soundMuted = true;
            document.getElementById("soundButton").innerHTML = "Sound: aus";
        }
        else if (BomberpacGame.soundMuted) {
            BomberpacGame.soundMuted = false;
            document.getElementById("soundButton").innerHTML = "Sound: an";
        }
    }
    BomberpacGame.toggleSounds = toggleSounds;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=GameManager.js.map
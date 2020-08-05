"use strict";
var Bomberpac;
(function (Bomberpac) {
    function showMenue() {
        document.getElementById("menueButtons").style.display = "initial";
        document.getElementById("gameWrapper").style.display = "none";
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
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=GameManager.js.map
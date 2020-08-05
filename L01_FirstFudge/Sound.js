"use strict";
var BomberpacGame;
(function (BomberpacGame) {
    class Sound {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
        }
        static play(_id) {
            if (!BomberpacGame.soundMuted) {
                Sound.sounds[_id].volume = 0.5;
                Sound.sounds[_id].play();
            }
        }
        static playMusic() {
            if (!BomberpacGame.musicMuted) {
                Sound.sounds["gameMusic"].loop = true;
                Sound.sounds["gameMusic"].volume = 0.3;
                Sound.sounds["gameMusic"].play();
            }
        }
        static stopMusic() {
            Sound.sounds["gameMusic"].muted = true;
        }
    }
    Sound.sounds = {};
    BomberpacGame.Sound = Sound;
})(BomberpacGame || (BomberpacGame = {}));
//# sourceMappingURL=Sound.js.map
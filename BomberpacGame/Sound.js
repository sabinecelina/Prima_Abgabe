"use strict";
var Bomberpac;
(function (Bomberpac) {
    class Sound {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
        }
        static play(_id) {
            if (!Bomberpac.soundMuted) {
                Sound.sounds[_id].volume = 0.5;
                Sound.sounds[_id].play();
            }
        }
        static playMusic() {
            if (!Bomberpac.musicMuted) {
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
    Bomberpac.Sound = Sound;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Sound.js.map
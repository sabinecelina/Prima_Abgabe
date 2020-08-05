namespace Bomberpac {
  import fCore = FudgeCore;

  export function showMenue(): void {
    document.getElementById("menueButtons").style.display = "initial";
    document.getElementById("gameWrapper").style.display = "none";
  }
  export function toggleMusic(): void {
    Sound.init();
    if (!musicMuted) {
      musicMuted = true;
      document.getElementById("musicButton").innerHTML = "Musik: aus";
      Sound.stopMusic();
    } else if (musicMuted) {
      musicMuted = false;
      document.getElementById("musicButton").innerHTML = "Musik: an";
      Sound.playMusic();
      Sound.sounds["gameMusic"].muted = false;
    }
  }
  export function toggleSounds(): void {
    Sound.init();
    if (!soundMuted) {
      soundMuted = true;
      document.getElementById("soundButton").innerHTML = "Sound: aus";
    } else if (soundMuted) {
      soundMuted = false;
      document.getElementById("soundButton").innerHTML = "Sound: an";
    }
  }
}
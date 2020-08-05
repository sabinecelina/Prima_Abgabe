namespace Bomberpac {
  interface Sounds {
    [id: string]: HTMLAudioElement;
  }
  export class Sound {
    static sounds: Sounds = {};

    public static init(): void {
      let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
      for (let element of audioElements)
        Sound.sounds[element.id] = element;
    }
    public static play(_id: string): void {
      if (!soundMuted) {
        Sound.sounds[_id].volume = 0.5;
        Sound.sounds[_id].play();
      }
    }
    public static playMusic(): void {
      if (!musicMuted) {
        Sound.sounds["gameMusic"].loop = true;
        Sound.sounds["gameMusic"].volume = 0.3;
        Sound.sounds["gameMusic"].play();
      }
    }
    public static stopMusic(): void {
      Sound.sounds["gameMusic"].muted = true;
    }
  }
}

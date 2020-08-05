namespace Bomberpac {
  export function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  export function getRandomTranslateX(): number {
    return randomInteger(1, 28);
  }
  export function getRandomTranslateY(): number {
    return randomInteger(1, 19);
  }
}
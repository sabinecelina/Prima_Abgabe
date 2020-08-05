namespace Bomberpac {
  import fCore = FudgeCore; 

  export function showMenue(): void {
    document.getElementById("menueButtons").style.display = "initial"; 
    document.getElementById("gameWrapper").style.display = "none";
  }
}
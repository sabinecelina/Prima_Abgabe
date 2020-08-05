namespace Bomberpac {
  export class Floor extends Gameobject {
    private static mesh: fCore.MeshCube = new fCore.MeshCube();
    private color: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")));
    private obstacles: fCore.Node = new fCore.Node("Obstacles");
    private amountOfObstacles: number;
    private gameField: number[][];
    private game: fCore.Node;
    private data: ToggleData;
    private scale: number = 1;
    constructor(_name: string, gameField: number[][], game: fCore.Node, data: ToggleData) {
      super(_name, gameField);
      this.gameField = gameField;
      this.game = game;
      this.data = data;
      this.fetchData();
      this.createFloor(this.amountOfObstacles);
      console.log(this.data);
    }
    private fetchData(): void {
      this.amountOfObstacles = Number(this.data.amountOfObstacles);
    }
    private createFloor(_amountOfObstacles: number) {
      for (let i: number = 0; i < 31; i++) {
        let obstacle = new Obstacle("wall", gameField, i, 0, this.scale, Floor.mesh, this.color);
        this.obstacles.appendChild(obstacle);
        obstacle = new Obstacle("wall", gameField, i, 20, this.scale, Floor.mesh, this.color);
        this.obstacles.appendChild(obstacle);
      }
      for (let i: number = 0; i < 31; i++) {
        let obstacle = new Obstacle("wall", gameField, 0, i, this.scale, Floor.mesh, this.color);
        this.obstacles.appendChild(obstacle);
        obstacle = new Obstacle("wall", gameField, 29, i, this.scale, Floor.mesh, this.color);
        this.obstacles.appendChild(obstacle);
      }
      while (this.obstacles.getChildrenByName("obstacles").length < _amountOfObstacles) {
        let randomTranslateX: number = getRandomTranslateX();
        let randomTranslateY: number = getRandomTranslateX();
        if ((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 28 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1 || (randomTranslateX == 3 && randomTranslateY == 1))) {
        } else {
          let obstacles = new Obstacle("obstacles", gameField, randomTranslateX, randomTranslateY, this.scale, Floor.mesh, this.color);
          this.obstacles.appendChild(obstacles);
        }
      }
      this.game.appendChild(this.obstacles);
    }
  }
}
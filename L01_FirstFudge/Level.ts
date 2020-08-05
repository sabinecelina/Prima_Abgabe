namespace BomberpacGame {
  import fCore = FudgeCore;

  export class Level extends Gameobject {
    private img: HTMLImageElement = document.querySelector("img");
    private spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Food", this.img);
    private mesh: ƒ.MeshCube = new ƒ.MeshCube();
    private mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")));
    private obstacle: fCore.Node = new fCore.Node("Obstacles");
    private amountOfObstacles: number = 20;
    constructor(_name: string) {
      super(_name, matrix);
      this.createLevel(220);
      this.createFood(110);
      this.generateItem();
    }
    public static randomInteger(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    private createLevel(_amountOfObstacles: number) {
      for (let i: number = 0; i < 30; i++) {
        let obstacles = new Obstacles("wall", matrix, i, 0, scale, this.mesh, this.mtrSolidWhite);
        this.obstacle.appendChild(obstacles);
        obstacles = new Obstacles("wall", matrix, i, 20, scale, this.mesh, this.mtrSolidWhite);
        this.obstacle.appendChild(obstacles);
      }
      for (let i: number = 0; i < 20; i++) {
        let obstacles = new Obstacles("wall", matrix, 0, i, scale, this.mesh, this.mtrSolidWhite);
        this.obstacle.appendChild(obstacles);
        obstacles = new Obstacles("wall", matrix, 29, i, scale, this.mesh, this.mtrSolidWhite);
        this.obstacle.appendChild(obstacles);
      }
      for (let i: number = 0; i < _amountOfObstacles; i++) {
        let randomTranslateX: number = Level.randomInteger(1, 28);
        let randomTranslateY: number = Level.randomInteger(1, 19);
        if ((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 28 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1 || (randomTranslateX == 3 && randomTranslateY == 1))) {
        } else {
          let obstacles = new Obstacles("obstacles", matrix, randomTranslateX, randomTranslateY, scale, this.mesh, this.mtrSolidWhite);
          this.obstacle.appendChild(obstacles);
        }
      }
      game.appendChild(this.obstacle);
    }
    private createFood(_amountofFood: number) {
      let foodNode: fCore.Node = new fCore.Node("Food");
      let food: Food;
      Food.generateSprites(this.spritesheet);
      for (let i: number = 0; i < _amountofFood; i++) {
        let randomTranslateX: number = Level.randomInteger(1, 28);
        let randomTranslateY: number = Level.randomInteger(1, 19);
        if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || matrix[randomTranslateX][randomTranslateY] == 1)) {
          food = new Food("food", randomTranslateX, randomTranslateY, matrix);
          foodNode.appendChild(food);
          game.appendChild(foodNode);
        }
      }
    }
    private generateItem(): void {
      let itemNode: fCore.Node = new fCore.Node("Items");
      let item: Item;
      let id: number = 0;
      let img: HTMLImageElement = document.querySelector("img");
      let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Item", img);
      for (let i: number = 0; i < 230; i += 32.6) {
        id = id + 1;
        let randomTranslateX: number = Level.randomInteger(2, 27);
        let randomTranslateY: number = Level.randomInteger(2, 19);
        Item.generateSprites(spritesheet, i);
        item = new Item("Item", 1, randomTranslateY, matrix, id);
        itemNode.appendChild(item);
      }
      game.appendChild(itemNode);
    }
  }
}
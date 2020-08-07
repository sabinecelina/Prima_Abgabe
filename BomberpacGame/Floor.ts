namespace Bomberpac {
  import ƒAid = FudgeAid;
  export class Floor extends Gameobject {
    private img: HTMLImageElement = document.querySelector("img");
    private spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Spritesheet", this.img);
    private static mesh: fCore.MeshCube = new fCore.MeshCube();
    private color: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")));
    private obstacles: fCore.Node = new fCore.Node("Obstacles");
    private amountOfObstacles: number;
    private amountOfFood: number;
    private amountOfItems: number;
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
      this.createFood(this.amountOfFood);
      this.createItems(this.amountOfItems);
      (this.data);
    }
    private fetchData(): void {
      this.amountOfObstacles = Number(this.data.amountOfObstacles);
      this.amountOfFood = Number(this.data.amountOfFood);
      this.amountOfItems = Number(this.data.amountOfItems);
    }
    private createFloor(_amountOfObstacles: number): void {
      for (let i: number = 0; i < 31; i++) {
        let walls = new Obstacle("wall", gameField, i, 0, this.scale, Floor.mesh, this.color);
        this.obstacles.appendChild(walls);
        walls = new Obstacle("wall", gameField, i, 20, this.scale, Floor.mesh, this.color);
        this.obstacles.appendChild(walls);
      }
      for (let i: number = 0; i < 31; i++) {
        let walls = new Obstacle("wall", gameField, 0, i, this.scale, Floor.mesh, this.color);
        this.obstacles.appendChild(walls);
        walls = new Obstacle("wall", gameField, 29, i, this.scale, Floor.mesh, this.color);
        this.obstacles.appendChild(walls);
      }
      while (this.obstacles.getChildrenByName("obstacles").length < _amountOfObstacles) {
        let randomTranslateX: number = getRandomTranslateX();
        let randomTranslateY: number = getRandomTranslateX();
        if (!((randomTranslateX == 10 && randomTranslateY == 10) || (randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 28 && randomTranslateY == 1)
          || (randomTranslateX == 2 && randomTranslateY == 1 || (randomTranslateX == 3 && randomTranslateY == 1)))) {
          let obstacles = new Obstacle("obstacles", gameField, randomTranslateX, randomTranslateY, this.scale, Floor.mesh, this.color);
          this.obstacles.appendChild(obstacles);
        }
        this.appendChild(this.obstacles);
      }
    }
    private createFood(_amountofFood: number) {
      let foodNode: fCore.Node = new fCore.Node("Food");
      let food: Food;
      Food.generateSprites(this.spritesheet);
      for (let i: number = 0; i < _amountofFood; i++) {
        let randomTranslateX: number = randomInteger(1, 28);
        let randomTranslateY: number = randomInteger(1, 19);
        if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 15 && randomTranslateY == 15) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || this.gameField[randomTranslateX][randomTranslateY] == 1)) {
          this.gameField[0][i] = 1;
          food = new Food("food", randomTranslateX, randomTranslateY, this.gameField);
          foodNode.appendChild(food);
        }
        this.appendChild(foodNode);
      }
    }
    private createItems(_amountOfItems: number): void {
      let id: number = 0;
      let sprites: number[] = [0, 32.6, 65.2, 97.8, 130.3, 163, 195.6, 228.2];
      let itemNode: fCore.Node = new fCore.Node("Items");
      let pill: Pill;
      let img: HTMLImageElement = document.querySelector("img");
      let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Item", img);
      for (let i: number = 0; i < _amountOfItems; i++) {
        let randomNumber: number = randomInteger(0, 7);
        switch (randomNumber) {
          case 0: id = 0;
            break;
          case 1: id = 1;
            break;
          case 2: id = 2;
            break;
          case 3: id = 3;
            break;
          case 4: id = 4;
            break;
          case 5: id = 5;
            break;
          case 6: id = 6;
            break;
        }
        let randomTranslateX: number = getRandomTranslateX();
        let randomTranslateY: number = getRandomTranslateY();
        Pill.generateSprites(spritesheet, sprites[randomNumber]);
        if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 15 && randomTranslateY == 15) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || this.gameField[randomTranslateX][randomTranslateY] == 1)) {
          pill = new Pill("Item", randomTranslateX, randomTranslateY, this.gameField, id);
          itemNode.appendChild(pill);
        }
      }
      let randomTranslateX: number = getRandomTranslateX();
      let randomTranslateY: number = getRandomTranslateY();
      Pill.generateSprites(spritesheet, sprites[7]);
      if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 15 && randomTranslateY == 15) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || this.gameField[randomTranslateX][randomTranslateY] == 1)) {
        pill = new Pill("Item", randomTranslateX, randomTranslateY, this.gameField, 7);
        itemNode.appendChild(pill);
        this.appendChild(itemNode);
      }
    }
  }
}
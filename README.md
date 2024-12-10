# Prima_Abgabe
Prototyping interaktiver Apps und Medien
My [Designdocument](https://github.com/sabinecelina/Prima_Abgabe/blob/master/BOMBERPAC_DESIGNDOKUMENT.pdf)<br />
Here is my link to the [Quellcode](https://github.com/sabinecelina/Prima_Abgabe/tree/master/BomberpacGame)<br />
Here is my link to [ARCHIV](https://github.com/sabinecelina/Prima_Abgabe/blob/master/Bomberpac.zip)<br />
Here is my link to [Bomberpac](https://sabinecelina.github.io/Prima_Abgabe/BomberpacGame/Main.html)

The fun lies in the surprise—your goal is to get the key located in the top corner. The first player to grab the key wins the game. Various items and enemies will obstruct your path. If you encounter another player, you can send them back to their starting position using the SPACE or SHIFT_LEFT keys.

## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 |Bomberpac
|    | Name                  |Sabine Schleise
|    | Matrikelnummer        |259013
|  1 | User Interaction     | The user can interact with the application. In the main menu, they can navigate through different pages, read information about the game, or toggle music and sound effects on or off. The game starts with the user controlling the "Pacman" character using the keys "A," "D," "W," "S," and SHIFT, or alternatively the arrow keys and SPACE. The objective is to collect items while avoiding enemies that reset your position. Bombs can be used to send the other player back to their starting point.                                                              
|  2 | Object Interaction     | The most important collision detection occurs between the characters and obstacles or items. Characters are constantly checked for collisions with platforms, preventing forward movement. Other collisions are calculated based on object proximity. Initially, a matrix was used to calculate nearby collisions, but a continuous collision tester was later implemented. If the distance between two objects falls below a certain threshold, a collision is registered. This is used to handle bomb hits, item collection, and food consumption. 
|  3 | Variable Object Count | Each time a bomb is placed, an instance of the bomb is created and added to the game. 
|  4 | scene hierarchy      | At the root level is the "game" node, containing all other nodes. Attached to this is a "floor" object that holds all components for building a level, including walls, obstacles, food, and items.
|  5 | Sound                 | Most of Pacman's actions are accompanied by sound effects, such as eating food or items. Winning or losing triggers corresponding sounds. Background music can be activated in the main menu to enhance the atmosphere of the classic 2D platformer.
|  6 | GUI                   | The start menu allows the player to view controls or credits. From there, they can return to the main menu, where they can toggle sound or music independently. The main feature is the start button, which launches the game. Players can also select the difficulty level.
|  7 | external data         | 	Various settings for the game, such as the number of obstacles, food, or items, are stored in an external data.json file.
|  8 | Behavior classes     | A main Man class serves as the base for both Pacman characters. Classes for Pacman and enemies include methods for initiating and displaying sprite animations, as well as for detecting collisions.                 
|  9 | Subclasses            | The main GameField class creates the game matrix and inherits from the Node class. All other classes, such as Food, Items, and Bomb, inherit from the Sprites class, which defines fundamental attributes.
| 10 | Dimensions & Propositions     | The game field consists of squares arranged in a matrix of variable size. Each element is scaled to fit this size.                                            
| 11 | Event system          | Key presses trigger game-relevant events. Pacman's movements call methods that adjust speed and direction. Pressing a bomb key launches bombs. The update function and the update methods of each class are called in every game loop frame. Each Pacman has its own update class.                                                                                          

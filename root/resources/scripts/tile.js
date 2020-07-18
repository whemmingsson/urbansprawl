class Tile {
    constructor(counter, tileDef) {
        this.id = counter;
        this.label = tileDef.id;
        this.shield = tileDef.shield;
        this.types = tileDef.types.map((t) => t);
        this.connections = {
            North: tileDef.connections.North,
            East: tileDef.connections.East,
            South: tileDef.connections.South,
            West: tileDef.connections.West
        };
        this.invalidConnection = false;
        this.rotation = 0;
    }
}

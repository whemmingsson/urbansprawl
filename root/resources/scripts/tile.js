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

        // For placed tiles
        this.x = -1;
        this.y = -1;

        // FOR TESTING
        this.visited = false;
        this.hasRoadEnd = false;

        for (const p in this.connections) {
            if (this.connections[p].indexOf("roadend") >= 0)
                this.hasRoadEnd = true;
        }
    }

    setLocationInGrid(x,y){
        this.x = x;
        this.y = y;
    }

    hasRoad() {
        for (const p in this.connections) {
            if (this.connections[p].indexOf("road") >= 0)
                return true;
        }

        return false;
    }

    render(s) {
        if (this.rotation != 0)
            rotate(this.rotation * TWO_PI / 4);

        image(tileImages[this.label], 0, 0, s, s);

        if (this.placed && this.invalidConnection) {
            noStroke();
            fill(240, 20, 20, 100);
            rect(0, 0, s, s);
        }

        // FOR TESTING
        if(this.placed && this.hasRoadEnd){
            noStroke();
            fill(40, 20, 220, 150);
            ellipse(0, 0, s);
        }

        // FOR TESTING
        if(this.placed && this.visited){
            noStroke();
            fill(40, 240, 50, 150);
            ellipse(0, 0, s-10);
        }
    }
}

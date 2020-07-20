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
        this.nodes = []; // Associated nodes with this tile. For roads only.

        // FOR TESTING
        this.visited = false;
        this.hasRoadEnd = false;

        for (const p in this.connections) {
            if (this.connections[p].indexOf("roadend") >= 0)
                this.hasRoadEnd = true;
        }

    }

    setLocationInGrid(x, y) {
        this.x = x;
        this.y = y;
    }

    setupAndReturnNodes() {
        for (const p in this.connections) {
            if(this.connections[p].indexOf("road") >= 0)
                this.nodes.push(new Node(this.id + "_" + p, p, this.connections[p] === "roadend"));
        }

        const roadNodes = this.nodes.filter(n => {return !n.leafNode});

        if(roadNodes.length === 0)
            return this.nodes;

        for(let i = 0; i < roadNodes.length; i++){
            for(let j = 0; j < roadNodes.length; j++){
                if(i === j)
                    continue;
                
                roadNodes[i].adjacent.push(roadNodes[j]);
            }
        }
        
        return this.nodes;
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

        fill(255);
        text(this.id, 0, 0);
    }
}

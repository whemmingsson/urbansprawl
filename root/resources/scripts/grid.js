class Grid {
    constructor(width, height) {
        this.height = height;
        this.width = width;
        this.matrix = utils.create2DArray(width, height, null);
    }

    setValue(x, y, value) {
        if (x >= this.width || y >= this.width || x < 0 || y < 0)
            return;

        if (this.matrix[x][y] !== null && this.matrix[x][y] !== undefined && this.matrix[x][y].placed)
            return;

        this.matrix[x][y] = value;
    }

    getValue(x, y) {
        return this.matrix[x][y];
    }

    canPlace(x, y) {
        const failedConnections = [];
        const currentTile = this.getValue(x, y);
        const tileConnections = currentTile !== null ? currentTile.connections : [];
        const adjacent = this.getAdjacent(x, y);

        let allMatch = true;

        if (adjacent.length === 0)
            return failedConnections;

        adjacent.forEach(adjTile => {
            let adjConnections = adjTile.tile.connections;
            let direction = adjTile.direction;

            if (!this.makesCorrectConnection(direction, tileConnections, adjConnections)) {
                failedConnections.push(adjTile);
                allMatch = false;
            }
        });

        if (allMatch)
            return allMatch;
        else
            return failedConnections;
    }

    completesRoad(tile) {
        const visited = [];
        const result = this.completesRoadRecursive(tile, visited);
        console.log(result);

        visited.forEach(t => {
            t.visited = false;
        });

        return result;
    }

    completesRoadRecursive(tile, visited) {
        if (!tile.hasRoad())
            return false;

         console.log("INSPECTING TILE: " + tile.id);

        // "Wander" the road to find out if all end tiles has "roadend"
        const roadConnections = [];
        const roadEndConnections = [];

        let currentTile = tile;
        for (const p in currentTile.connections) {
            const connectionType = currentTile.connections[p];
            const connection = { Direction: p, Type: connectionType };
            if (connectionType.indexOf("roadend") >= 0)
                roadEndConnections.push(connection);
            else if (connectionType.indexOf("road") >= 0)
                roadConnections.push(connection);
        }

        console.log("Roads: "); console.log(roadConnections);
        console.log("Ends: "); console.log(roadEndConnections);

        // The tile placed was A, L, S,T,W or X
        // We are at the end of one road, so follow each road to see if any ends
        if (roadEndConnections.length > 0) {
            roadEndConnections.forEach(con => {
                const adj = this.getAdjecentInDirection(currentTile.x, currentTile.y, con.Direction);
                console.log(adj);
                if(adj !== null && !adj.visited){
                    currentTile.visited = true;
                    visited.push(currentTile);
                    this.completesRoadRecursive(adj, visited);
                }
               
            });
        }

        // The tile placed was D, J, K, O, P, U or V
        // We are in a middle of the road, follow all connections to see if ALL ends. 
        if (roadConnections.length > 0) {
            roadConnections.forEach(con => {
                const adj = this.getAdjecentInDirection(currentTile.x, currentTile.y, con.Direction);
                console.log(adj);
                if(adj !== null && !adj.visited){
                    currentTile.visited = true;
                    visited.push(currentTile);
                    this.completesRoadRecursive(adj, visited);
                }
               
            });
        }       
    }

    makesCorrectConnection(l, tCons, aCons) {
        if (tCons.length === 0)
            return false;

        const tCon = tCons[l];
        const aCon = aCons[utils.getOppositeDirection(l)];

        return aCon.indexOf("city") >= 0 && tCon.indexOf("city") >= 0
            || aCon.indexOf("road") >= 0 && tCon.indexOf("road") >= 0
            || tCon === aCon;
    }

    render(s) {
        background(0);
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                push();

                translate(i * s + s / 2, j * s + s / 2);

                const tile = this.getValue(i, j);

                if (tile !== null) {
                    tile.render(s);
                }
                else {
                    fill(75);
                    rect(0, 0, s, s);
                }

                pop();
            }
        }
    }

    getAdjacent(x, y) {
        const adjacentTiles = [];

        if (x > 0)
            adjacentTiles.push({ tile: this.matrix[x - 1][y], direction: utils.directions.WEST });

        if (y > 0)
            adjacentTiles.push({ tile: this.matrix[x][y - 1], direction: utils.directions.NORTH });

        if (y < this.height)
            adjacentTiles.push({ tile: this.matrix[x][y + 1], direction: utils.directions.SOUTH });

        if (x < this.width)
            adjacentTiles.push({ tile: this.matrix[x + 1][y], direction: utils.directions.EAST });

        return adjacentTiles.filter(t => t !== null && t.tile !== null);
    }

    getAdjecentInDirection(x, y, direction) {
        switch (direction) {
            case utils.directions.WEST:
                if (x > 0) return this.matrix[x - 1][y];
                else break;
            case utils.directions.NORTH:
                if (y > 0) return this.matrix[x][y - 1];
                else break;
            case utils.directions.SOUTH:
                if (y < this.height) return this.matrix[x][y + 1];
                else break;
            case utils.directions.EAST:
                if (x < this.width) return this.matrix[x + 1][y];
                else break;
        }

        return null;

    }
}
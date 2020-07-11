class Grid {
    constructor(width, height) {
        this.height = height;
        this.width = width;
        this.matrix = utils.create2DArray(width, height, null);
    }

    setValue(x, y, value) {
        if (x >= this.width || y >= this.width || x < 0 || y < 0)
            return;

        if (this.matrix[x][y] !== null && this.matrix[x][y] !== undefined && this.matrix[x][y].placed) {
            return;
        }

        this.matrix[x][y] = value;
    }

    getValue(x, y) {
        return this.matrix[x][y];
    }

    canPlace(x, y) {
        let failedConnections = [];
        let currentTile = this.getValue(x, y);

        let tileConnections = currentTile !== null ? currentTile.connections : [];

        let allMatch = true;
        let adjacent = this.getAdjacent(x, y);

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

    makesCorrectConnection(l, tCons, aCons) {
        if(tCons.length === 0)
            return false;
        let tCon = tCons[l];
        let aCon = aCons[utils.getOppositeDirection(l)];
        return aCon.indexOf("city") >= 0 && tCon.indexOf("city") >= 0 || tCon === aCon;
    }

    render(s) {
        background(0);
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                push();

                translate(i * s + s / 2, j * s + s / 2);

                let tile = this.getValue(i, j);

                fill(75);
                rect(0, 0, s, s);

                if (tile != null) {
                    if (tile.rotation != 0) {
                        rotate(tile.rotation * TWO_PI / 4);
                    }
                
                    image(tileImages[tile.label], 0, 0, s, s);
                }

                if (tile !== null && tile.placed && tile.invalidConnection) {
                    noStroke();
                    fill(240, 20, 20, 100);
                    rect(0, 0, s, s);
                }

                pop();
            }
        }
    }

    getAdjacent(x, y) {
        var adjacentTiles = [];

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
}
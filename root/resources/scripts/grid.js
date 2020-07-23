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

                translate(i * s + s / 2 + xOffset, j * s + s / 2 + yOffset);

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
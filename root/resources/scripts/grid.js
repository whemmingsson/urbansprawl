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

    canPlace(x, y){
        let failedConnections = [];
        let tileConnections = this.getValue(x,y).connections;

        let allMatch = true;
        let adjacent = this.getAdjacent(x,y);

        if(adjacent.length === 0)
            return failedConnections;

        adjacent.forEach(adjTile => {
            let adjConnections = adjTile.tile.connections;
            let direction = adjTile.direction;

            if(!this.makesCorrectConnection(direction, tileConnections, adjConnections)){
                failedConnections.push(direction);
                allMatch = false;
            }
        });

        if(allMatch)
            return allMatch;
        else
            return failedConnections;
    }

    makesCorrectConnection(l, tCons, aCons){
        let tCon = tCons[l];
        let aCon = aCons[utils.getOppositeDirection(l)];

        // TODO: Fix this, somehow
        if(aCon.indexOf("city") >= 0 && tCon.indexOf("city") >= 0)
            return true;

        return tCon === aCon;
    }

    render(s) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                let tile = this.getValue(i, j);

                if ((tile !== null && tile !== undefined) && tile.placed)
                    continue;

                push();

                translate(i * s + s / 2, j * s + s / 2);

                if (tile === null) {
                    fill(75);
                    rect(0, 0, s, s);
                }
                else {
                    if (rotation != 0)
                        rotate(rotation * TWO_PI/4);
                    noStroke();
                    image(tileImages[tile.id], 0, 0, s, s);
                    fill(255);
  
                    
                    textSize(32);
                    text(tile.id,-20,-10);
                }

                pop();

            }           
        }
    }

    getAdjacent(x,y){
        var adjacentTiles = [];
         
        if(x > 0)
            adjacentTiles.push({tile: this.matrix[x-1][y], direction : utils.directions.WEST});
          
        if(y > 0)
            adjacentTiles.push({tile: this.matrix[x][y-1], direction : utils.directions.NORTH});
        
        if(y < this.height)
            adjacentTiles.push({tile: this.matrix[x][y+1], direction : utils.directions.SOUTH});
       
        if(x < this.width)
            adjacentTiles.push({tile: this.matrix[x+1][y], direction : utils.directions.EAST});
        
        return adjacentTiles.filter(t => t !== null && t.tile !== null);
    }
}

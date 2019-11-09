class Grid {
    constructor(width, height) {
        this.height = height;
        this.width = width;
        this.matrix = utils.create2DArray(width, height, { value: '0', placed: false });
    }

   

    setValue(x, y, value) {
        if (x >= this.width || y >= this.width || x < 0 || y < 0)
            return;

        let tile = this.matrix[x][y];

        if (tile.placed) {
            return;
        }

        this.matrix[x][y] = value;
    }

    getValue(x, y) {
        return this.matrix[x][y];
    }

    render(s) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                let tile = this.getValue(i, j);
                let v = tile.value;

                if (tile.placed)
                    continue;

                push();

                translate(i * s + s / 2, j * s + s / 2);

                if (v === '0') {
                    fill(75);
                    rect(0, 0, s, s);
                }
                else {
                    if (rotation != 0)
                        rotate(rotation * TWO_PI/4);
                    noStroke();
                    image(tileImages[v], 0, 0, s, s);
                }

                pop();

            }           
        }
    }

    getAdjacent(x,y){
        var adjacentTiles = [];
         
        if(x > 0)
            adjacentTiles.push(this.matrix[x-1][y]);
          
        if(y > 0)
            adjacentTiles.push(this.matrix[x][y-1]);
        
        if(y < this.height)
            adjacentTiles.push(this.matrix[x][y+1]);
       
        if(x < this.width)
            adjacentTiles.push(this.matrix[x+1][y]);
        
        return adjacentTiles.filter(t => t.value !== '0');
    }
}

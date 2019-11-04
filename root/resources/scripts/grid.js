class Grid {
    constructor(width, height ) {
        this.height = height;
        this.width = width;

        this.matrix = this._create2DArray(width, height);
    }

    _create2DArray(w,h) {
        let arr = [];

        for (let i = 0; i < w; i++) {
            arr[i] = [];

            for(let j = 0; j < h; j++){
                //let index = this.getRandom(0, tiles.length);
                //let tile = tiles[index];
                //arr[i][j] = tile.id;
                arr[i][j] = '0';                
            }
        }   

        return arr;
    }

    getRandom(min, max){
        return Math.floor(Math.random() * (max - min) + min); 
    }

    setValue(x, y, value){
        if(x >= this.width || y >= this.width || x < 0 || y < 0)
            return;

        // if(this.matrix[x][y] != '0' && this.matrix[x][y] != '+')
        //     return;

        this.matrix[x][y] = value;
    }

    getValue(x, y){
        return this.matrix[x][y];
    }

    render(s){
        for (let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++){
                let v = this.getValue(i,j);
                if(v === '+'){
                    fill(40,230,70);        
                    rect(i*s, j*s, s,s);          
                }
                else if(v === '0') {
                    fill(75);
                    rect(i*s, j*s, s,s); 
                }
                else
                    image(tileImages[v], i*s, j*s, s,s);    
                    
                    
                
            }
        }   
    }
}
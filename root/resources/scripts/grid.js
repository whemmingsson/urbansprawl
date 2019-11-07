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
                arr[i][j] = {value: '0', placed : false};                
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

        let tile = this.matrix[x][y];
        if(tile.placed) {
            return;
        }
        this.matrix[x][y] = value;
    }

    getValue(x, y){
        return this.matrix[x][y];
    }

    render(s){
        for (let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++){

                let tile = this.getValue(i,j);
                let v = tile.value;

                if(tile.placed)
                    continue;

                push();

                translate(i*s+s/2, j*s+s/2);
               
              

                if(tile.placed){
                    if(tile.rotation)
                        rotate(rotation);
                    image(tileImages[v], 0, 0, s,s); 
                }else {

                    if(v === '+'){
                        fill(40,230,70);        
                        rect(0, 0, s,s);          
                    }
                    else if(v === '0') {
                        fill(75);
                        rect(0, 0, s,s); 
                    }
                    else {
                        if(rotation != 0)
                            rotate(rotation);
                        image(tileImages[v],0, 0, s,s);  
                    }
                         
                }
                
                pop();
            }
        }   
    }
}

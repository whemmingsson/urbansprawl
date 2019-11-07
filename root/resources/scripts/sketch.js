let tileImages = new Object();
let grid;
let size = 100;
let canvasWidth = 1200;
let canvasHeight = 900;

let rotation = 0;

let completed = 0;

let currentTilePos = {x:0,y:0};
let tile = getRandomTile();

function preload() {
    // preload() runs once
    loadTilesImages();
}

function setup() {
    rectMode(CENTER);
    imageMode(CENTER);
    let canvas = createCanvas(canvasWidth+2,canvasHeight+2);
    canvas.parent('sketch-holder');
    
    console.log(tiles);
  
   grid = new Grid(canvasWidth / size,canvasHeight / size);
}
        // expected output: "foo"
  

function draw() {

    //renderTiles(); 
    grid.render(size);
}


function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min); 
}

function getRandomTile(){
    let index = this.getRandom(0, tiles.length);
    return tiles[index];
}

function loadTilesImages(){ 
    tiles.forEach(tile => {
        let path = "resources/images/" + tile.id + ".png";
        let img = loadImage(path, 
            () => { 
                console.log("Finished loading " + path ); 
                tileImages[tile.id] = img;
            },
            () => console.log("Error loading " + path ));        
    }); 
}

function renderTiles() {
    let currentX = 0;
    let currentY = 0;
    let counter = 0;
    tileImages.forEach(img => {
        image(img, currentX, currentY, img.width / 4, img.height / 4);
        currentX += img.width / 4 + 5;
        counter++;

        if(counter % 8 == 0){
            currentX = 0;
            currentY += img.height / 4 + 5;
        }
    });

}  

function mouseClicked() { 
    if(mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)
        return;
        
    grid.setValue(currentTilePos.x, currentTilePos.y, {value: tile.id, placed : true, rotation : rotation});
    tile = getRandomTile();
}

function mouseMoved() {   
    if(mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)
        return;

    let x = Math.floor(mouseX / size);
    let y = Math.floor(mouseY / size);

    if(currentTilePos.x != x || currentTilePos.y != y){
        // Current tile is another one
        grid.setValue(currentTilePos.x, currentTilePos.y, {value :'0', placed : false});
    }
    else {
        grid.setValue(x,y, {value : tile.id, placed : false});
    }

    currentTilePos = {x : x, y : y};   
}

function keyTyped(){
    if (key === 'a') {
       rotation -= TWO_PI/4;
      } else if (key === 'd') {
        rotation += TWO_PI/4;
      }

      console.log(rotation);
}


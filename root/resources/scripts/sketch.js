let tileImages = [];

function setup() {
    let canvas = createCanvas(850,700);
    canvas.parent('sketch-holder');
    
    console.log(tiles);

    loadTilesImages();
}
function draw() {
    renderTiles();    
}

function loadTilesImages(){
    tiles.forEach(tile => {
        let path = "resources/images/" + tile.id + ".png";
        let img = loadImage(path, 
            () => { 
                console.log("Finished loading " + path ); 
                tileImages.push(img);
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
}

function mouseMoved() {
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min); 
}
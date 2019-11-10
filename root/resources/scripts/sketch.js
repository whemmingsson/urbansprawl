let tileImages = new Object();
let grid;
let size = 75;
let canvasWidth = 1200;
let canvasHeight = 900;
let rotation = 0;
let currentTilePos = { x: 0, y: 0 };
let tile;
let tiles = [];

function preload() {
    loadTilesImages();
}

function setup() {
    rectMode(CENTER);
    imageMode(CENTER);

    createCanvas(canvasWidth + 2, canvasHeight + 2).parent('sketch-holder');

    grid = new Grid(canvasWidth / size, canvasHeight / size);

    createTiles();

    tile = getRandomTile();
}

function createTiles(){
    tileDefinitions.forEach(tileDef => {
        for(let i = 0; i < tileDef.count; i++) {
            tiles.push(createTile(tileDef));
        }     
    });
}

function createTile(tileDef){
    return { 
        id : tileDef.id,
        shield  : tileDef.shield,
        types  : tileDef.types,
        connections  : tileDef.connections
    };
}

function draw() {
    grid.render(size);
}

function getRandomTile() {
    let index = utils.getRandom(0, tiles.length);
    let t = tiles[index];
    tiles.splice(index, 1);
    return t;
}

function loadTilesImages() {
    tileDefinitions.forEach(t => {
        let path = "resources/images/" + t.id + ".png";
        let img = loadImage(path,
            () => {
                console.log("Finished loading " + path);
                tileImages[t.id] = img;
            },
            () => console.log("Error loading " + path));
    });
}

function mouseClicked() {
    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)
        return;

    let t = grid.getValue(currentTilePos.x, currentTilePos.y)

    if(t != undefined && t != null && t.placed){
        console.log(t);
        return;
    }

    let cP = grid.canPlace(currentTilePos.x, currentTilePos.y);

    if(typeof cP === "boolean" && cP){
        console.log("Placed tile!");
        rotation = 0;        
        tile.placed = true;
        grid.setValue(currentTilePos.x, currentTilePos.y, tile);
        tile = getRandomTile();
    }
    else {
        console.log(cP)
    }
}

function mouseMoved() {
    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)
        return;

    let x = Math.floor(mouseX / size);
    let y = Math.floor(mouseY / size);

    if (currentTilePos.x != x || currentTilePos.y != y) {
        // Current tile is another one
        grid.setValue(currentTilePos.x, currentTilePos.y, null);
    }
    else {
        grid.setValue(x, y, tile);
    }

    currentTilePos = {x : x, y : y};
}

function keyTyped() {
    if (key === 'a') {
        rotation -= 1;
        utils.rotateTile(tile, false);
    } else if (key === 'd') {
        utils.rotateTile(tile, true);
        rotation += 1
    }
}
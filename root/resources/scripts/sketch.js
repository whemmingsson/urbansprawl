let tileImages = new Object();
let grid;
let size = 40;
const MIN_SIZE = 40;
const MAX_SIZE = 150;
let canvasWidth = 1400;
let canvasHeight = 1000;
let currentTilePos = { x: 0, y: 0 };
let tile;
let tiles = [];
let tilesPlaced = 0;
let invalidConnectionTiles = [];
let gameOver = false;

function preload() {
    loadTilesImages();
}

function setup() {
    rectMode(CENTER);
    imageMode(CENTER);

    createCanvas(canvasWidth + 2, canvasHeight + 2).parent('sketch-holder');

    grid = new Grid(canvasWidth / size, canvasHeight / size);

    size = 67; // Default render size

    createTiles();

    tile = getRandomTile();
}

function createTiles() {
    let counter = 0;
    tileDefinitions.forEach(tileDef => {
        for (let i = 0; i < tileDef.count; i++) {
            tiles.push(createTile(tileDef, counter));
            counter++;
        }
    });
}

function createTile(tileDef, counter) {
    return new Tile(counter, tileDef);
}

function draw() {
    if (gameOver)
        return;

    grid.render(size);
}

function getRandomTile() {
    if (tiles.length == 0) {
        gameOver = true;
        return;
    }

    let index = utils.getRandom(0, tiles.length);
    let t = tiles[index];
    tiles.splice(index, 1);
    return t;
}

function placeFirstTile() {
    let t = getRandomTile();
    t.placed = true;

    grid.setValue(grid.width / 2, grid.height / 2, t);
    tile = getRandomTile();
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

function clearInvalidConnectionTiles() {
    invalidConnectionTiles.forEach(tile => {
        tile.invalidConnection = false;
    });
    invalidConnectionTiles = [];
}

function checkForInvalidConnections() {
    let t = grid.getValue(currentTilePos.x, currentTilePos.y)

    if ((t != undefined && t != null && t.placed))
        return;

    let cP = tilesPlaced == 0 ? true : grid.canPlace(currentTilePos.x, currentTilePos.y);

    if (cP.length === 0 || typeof cP === "boolean")
        return;

    cP.forEach(adjTile => {
        adjTile.tile.invalidConnection = true;
        invalidConnectionTiles.push(adjTile.tile);
    });
}

function mouseClicked() {
    if (gameOver)
        return;

    let placedTile = handlePlacingOfTile();

    if(placedTile !== undefined){
        grid.completesRoad(placedTile);
    }
}

function handlePlacingOfTile() {
    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)
        return;

    let t = grid.getValue(currentTilePos.x, currentTilePos.y)

    if (t != undefined && t != null && t.placed) {
        console.log(t);
        return;
    }

    let cP = tilesPlaced == 0 ? true : grid.canPlace(currentTilePos.x, currentTilePos.y);

    if (typeof cP === "boolean" && cP) {
        let placedTile = tile;
        tile.placed = true;
        tile.setLocationInGrid(currentTilePos.x, currentTilePos.y);
        grid.setValue(currentTilePos.x, currentTilePos.y, tile);
        tile = getRandomTile();
        tilesPlaced++;
        return placedTile;
    }
}


function mouseMoved() {
    if (gameOver)
        return;

    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)
        return;

    let x = Math.floor(mouseX / size);
    let y = Math.floor(mouseY / size);

    if (currentTilePos.x != x || currentTilePos.y != y) {
        grid.setValue(currentTilePos.x, currentTilePos.y, null);
        clearInvalidConnectionTiles();
    }
    else {
        grid.setValue(x, y, tile);
        checkForInvalidConnections();
    }

    currentTilePos = { x: x, y: y };
}

function keyTyped() {
    if (gameOver)
        return;

    if (key === 'a') {
        utils.rotateTile(tile, false);
    } else if (key === 'd') {
        utils.rotateTile(tile, true);
    }

    clearInvalidConnectionTiles();
    checkForInvalidConnections();
}

function mouseWheel(event) {
    if (event.delta < 0 && size < MAX_SIZE)
        size += 1;
    else if (size > MIN_SIZE)
        size -= 1;

    return false;
}
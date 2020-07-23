const MIN_SIZE = 40;
const MAX_SIZE = 150;
const canvasWidth = 1400;
const canvasHeight = 1000;
const tiles = [];


let currentTilePos = { x: 0, y: 0 };
let invalidConnectionTiles = [];
let gameOver = false;
let tile;
let tileImages = new Object();
let grid;
let size = 40;
let tilesPlaced = 0;

let xOffset = 0;
let xPrevious = 0;
let yOffset = 0;
let yPrevious = 0;
let mouseIsDragged = false;
let xRenderOffset = 0;
const zoomStrength = 10;
let toSize;

const roadMap = [];

function preload() {
    loadTilesImages();
}

function setup() {
    rectMode(CENTER);
    imageMode(CENTER);

    createCanvas(canvasWidth + 2, canvasHeight + 2).parent('sketch-holder');

    grid = new Grid(canvasWidth / size, canvasHeight / size);

    size = 67; // Default render size
    toSize = size;

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

    if(toSize <= MAX_SIZE) {
        size = lerp(size, toSize, 0.4); // Smooth zoom
    }
    else {
         toSize = size = MAX_SIZE - 1; 
    }

    grid.render(size);
}

function getRandomTile() {
    if (tiles.length == 0) {
        gameOver = true;
        return;
    }

    const index = utils.getRandom(0, tiles.length);
    const t = tiles[index];
    tiles.splice(index, 1);
    return t;
}

function placeFirstTile() {
    const t = getRandomTile();
    t.placed = true;

    grid.setValue(grid.width / 2, grid.height / 2, t);
    tile = getRandomTile();
}

function loadTilesImages() {
    tileDefinitions.forEach(t => {
        const path = "resources/images/" + t.id + ".png";
        const img = loadImage(path,
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
    const t = grid.getValue(currentTilePos.x, currentTilePos.y)

    if ((t != undefined && t != null && t.placed))
        return;

    const cP = tilesPlaced == 0 ? true : grid.canPlace(currentTilePos.x, currentTilePos.y);

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

    const placedTile = handlePlacingOfTile();

    if (placedTile !== undefined) {
        if(placedTile.hasRoad()) {
            const nodesForTile = placedTile.setupAndReturnNodes();    
                     
            nodesForTile.forEach(tileNode => {
                const oppositeTileNodeDirection = utils.getOppositeDirection(tileNode.direction);
                grid.getAdjacent(currentTilePos.x, currentTilePos.y).forEach(adjTile => {
                    adjTile.tile.nodes.forEach(adjNode => {
                        if(adjNode.direction === oppositeTileNodeDirection && 
                           adjTile.direction === tileNode.direction)
                            tileNode.connectTo(adjNode);
                    });
                });
            });

            roadMap.push(...nodesForTile);

            // Check if the road is completed
            let roadCompleted = completesRoad(placedTile);
        }       
    }
}

function completesRoad(tile) {
    if(tilesPlaced == 1)
        return false;

    const visited = [];
    let foundCompletedRoad = false;

    if(tile.hasRoadEnd){
        tile.nodes.forEach(node => {
            console.log("Beginning search on node: ", node.id);
            if(completesRoadRecursive(node, visited)) {
                foundCompletedRoad = true;
                node.partOfPartialRoad = true;
            }
        });
    }
    else if(tile.hasRoad()){
        let allComplets = false;
        tile.nodes.forEach(node => {  
            console.log("Beginning search on node: ", node.id);       
            if(completesRoadRecursive(node, visited)) {
                allComplets = true;
            }
            else {
                allComplets = false;
            }

            if(allComplets){
                node.partOfPartialRoad = true;
            }
        });

        foundCompletedRoad = allComplets;
    }

    if(foundCompletedRoad){
        console.log("Completed road");
    }

    visited.forEach(t => {
        //t.partOfCompletedStructure = foundCompletedRoad;
        if(foundCompletedRoad && t.partOfPartialRoad){
            t.partOfCompletedStructure = true;
            t.partOfPartialRoad = false;
        }
        t.visited = false;
    });

    return foundCompletedRoad;
}

function completesRoadRecursive(node, visited) {
    console.log("Inspecting node: ", node.id );
    node.visited = true;
    visited.push(node);

    // if(node.isDeadEnd())
    //     return false;

    if(node.adjacent.length === 0) // Case: 0 adjacent nodes, no idea to continue
        return false;
    
    const unvisitedAdjacent = node.adjacent.filter(n => {return !n.visited;})

    if(unvisitedAdjacent.length > 0)
    {
        unvisitedAdjacent.forEach(adjNode => {
            adjNode.partOfPartialRoad = true;
            return completesRoadRecursive(adjNode, visited);
        });
    }
    else if(!node.leafNode)
        return false;
    else if(unvisitedAdjacent.length > 0 && node.leafNode)
        return true;      
}

function handlePlacingOfTile() {
    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)
        return;

    const t = grid.getValue(currentTilePos.x, currentTilePos.y)

    if (t != undefined && t != null && t.placed) {
        console.log(t);
        return;
    }

    const cP = tilesPlaced == 0 ? true : grid.canPlace(currentTilePos.x, currentTilePos.y);

    if (typeof cP === "boolean" && cP) {
        const placedTile = tile;
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

    const x = Math.floor((mouseX - xOffset) / size);
    const y = Math.floor((mouseY - yOffset) / size);

    if (currentTilePos.x != x || currentTilePos.y != y) {
        grid.setValue(currentTilePos.x, currentTilePos.y, null);
        clearInvalidConnectionTiles();
    }
    else {
        grid.setValue(x, y, tile);
        checkForInvalidConnections();
    }

    currentTilePos = { x: x, y: y };

    if(!mouseIsPressed) {
        xPrevious = mouseX;
        yPrevious = mouseY;
    }
}

function keyTyped() {

    // DEBUG
    if (key === 'n') {
        let td = {
            id : 'V',
            count: 9,
            shield : false,
            types: ['road'],
            connections: { North : 'field', East : 'field', South : 'road' , West : 'road'}
        };
        tile = createTile(td, tilesPlaced++);
    }
    if(key === "l"){
        let td = {
            id : 'W',
            count: 4,
            shield : false,
            types: ['road'],
            connections: { North : 'field', East : 'roadend', South : 'roadend' , West : 'roadend'}
        }
        tile = createTile(td, tilesPlaced++);
    }

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
    // Zooming in
    if (event.delta < 0 && size < MAX_SIZE) {
        //size += zoomStrength;
        toSize += zoomStrength;
        //xOffset -= mouseX/size;
    }
    // Zooming out
    else if (size > MIN_SIZE) {
        //size -= zoomStrength;
        toSize -= zoomStrength;
       //
    }

    

    return false;
}

function mouseDragged(event) {
    mouseIsDragged = true;

    xOffset += (mouseX - xPrevious);
    xPrevious = mouseX;

    yOffset += (mouseY - yPrevious);
    yPrevious = mouseY; 
  }

  function mouseReleased(event) {
    mouseIsDragged = false;
  }
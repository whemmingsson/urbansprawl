function setup() {
    let canvas = createCanvas(850,700);
    canvas.parent('sketch-holder');
    
    console.log(tiles);
}

function draw() {
}
  

function mouseClicked() { 
}

function mouseMoved() {
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min); 
}
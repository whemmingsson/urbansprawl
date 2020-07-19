class Node {
    constructor(id, direction, leafNode) {
        this.id = id;
        this.direction = direction;
        this.adjacent = [];
        this.leafNode = leafNode;
    }

    connectTo(node){
        this.adjacent.push(node);
        node.adjacent.push(this);
    }
}
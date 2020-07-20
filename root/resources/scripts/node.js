class Node {
    constructor(id, direction, leafNode) {
        this.id = id;
        this.direction = direction;
        this.adjacent = [];
        this.leafNode = leafNode;

        this.visited = false;
        this.partOfCompletedStructure = false;
        this.partOfPartialRoad = false;
    }

    connectTo(node){
        this.adjacent.push(node);
        node.adjacent.push(this);
    }

    isDeadEnd(){
        return !this.leafNode && this.adjacent.every(adj => {return adj.visited;});
    }
}
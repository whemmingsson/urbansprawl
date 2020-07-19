class Node {
    constructor(id, direction, leafNode) {
        this.id = id;
        this.direction = direction;
        this.adjacent = [];
        this.leafNode = leafNode;

        this.visited = false;
        this.partOfCompletedStructure = false;
    }

    connectTo(node){
        this.adjacent.push(node);
        node.adjacent.push(this);
    }

    isDeadEnd(){
        return !this.isLeafNode && this.adjacent.filter(adj => {return !adj.visited;}).length === 0;
    }
}
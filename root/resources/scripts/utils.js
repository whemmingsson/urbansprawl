let utils = {
    directions : {
        SOUTH : 'South', WEST : 'West', NORTH : 'North', EAST : 'East'
    },

    create2DArray: function (w, h, defaultValue) {
        let a = [];
        for (let i = 0; i < w; i++) {
            a[i] = [];

            for (let j = 0; j < h; j++) {
                a[i][j] = defaultValue;
            }
        }
        return a;
    },

    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    rotateTile: function (tile, rotationCW) {
        // connections: { North : 'citycenter', East : 'field', South : 'field', West : 'citycenter'}

        let n = tile.connections.North, e = tile.connections.East, w = tile.connections.West, s = tile.connections.South;

        if (rotationCW) {
            tile.connections.East = n;
            tile.connections.South = e;
            tile.connections.West = s;
            tile.connections.North = w;
        }
        else {
            tile.connections.East = s;
            tile.connections.South = w;
            tile.connections.West = n;
            tile.connections.North = e;
        }
    },

    getOppositeDirection : function (dir) {
        switch(dir) {
            case utils.directions.NORTH: return utils.directions.SOUTH;
            case utils.directions.SOUTH: return utils.directions.NORTH;
            case utils.directions.WEST: return utils.directions.EAST;
            case utils.directions.EAST: return utils.directions.WEST;
        }
    }
}
let utils = {
    create2DArray : function(w, h, defaultValue) {
        let a = [];
        for (let i = 0; i < w; i++) {
            a[i] = [];

            for (let j = 0; j < h; j++) {
                a[i][j] = defaultValue;
            }
        }
        return a;
    },

     getRandom : function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
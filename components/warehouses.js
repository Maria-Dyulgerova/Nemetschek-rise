
module.exports = class Warehouses {
    concrtuctor() {}
    // concrtuctor(whName, x, y) {
    //     this.whName = whName;
    //     this.x = x;
    //     this.y = y;

    // }
    createObjsFromInput(){
        let jsonObj = require("../input_data.json");
        // let whObjsArr = [];
        // for(let i = 0; i < jsonObj.warehouses.length; i ++) {
        //     whObjsArr.push(jsonObj.warehouses[i]);
        // }
        return jsonObj.warehouses;    
    }
    
}

module.exports = class Customers {
    concrtuctor() {}
    
    createObjsFromInput(){
        let jsonObj = require("../input_data.json");
        
        return jsonObj.customers;    
    }
    
}
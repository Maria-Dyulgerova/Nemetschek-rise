
module.exports = class Orders {
    concrtuctor() {
        this.name = "";
        this.x = "";
        this.y = "";
    }
    
    createObjsFromInput(){
        let jsonObj = require("../input_data.json");
        let ordersObjsArr = [];
        
        let newObjItem = {
            customerId : "",
            productList : {},
            nearestWhId : "",
            custIdCoordinates : {},
            path : "",
            estimate : ""
        };
        let coordinates = {};
        let nearestWh = {};
        for (let i = 0; i < jsonObj.orders.length; i ++) {
            newObjItem.customerId = jsonObj.orders[i].customerId;
            newObjItem.productList = jsonObj.orders[i].productList;
            coordinates = this.findCoordinates(jsonObj.orders[i].customerId);
            newObjItem.custIdCoordinates = coordinates;
            nearestWh = this.findNearestWh(coordinates);
            //on position 0 is the min path from wh
            newObjItem.path = nearestWh[0];
            newObjItem.estimate = newObjItem.path * 2 + 5;
            //on position 1 is the nearest whId
            newObjItem.nearestWhId = nearestWh[1];
           
            // Object.values bacause if i push or add abject to the array, it replaces all values with the last...
            ordersObjsArr.push(Object.values(newObjItem));
            
        }
        // console.log(JSON.stringify(this.findTheEstimate(ordersObjsArr)));
        return ordersObjsArr;    
    }
    findCoordinates(customerId) {
        const customerList = require("./customers");
        const cl = new customerList();
        const clArray = cl.createObjsFromInput();
        for (let i = 0; i < clArray.length; i ++) {
            
            if (customerId == clArray[i].id) {
                return clArray[i].coordinates;
            } 
        }
        return {};
        
    }
    findNearestWh(coordinates) {
        const whList = require("./warehouses");
        const whl = new whList();
        const whArray = whl.createObjsFromInput();
        let paths = [];
        for (let i = 0; i < whArray.length; i ++) {
            let horPath = Math.abs(whArray[i].x - coordinates.x);
            let vertPath = Math.abs(whArray[i].y - coordinates.y);
            paths[i] = horPath + vertPath;   
        }
        let minPath = Math.min(...paths);
        let index = paths.indexOf(minPath);
        let data  = [];
        data.push(minPath);
        data.push(index);
        return data;
    }
    findTheEstimate(ordersObjsArr) {
        let orderPathList = [];
        let orderEstimateList = [];
        for (let i = 0; i < ordersObjsArr.length; i ++) {
            orderPathList.push(ordersObjsArr[i][4]);
            orderEstimateList.push(ordersObjsArr[i][5]);
        }

        let maxEstimate = Math.max(...orderEstimateList);
        //to do: to iterate over (around)  the number of drones
        return this.findEstimate(orderEstimateList, orderPathList, maxEstimate);
    }
    findEstimate(orderEstimateList, orderPathList, maxEstimate) {
        let index = orderEstimateList.indexOf(maxEstimate);
        let orderEstimateListCopy = orderEstimateList;
        orderEstimateListCopy.splice(index, 1);
        let orderEstimateListMaxValueRemoved = orderEstimateListCopy;
        let secMaxEstimate = Math.max(...orderEstimateListMaxValueRemoved);
        maxEstimate = maxEstimate - (maxEstimate - 5) / 2;
        if ( maxEstimate >= secMaxEstimate ) {
            return maxEstimate;
        } else {
            orderEstimateList.splice(index, 1, maxEstimate);
            let indexOfSecMaxEstimate = orderEstimateList.indexOf(secMaxEstimate);
            let secPath = orderPathList[indexOfSecMaxEstimate];
            if (secMaxEstimate == secPath + 5) {
                return secMaxEstimate;
            } else {
                
                return this.findEstimate(orderEstimateList, orderPathList, secMaxEstimate);
                
            }
        }

    }
    
}
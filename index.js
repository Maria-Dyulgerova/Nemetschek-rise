const express = require("express");
const app = express();
const port = 3000;

let jsonObj = require("./input_data.json");
const warehouseList = require("./components/warehouses");
const wh = new warehouseList();

const orderList = require("./components/orders");
const ol = new orderList();

const customerList = require("./components/customers");
const cl = new customerList();

let orderListArr = ol.createObjsFromInput();

app.get("/", (req, res) => {
  
  res.send( "The estimate for the all orders is: "+JSON.stringify(ol.findTheEstimate(orderListArr))+" min.");
  // res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  console.log("The estimate for the all orders is: " + JSON.stringify(ol.findTheEstimate(orderListArr)) + " min.");
});


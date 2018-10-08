window.onload = function(){
  hideAnimation();
  initDatabase();
  getStoreStock();
}

// ===================
// = storestock.html =
// ===================

function getStoreStock() {
  let query = getWhere("devices", "month", "==", "10");
  
  console.log(query); // works
  
  setTimeout(function(){ // works
    console.log(query.length);
    addStoreStockRow(query.tech, query.manufacturer, query.model, query.actions, query.sku, query.date);
  }, 2000);
  
  //console.log(query.length); // doesn't work
  
//   for (let i = 0; i < results.length; i++){
//     console.log("About to set product");
//     let product = results[i];
//     console.log("Product set: ");
//     console.log(product);
//     addStoreStockRow(product.tech, product.manufacturer, product.model, product.actions, product.sku, product.date);
//   }
}

function addRows(dbData) {
  console.log(dbData.length);  
}

function addStoreStockRow(tech, manufacturer, model, actions, sku, date) {
  let table = document.getElementById("store-stock-tracker");
  let row = table.insertRow(0);
  let techCell = row.insertCell(0).innerHTML("Hello");
}


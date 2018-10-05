window.onload = function(){
  hideAnimation();
  initDatabase();
  getStoreStock();
}

// ===================
// = storestock.html =
// ===================

function getStoreStock() {
  results = getWhere("devices", "month", "==", "10");
  
  for (let i = 0; i < results.length; i++){
    let product = results[i];
    addStoreStockRow(product.tech, product.manufacturer, product.model, product.actions, product.sku, product.date);
  }
}

function addStoreStockRow(tech, manufacturer, model, actions, sku, date) {
  let table = document.getElementById("store-stock-tracker");
  let row = table.insertRow(0);
  let techCell = row.insertCell(0).innerHTML("Hello");
}


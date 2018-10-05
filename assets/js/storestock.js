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
  let checkboxCell = "<td><input type='checkbox'></td>";
  let techCell = "<td class='overflow'>" + tech + "</td>";
  let manufacturerCell = "<td class='overflow'>" + manufacturer + "</td>";
  let modelCell = "<td class='overflow'>" + model + "</td>";
  let actionsCell = "<td class='overflow'>" + actions + "</td>";
  let skuCell = "<td class='overflow'>" + sku + "</td>";
  let dateCell = "<td class='overflow'>" + date + "</td>";
  
   $("#store-stock-tracker > tbody").append(checkboxCell + techCell + manufacturerCell + modelCell + actionsCell + skuCell + dateCell);
}

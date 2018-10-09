window.onload = function(){
  hideAnimation();
  initDatabase();
  getStoreStock();
}

// ===================
// = storestock.html =
// ===================

function getStoreStock() {
  let date = new Date();
  let month = String(date.getMonth() + 1);
  let query = getWhere("devices", "month", "==", month);
  
  console.log(query); // works
  
  setTimeout(function(){ // works
    console.log("# of Results: " + query.length);
    for (let i = 0; i < query.length; i++){
      let product = query[i];
      console.log("Adding " + product.model + " to the table...");
      addStoreStockRow(product.tech, product.manufacturer, product.model, product.actions, product.sku, product.date);
    }
  }, 500); 
}

function addStoreStockRow(tech, manufacturer, model, actions, sku, date) {
  console.log("Processing product data...");
  let checkboxCell = "<td><input type='checkbox'></td>";
  let techCell = "<td class='overflow'><a>" + tech + "</a></td>";
  let manufacturerCell = "<td class='overflow'>" + manufacturer + "</td>";
  let modelCell = "<td class='overflow'>" + model + "</td>";
  let actionsCell = "<td class='overflow'>" + actions + "</td>";
  let skuCell = "<td class='overflow'>" + sku + "</td>";
  let dateCell = "<td class='overflow'>" + date + "</td>";
  
  $("#store-stock-tracker > tbody").append(checkboxCell + techCell + manufacturerCell + modelCell + actionsCell + skuCell + dateCell);
  console.log("Successfully added " + model + " to the table.");
}


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
  $("#store-stock-tracker > tbody").append("<tr> +
                                      "<td> +
                                        "<input type='checkbox'> +
                                      "</td> +
                                      "<td class='overflow'> + 
                                        tech + 
                                      "</td> +
                                     
                                      "<td class='overflow'> + 
                                        manufacturer + 
                                      "</td> +
                                     
                                      "<td class='overflow'> + 
                                        model + 
                                      "</td> +
                                     
                                      "<td class='overflow'> + 
                                        actions + 
                                      "</td> +
                                     
                                      "<td class='overflow'> + 
                                        sku + 
                                      "</td> +
                                     
                                      "<td class='overflow'> + 
                                        date + 
                                      "</td> +
                                     </tr>");
}

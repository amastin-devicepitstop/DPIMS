window.onload = function(){
  initDatabase();
  getStoreStock();
  initCheckboxes();
  hideAnimation();
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
  }, 1000); 
}

function addStoreStockRow(tech, manufacturer, model, actions, sku, date) {
  console.log("Processing product data...");
  let rowStart = "<tr>";
  let checkboxCell = "<td><input type='checkbox'></td>";
  let techCell = "<td class='overflow'><a>" + tech + "</a></td>";
  let manufacturerCell = "<td class='overflow'>" + manufacturer + "</td>";
  let modelCell = "<td class='overflow'>" + model + "</td>";
  let actionsCell = "<td class='overflow'>" + actions + "</td>";
  let skuCell = "<td class='overflow'>" + sku + "</td>";
  let dateCell = "<td class='overflow'>" + date + "</td>";
  let rowEnd = "</tr>";
  
  $("#store-stock-tracker > tbody").append(rowStart + checkboxCell + techCell + manufacturerCell + modelCell + actionsCell + skuCell + dateCell + rowEnd);
  console.log("Successfully added " + model + " to the table.");
}

function initCheckboxes() {
  // Checkbox with class="selectAll" will select all check boxes on the page
  $(".selectAll").click(function (e) {
      $(this).closest("table").find("td input:checkbox").prop("checked", this.checked);
    });
  
  // If a single checkbox is selected, allow that product to be edited/deleted
  // If multiple checkboxes are selected, allow those products to be deleted
  $(":checkbox").change(function() {
    if(this.checked) {
        if ($("input:checkbox:checked").length == 1) {
          console.log("1 checked");
        }
        else if ($("input:checkbox:checked").length == 1) {
          console.log("multiple checked");
        }
    }
  });
}


window.onload = function(){
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
    
  setTimeout(function(){ // works
    if (query.length > 0) {
      $(".selectAll").removeAttr("disabled");
    }
    for (let i = 0; i < query.length; i++){
      let product = query[i];
      addStoreStockRow(product.tech, product.manufacturer, product.model, product.actions, product.sku, product.date);
    }
    // Add a check here -- if query length > 0, check if data has been added to the table, and if not, run query again until it has been added.
    initCheckboxes();
    hideAnimation();
  }, 1000); 
}

function addStoreStockRow(tech, manufacturer, model, actions, sku, date) {
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
          $(".font-xl").html("<select class='form-control'><option value='' disabled selected hidden>More Actions</option><option value='Edit'>Edit</option><option value='Delete'>Delete</option></select>");
          $(".font-xl").attr('class', 'modifyProduct');
        }
        else if ($("input:checkbox:checked").length > 1) {
          $(".font-xl").html("<select class='form-control'><option value='' disabled selected hidden>More Actions</option><option value='Delete'>Delete</option></select>");
        }
    }
    
    else if(!(this.checked)) {
      $(".modifyProduct").html("Store Stock Tracker");
      $(".modifyProduct").attr("class", "font-xl");
    }
    

    if ($(".selectAll").checked == false) {
      $(".modifyProduct").html("Store Stock Tracker");
      $(".modifyProduct").attr("class", "font-xl");
    }  
  });
}


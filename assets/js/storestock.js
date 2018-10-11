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
    enableSelectAll(query);
    populateTable(query);
    // Add a check here -- if query length > 0, check if data has been added to the table, and if not, run query again until it has been added.
    initCheckboxes();
    hideAnimation();
  }, 1000);  
}

function enableSelectAll(query) {
  // Removes the 'disabled' attribute from the checkbox with id "selectAll"
  if (query.length > 0) {
    $(".selectAll").removeAttr("disabled");
  }
}

function populateTable(query) {
  while (true) {
    // If the query returns results...
      if (query.length > 0) {
        // Check if the rows were added to the table
        if ($("input:checkbox").length == 1) {
          // If they weren't, add them.
          for (let i = 0; i < query.length; i++){
            let product = query[i];
            addStoreStockRow(product.tech, product.manufacturer, product.model, product.actions, product.sku, product.date);
          }
        }
        // Otherwise there's no need to try to add them again.
        else{
          break;  
        }
      }
  // If the query doesn't return results, prompt to add a new product
      else {
      }
  }
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
  
  $(":checkbox").change(function() {
    // If no checkboxes are selected, display "Store Stock Tracker"
    if ($("input:checkbox:checked").length == 0) {
        $(".modifyProduct").html("Store Stock Tracker");
        $(".modifyProduct").attr("class", "font-xl");
      }
    
    // If a single checkbox is selected, allow that product to be edited/deleted
    else if ($("input:checkbox:checked").length == 1) {
          $(".font-xl").html("<select class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Edit'>Edit</option><option value='Delete'>Delete</option></select>");
          $(".font-xl").attr('class', 'modifyProduct');
          $(".modifyProduct").html("<select class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Edit'>Edit</option><option value='Delete'>Delete</option></select>");
        }
    
    // If multiple checkboxes are selected, allow those products to be deleted
    else if ($("input:checkbox:checked").length > 1) {
          $(".font-xl").html("<select class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Delete'>Delete</option></select>");
          $(".font-xl").attr('class', 'modifyProduct');
          $(".modifyProduct").html("<select class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Delete'>Delete</option></select>");
        }
  }); 
}

function parseOption() {
  console.log("Parse option");
  if ($(".modifyProduct").val() == "Edit") {
    console.log("Edit selected");
    editProduct();  
  }
  else {
    console.log($(".modifyProduct").val());  
  }
}

function editProduct() {
  //console.log($("#store-stock-tracker tbody tr td input:checkbox:checked"))  
  let row = $("input:checkbox:checked").closest('tr');
  console.log(row);
  let cell = $(row).find('td:sixth');
  console.log(cell);
}


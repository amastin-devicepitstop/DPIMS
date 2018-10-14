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
    initCheckboxes();
    sortTable("store-stock-tracker", {sortList: [[5,1]], headers: {0: {sorter: false}}});
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
      if ($("input[type='checkbox']:checked")[0].hasClass(".selectAll")){
          console.log("selectAll is checked");
          $(".selectAll").prop('checked', false); 
      }
      else{
        let singleCheckBoxHTML = "<select id='modifyOptions' class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Edit'>Edit</option><option value='Mark as Sold'>Mark as Sold</option><option value='Delete'>Delete</option></select>";
        $(".font-xl").html(singleCheckBoxHTML);
        $(".font-xl").attr('class', 'modifyProduct');
        $(".modifyProduct").html(singleCheckBoxHTML)
      }
    }
    
    // If multiple checkboxes are selected, allow those products to be deleted
    else if ($("input:checkbox:checked").length > 1) {
          let multiCheckBoxHTML = "<select id='modifyOptions' class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Mark as Sold'>Mark as Sold</option><option value='Delete'>Delete</option></select>";
          $(".font-xl").html(multiCheckBoxHTML);
          $(".font-xl").attr('class', 'modifyProduct');
          $(".modifyProduct").html(multiCheckBoxHTML)
    }
  }); 
}

function markAsSold() {
  let product;
  let checkboxes = $("input[type='checkbox']:checked:not('.selectAll')")
  console.log(checkboxes);
}

function parseOption() {
  if ($("#modifyOptions").val() == "Edit") {
    resetSelect(0);
    editProduct();  
  }
  else if ($("#modifyOptions").val() == "Mark as Sold") {
    resetSelect(0);
    markAsSold();
  }
  else if ($("#modifyOptions").val() == "Delete") {
    resetSelect(1);
    showConfirmDialog("Do you want to delete the selected product(s)?");
  }
  
}

function resetSelect(int) {
  if (int == 0) {
    $(".modifyProduct").html("<select id='modifyOptions' class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Edit'>Edit</option><option value='Delete'>Delete</option></select>");
  }
  else if (int == 1) {
    $(".modifyProduct").html("<select id='modifyOptions' class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Delete'>Delete</option></select>");
  }
  
}

function editProduct() {
  let row = $("input:checkbox:checked").closest('tr');
  let model = row[0].cells[3].innerText;
  let sku = row[0].cells[5].innerText;
  setURL("https://amastin-devicepitstop.github.io/IMS/storestock-edit.html?model=" + model + "&sku=" + sku);
}

function deleteProduct() {
  let row = $("input:checkbox:checked").closest('tr');
  let sku = row[0].cells[5].innerText;
  console.log("Attempting to delete " + sku);
}

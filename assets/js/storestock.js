// These two variables are used to provide the correct options for the 'modifyOptions' dropdown.
let singleCheckBoxHTML = "<select id='modifyOptions' class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Edit'>Edit</option><option value='Mark as Sold'>Mark as Sold</option><option value='Mark as Not Sold'>Mark as Not Sold</option><option value='Mark as Ready for Floor'>Mark as Ready for Floor</option><option value='Mark as Not Ready for Floor'>Mark as Not Ready for Floor</option><option value='Delete'>Delete</option></select>";
let multiCheckBoxHTML = "<select id='modifyOptions' class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Mark as Sold'>Mark as Sold</option><option value='Mark as Not Sold'>Mark as Not Sold</option><option value='Mark as Ready for Floor'>Mark as Ready for Floor</option><option value='Mark as Not Ready for Floor'>Mark as Not Ready for Floor</option><option value='Delete'>Delete</option></select>";

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
  // Creates each part of the row piece by piece and then appends it to the table body
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
    shadeSelected();
    
    // If no checkboxes are selected, display "Store Stock Tracker"
    if ($("input:checkbox:checked").length == 0) {
        $(".modifyProduct").html("Store Stock Tracker");
        $(".modifyProduct").attr("class", "font-xl");
      }
    
    // If a single checkbox is selected, allow that product to be edited/deleted
    else if ($("input:checkbox:checked").length == 1) {
      $("#new").html("<button id='deselect' class='btn btn-transparent btn-small return' onclick=" + 'deselectAll()' + "><svg class='text-top svg-18' xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path d='M466.745 0L256 210.745 45.255 0 0 45.254 210.745 256 0 466.745 45.255 512 256 301.255 466.745 512 512 466.745 301.255 256 512 45.254z'></path></svg></button>");
      // Deselect 'selectAll' and revert 'More Actions' to 'Store Stock Tracker' if 'selectAll' is the only selected checkbox.
      if ($("input[type='checkbox']:checked")[0].className == "selectAll") {
        $(".selectAll").prop('checked', false); 
        $(".modifyProduct").html("Store Stock Tracker");
        $(".modifyProduct").attr("class", "font-xl"); 
      }
      
      // Otherwise convert 'Store Stock Tracker' to 'More Actions'
      else {
        $(".font-xl").html(singleCheckBoxHTML);
        $(".font-xl").attr('class', 'modifyProduct');
        $(".modifyProduct").html(singleCheckBoxHTML)
      }
    }
    
    // If multiple checkboxes are selected, do not allow editing
    else if ($("input:checkbox:checked").length > 1) {
          $(".font-xl").html(multiCheckBoxHTML);
          $(".font-xl").attr('class', 'modifyProduct');
          $(".modifyProduct").html(multiCheckBoxHTML)
    }
  }); 
}

function deselectAll() {
  $(".selectAll").change();
  $("#deselect").html("<button id='new' class='btn btn-primary btn-small' type='submit'><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512' class='sub-white'><path d='511.5 227.5h-227V.5h-57v227H-.5v57h228v228h57v-228h227z'></path></svg>New</button>");
}

function shadeSelected() {
  // Any <tr> elements should have a white background if it's checkbox is not checked
  $("input:checkbox:not(:checked)").closest('tr').attr('class', '');
  
  // Any <tr> elements should have a background color of #f0f0f0 if it's checkbox is checked
  // Additionally the bottom border color should change so it doesn't blend in to the background.
  $("input:checkbox:checked").closest('tr').attr('class', 'selected');
}

function markAsSold(sold) {
  // Iterates through all selected checkboxes and merges a json with value {sold: true} into each matching document.
  let product;
  let sku;
  let checkboxes = $("input[type='checkbox']:checked:not('.selectAll')")
  
  for (let i = 0; i < checkboxes.length; i++) {
    sku = $(checkboxes[i]).closest('tr')[0].cells[5].innerText;
    merge("devices", sku, {sold: sold});
  }
}

function markAsReady(ready) {
  // Iterates through all selected checkboxes and merges a json with value {sold: true} into each matching document.
  let product;
  let sku;
  let checkboxes = $("input[type='checkbox']:checked:not('.selectAll')")
  
  for (let i = 0; i < checkboxes.length; i++) {
    sku = $(checkboxes[i]).closest('tr')[0].cells[5].innerText;
    merge("devices", sku, {ready: ready});
  }
}

function parseOption() {
  let int;
  
  if ($("input[type='checkbox']:checked").length == 1) {
    int = 0;
  }
  
  else if ($("input[type='checkbox']:checked").length > 1){
    int = 1;
  }
  
  if ($("#modifyOptions").val() == "Edit") {
    resetSelect(int);
    editProduct();  
  }
  else if ($("#modifyOptions").val() == "Mark as Sold") {
    resetSelect(int);
    markAsSold(true);
  }
  else if ($("#modifyOptions").val() == "Mark as Not Sold") {
    resetSelect(int);
    markAsSold(false);
  }
  else if ($("#modifyOptions").val() == "Mark as Ready for Floor") {
    resetSelect(int);
    markAsReady(true);
  }
    else if ($("#modifyOptions").val() == "Mark as Not Ready for Floor") {
    resetSelect(int);
    markAsReady(false);
  }
  else if ($("#modifyOptions").val() == "Delete") {
    resetSelect(int);
    showConfirmDialog("Do you want to delete the selected product(s)?");
  }
  
}

function resetSelect(int) {
  // Resets 'modifyProduct' to not change option when clicking on an option. Still runs the command though.
  if (int == 0) {
    $(".modifyProduct").html(singleCheckBoxHTML);
  }
  else if (int == 1) {
    $(".modifyProduct").html(multiCheckBoxHTML);
  }
  
}

function editProduct() {
  // Get the nearest row and then grabs the sku from it, queries the database and edits the product
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

// These two variables are used to provide the correct options for the 'modifyOptions' dropdown.
let singleCheckBoxHTML = "<select id='modifyOptions' class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Edit'>Edit</option><option value='Mark as Sold'>Mark as Sold</option><option value='Mark as Not Sold'>Mark as Not Sold</option><option value='Mark as Ready for Floor'>Mark as Ready for Floor</option><option value='Mark as Not Ready for Floor'>Mark as Not Ready for Floor</option><option value='Delete'>Delete</option></select>";
let multiCheckBoxHTML = "<select id='modifyOptions' class='form-control' onchange='parseOption()'><option value='' disabled selected hidden>More Actions</option><option value='Mark as Sold'>Mark as Sold</option><option value='Mark as Not Sold'>Mark as Not Sold</option><option value='Mark as Ready for Floor'>Mark as Ready for Floor</option><option value='Mark as Not Ready for Floor'>Mark as Not Ready for Floor</option><option value='Delete'>Delete</option></select>";

// Icons for product status
let readyIcon = "<div id='ready-icon' class='tooltip'><span class='no-display'>Ready</span><span class='ready'><svg title='Ready for Floor' xmlns='http://www.w3.org/2000/svg' class='ready-icon svg-20' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='363.025px' height='363.024px' viewBox='0 0 363.025 363.024' xml:space='preserve'><g><g><g><path d='M181.512,363.024C81.43,363.024,0,281.601,0,181.513C0,81.424,81.43,0,181.512,0     c100.083,0,181.513,81.424,181.513,181.513C363.025,281.601,281.595,363.024,181.512,363.024z M181.512,11.71     C87.88,11.71,11.71,87.886,11.71,181.513s76.17,169.802,169.802,169.802c93.633,0,169.803-76.175,169.803-169.802     S275.145,11.71,181.512,11.71z'></path></g></g><g><polygon points='147.957,258.935 83.068,194.046 91.348,185.767 147.957,242.375 271.171,119.166     279.451,127.445   '></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span></div>";
let soldIcon = "<div id='sold-icon' class='tooltip'><span class='no-display'>Sold</span><span class='sold'><svg title='Sold' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='sold-icon svg-25'><path d='M384 352H148.5c-6.9 0-13-4.4-15.2-10.9l-61.4-175c-1.6-3.7-5.2-6.1-9.2-6.1H48.5c-8.6 0-16-6.6-16.4-15.2-.4-9.2 6.9-16.8 16-16.8h32.8c6.9 0 13 4.4 15.2 10.9l61.4 175c1.6 3.7 5.2 6.1 9.2 6.1h199.6c4.2 0 7.9-2.6 9.4-6.6l27.9-108c2.4-6.5-2.4-13.4-9.4-13.4H176.5c-8.6 0-16-6.6-16.4-15.2-.4-9.2 6.9-16.8 16-16.8h255.6c4 0 8 1.4 11 4.1 5.1 4.6 6.6 11.8 4.2 17.9l-48 160c-2.5 6-8.4 10-14.9 10z'></path><circle cx='192' cy='416' r='32'></circle><circle cx='352' cy='416' r='32'></circle><path d='M192 295.5c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2zm64 0c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2zm64 0c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2z'></path></svg></span></div>";

window.onload = function(){
  initDatabase();
  checkSearch();
  setActiveTab();
}
 
// ===================
// = storestock.html =
// ===================

function checkSearch() {
  // If the word "search" is present in the URL, the page will attempt to query the database for the search keyword.
  // If the URL does not contain the word "search", it will query the database for devices added in the current month.
  
  if (urlContains("search")) {
    // Query the database
    let query = parseSearch("devices");
    getStoreStock(query);
    // Edit page title to accomodate search keyword
    $(".font-xl").html("Results for '" + getSearch() + "' in Store Stock Tracker");
  }
  else {
    let date = new Date();
    let month = String(date.getMonth() + 1);
    let year = String(date.getFullYear());
    // Query the database
    let query = getWhereWhere("devices", "month", "==", month, "year", "==", year);
    // Check if result is defined
    if (query) {
      getStoreStock(query);
    }
    else {
      alert("An error has occurred. Please refresh the page.");  
    }
  }
}

function getStoreStock(query) {
  // Prepares the page with data from the database query while the loading animation plays
  
  // Set timeout is necessary to make sure the query has time to return before attempting to work with the results.
  setTimeout(function(){
    enableSelectAll(query); // Switches .selectAll from disabled to enabled
    populateTable(query); // Adds products to the table
    initCheckboxes(); // Makes the checkbox in each row function as expected
    enableTooltips(); // Adds tooltips to any status icons on the page
    
    // Sort the table
    if (query.length > 0) {
      sortTable("store-stock-tracker", {sortList: [[6,1]], headers: {0: {sorter: false}}, cssAsc: 'headerSortUp', cssDesc: 'headerSortDown'});
    }
    hideAnimation(); // Hide the loading animation
  }, 2500);  
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
            addStoreStockRow(product);
          }
        }
        // Otherwise there's no need to try to add them again.
        else{
          break;  
        }
      }
  // If the query doesn't return results, prompt to add a new product
      else {
        let row = "<tr><td colspan='8' class='no-results'><p class='text-muted'>No Records Found</p></td></tr>"
        $("#store-stock-tracker > tbody").append(row);
        break;
      }
  }
}

function addStoreStockRow(product) {
  // Creates each part of the row piece by piece and then appends it to the table body
  let rowStart = "<tr>";
  let checkboxCell = "<td><input type='checkbox'></td>";
  let techCell = "<td class='overflow'><a>" + product.tech + "</a></td>";
  let manufacturerCell = "<td class='overflow'>" + product.manufacturer + "</td>";
  let modelCell = "<td class='overflow'>" + product.model + "</td>";
  let actionsCell = "<td class='overflow'>" + product.actions + "</td>";
  let skuCell = "<td class='overflow'>" + product.sku + "</td>";
  let dateCell = "<td class='overflow'>" + product.date + "</td>";
  let statusCellStart = "<td class='overflow no-padding'>";
  let statusCellEnd = "</td>";
  let rowEnd = "</tr>";
  
  // Add corresponding svg icon to the row if a product is ready or sold
  if (product.ready) { // only ready
    statusCellStart += readyIcon
    
    if (product.sold) { // ready AND sold
      statusCellStart += soldIcon;
    }
  }
  
  else if (product.sold) { // only sold
    statusCellStart += soldIcon
  }
  
  let row = rowStart + checkboxCell + techCell + manufacturerCell + modelCell + actionsCell + skuCell + dateCell + statusCellStart + statusCellEnd + rowEnd;
  
  $("#store-stock-tracker > tbody").append(row); // add row to table
}

function initCheckboxes() {
  // Checkbox with class="selectAll" will select all check boxes on the page
  $(".selectAll").click(function (e) {
      $(this).closest("table").find("td input:checkbox").prop("checked", this.checked);
    });
  
  // Each time a checkbox is changed...
  $(":checkbox").change(function() {
    shadeSelected();
    
    // If no checkboxes are selected, display "Store Stock Tracker"
    if ($("input:checkbox:checked").length == 0) {
        xToNew();
        $("#deselect").html("<button id='new' class='btn btn-primary btn-small' type='submit'><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512' class='sub-white'><path d='511.5 227.5h-227V.5h-57v227H-.5v57h228v228h57v-228h227z'></path></svg>New</button>");
        $(".modifyProduct").html("Store Stock Tracker");
        $(".modifyProduct").attr("class", "font-xl");
      }
    
    // If a single checkbox is selected, allow that product to be edited/deleted
    else if ($("input:checkbox:checked").length == 1) {
      // Deselect 'selectAll' and revert 'More Actions' to 'Store Stock Tracker' if 'selectAll' is the only selected checkbox.
      if ($("input[type='checkbox']:checked")[0].className == "selectAll") {
        xToNew();
        $(".selectAll").prop('checked', false); 
        $(".modifyProduct").html("Store Stock Tracker");
        $(".modifyProduct").attr("class", "font-xl"); 
      }
      
      // Otherwise convert 'Store Stock Tracker' to 'More Actions'
      else {
        newToX();
        $(".font-xl").html(singleCheckBoxHTML);
        $(".font-xl").attr('class', 'modifyProduct');
        $(".modifyProduct").html(singleCheckBoxHTML)
      }
    }
    
    // If multiple checkboxes are selected, do not allow editing
    else if ($("input:checkbox:checked").length > 1) {
      console.log($("input:checkbox:checked"));
      // If selectAll and one other checkbox are checked, treat it as though only one checkbox is checked.
      if ($("input:checkbox:checked").length == 2 && $(".selectAll:checked")){
        console.log($(".selectAll:checked"));
        newToX();
        $(".font-xl").html(singleCheckBoxHTML);
        $(".font-xl").attr('class', 'modifyProduct');
        $(".modifyProduct").html(singleCheckBoxHTML);
      }
      
      // Otherwise, remove "Edit" from "More Actions" because multiple checkboxes are selected.
      else{
        console.log("Select All is not checked");
        newToX();
        $(".font-xl").html(multiCheckBoxHTML);
        $(".font-xl").attr('class', 'modifyProduct');
        $(".modifyProduct").html(multiCheckBoxHTML);
      }
    }
  }); 
}

function newToX() {
  // Converts the '+ New' button to 'X'
  $("#new").closest('form').attr('action', 'javascript:xToNew()');
  $("#new").html("<svg class='text-top svg-18' xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path d='M466.745 0L256 210.745 45.255 0 0 45.254 210.745 256 0 466.745 45.255 512 256 301.255 466.745 512 512 466.745 301.255 256 512 45.254z'></path></svg>");
  $("#new").attr('class', 'btn btn-transparent btn-small return');
  $("#new").attr('id', 'deselect');
}

function xToNew() {
  // Converts the 'X' button to '+ New'
  let checked = $("input:checkbox:checked");
  
  // If any checkboxes are checked...
  if (checked.length >= 1) {
    // Unchecks any checked checkboxes
    for (let i = 0; i < checked.length; i++){
      $(checked[i]).prop('checked', false);  
    }
    // Revert "More Options" to "Store Stock Tracker"
    $(".modifyProduct").html("Store Stock Tracker");
    $(".modifyProduct").attr("class", "font-xl"); 
    shadeSelected(); // Update which rows are shaded
  }
  
  $("#deselect").closest('form').attr('action', 'storestock-new.html');
  $("#deselect").attr('class', 'btn btn-primary btn-small');
  $("#deselect").html("<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512' class='sub-white'><path d='M511.5 227.5h-227V.5h-57v227H-.5v57h228v228h57v-228h227z'></path></svg>" + '                  New                ');
  $("#deselect").attr('id', 'new');
}

function shadeSelected() {
  // Shades any rows with a selected checkbox.
  
  // Any <tr> elements should have a white background if it's checkbox is not checked
  $("input:checkbox:not(:checked)").closest('tr').attr('class', '');
  
  // Any <tr> elements should have a background color of #f0f0f0 if it's checkbox is checked
  // Additionally the bottom border color should change so it doesn't blend in to the background.
  $("input:checkbox:checked").closest('tr').attr('class', 'selected');
}

function markAsSold(sold) {
  // Iterates through all selected checkboxes and merges a json with value {sold: boolean} into each matching document.
  let row;
  let product;
  let sku;
  let status;
  let statusCell;
  let checkboxes = $("input[type='checkbox']:checked:not('.selectAll')")
  
  // Mark each row with a checked checkbox as 'ready'
  for (let i = 0; i < checkboxes.length; i++) {
    row = $(checkboxes[i]).closest('tr');
    sku = row[0].cells[5].innerText;
    sku = sku.replace(/\s+/g, '');
    statusCell = row[0].cells[7];
    status = $(statusCell).find("#sold-icon");
    update("devices", sku, {sold: sold});
  }
  
  // Add a sold icon if product is sold and it doesn't already have an icon
  if (sold && status.length == 0) {
    $(statusCell).append(soldIcon);
  }
  // Remove the icon if it has one and is not sold
  else if (!(sold) && status.length == 1) {
    $(status).remove();
  }
  
  // Show appropriate success dialog
  if (sold) {
    showSuccessDialog("Product(s) marked as 'Sold.'");
  }
  else {
    showSuccessDialog("Product(s) marked as 'Not Sold.'");
  }
  
}

function markAsReady(ready) {
  // Iterates through all selected checkboxes and merges a json with value {sold: true} into each matching document.
  let row;
  let product;
  let sku;
  let status;
  let statusCell;
  let checkboxes = $("input[type='checkbox']:checked:not('.selectAll')")
  
  // Mark each row with a checked checkbox as 'ready'
  for (let i = 0; i < checkboxes.length; i++) {
    row = $(checkboxes[i]).closest('tr');
    sku = row[0].cells[5].innerText;
    sku = sku.replace(/\s+/g, '');
    statusCell = row[0].cells[7];
    status = $(statusCell).find("#ready-icon");
    update("devices", sku, {ready: ready});
  }
  
  // Add ready icon if it does not exist
  if (ready && status.length == 0) {
    $(statusCell).prepend(readyIcon);
  }
  
  // Remove ready icon if it exists
  else if (!(ready) && status.length == 1) {
    $(status).remove();
  }
  
  // Show appropriate success dialog
  if (ready) {
    showSuccessDialog("Product(s) marked as 'Ready for Floor.'");
  }
  else {
    showSuccessDialog("Product(s) marked as 'Not Ready for Floor.'");
  }
}

function parseOption() {
  // Calls appropriate function depending on which option in "More Actions" was selected
  
  let int; // Used as a way of determining whether or not to use singleCheckboxHTML or multiCheckboxHTML. Basically option A or option B.
  
  if ($("input[type='checkbox']:checked").length == 1) {
    int = 0; // use singleCheckboxHTML
  }
  
  else if ($("input[type='checkbox']:checked").length > 1){
    int = 1; // use multiCheckboxHTML
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
  
  enableTooltips(); // This is necessary to fix a bug where newly modified status tooltips would not appear unless the page was reloaded.
}

function resetSelect(int) {
  // Resets 'modifyProduct' to not change option when clicking on an option.
  // Basically when you click on an option in "More Actions", it will not change the <select> to that option, but it will perform the action.
  if (int == 0) {
    $(".modifyProduct").html(singleCheckBoxHTML);
  }
  else if (int == 1) {
    $(".modifyProduct").html(multiCheckBoxHTML);
  }
  
}

function editProduct() {
  // Edit a product in the table
  
  // Get the nearest row and then grabs the sku from it, queries the database and edits the product
  let row = $("input:checkbox:checked").closest('tr');
  let model = row[0].cells[3].innerText;
  let sku = row[0].cells[5].innerText;
  
  // Redirect to edit page
  setURL(getHomePage() + "storestock-edit.html?model=" + model + "&sku=" + sku);
}

function deleteProduct() {
  // Deletes a product from the database
  
  // Get rows which contain a checked checkbox
  let row = $("input:checkbox:checked").closest('tr');
  let sku;
  
  // Close "Are you sure you want to delete these products" modal
  closeModal();
  
  // Gets the SKU in each row and deletes it from the database.
  for (let i = 0; i < row.length; i++) {
    sku = row[i].cells[5].innerText;
    sku = sku.replace(/\s+/g, '');
    // If SKU matches ###########X...
    if (/(\d\d\d\d\d\d\d\d\d\d\d\w)/i.test(sku)) {
      remove("devices", sku);
      row[i].remove();
    }
  }
  
  // Display success message
  setTimeout(function() {
    showSuccessDialog("Product(s) successfully deleted.");
  }, 1000);
  
  // Display 'No Records Found' if the last row is removed from the table. 
  if ($("#store-stock-tracker tr").length == 1) { 
    row = "<tr><td colspan='8' class='no-results'><p class='text-muted'>No Records Found</p></td></tr>"
    $("#store-stock-tracker > tbody").append(row);
    $(".selectAll").prop('disabled', true);
    xToNew();
  }
  
  // If there are no checkboxes checked, revert the "X" to the "New" button.
  if ($("input:checkbox:checked").length == 0) {
    xToNew();  
  }
}

function enableTooltips() {
  // Initialize tooltips
  
  $("[title='Ready for Floor']").tooltip({
    position: {
      my: "center top",
      at: "center bottom+10px"
    },
    show: {
      duration: 300
    }
  });
  
  $("[title='Sold']").tooltip({
    position: {
      my: "center top",
      at: "center bottom+10px"
    },
    show: {
      duration: 300
    }
  });
}

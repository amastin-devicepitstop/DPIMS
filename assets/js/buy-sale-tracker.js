// These two variables are used to provide the correct options for the 'modifyOptions' dropdown.
let actions = "<div class='actions'><input class='selectAll btn-spacer' type='checkbox'><button class='btn btn-transparent btn-small no-padding' style=' '><svg class='svg-18' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='774.266px' height='774.266px' viewBox='0 0 774.266 774.266' xml:space='preserve'> <g> <g> <path d='M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875 C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916 c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703 c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282 c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802 H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z'></path> <rect x='475.031' y='286.593' width='48.418' height='396.942'></rect> <rect x='363.361' y='286.593' width='48.418' height='396.942'></rect><rect x='251.69' y='286.593' width='48.418' height='396.942'></rect></g></g></svg></button><button class='fill-normal right btn btn-transparent btn-small return no-padding'><svg class='text-top' xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path d='M466.745 0L256 210.745 45.255 0 0 45.254 210.745 256 0 466.745 45.255 512 256 301.255 466.745 512 512 466.745 301.255 256 512 45.254z'></path></svg></button></div>";
let buys = "<span id='title-buys' class='font-md text-white font-regular'>Buys</span>";
let sales = "<span id='title-sales' class='font-md text-white font-regular'>Sales</span>";


// Icons for product status
let readyIcon = "<div id='ready-icon' class='tooltip'><span class='no-display'>Ready</span><span class='ready'><svg title='Ready for Floor' xmlns='http://www.w3.org/2000/svg' class='ready-icon svg-20' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='363.025px' height='363.024px' viewBox='0 0 363.025 363.024' xml:space='preserve'><g><g><g><path d='M181.512,363.024C81.43,363.024,0,281.601,0,181.513C0,81.424,81.43,0,181.512,0     c100.083,0,181.513,81.424,181.513,181.513C363.025,281.601,281.595,363.024,181.512,363.024z M181.512,11.71     C87.88,11.71,11.71,87.886,11.71,181.513s76.17,169.802,169.802,169.802c93.633,0,169.803-76.175,169.803-169.802     S275.145,11.71,181.512,11.71z'></path></g></g><g><polygon points='147.957,258.935 83.068,194.046 91.348,185.767 147.957,242.375 271.171,119.166     279.451,127.445   '></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span></div>";
let soldIcon = "<div id='sold-icon' class='tooltip'><span class='no-display'>Sold</span><span class='sold'><svg title='Sold' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='sold-icon svg-25'><path d='M384 352H148.5c-6.9 0-13-4.4-15.2-10.9l-61.4-175c-1.6-3.7-5.2-6.1-9.2-6.1H48.5c-8.6 0-16-6.6-16.4-15.2-.4-9.2 6.9-16.8 16-16.8h32.8c6.9 0 13 4.4 15.2 10.9l61.4 175c1.6 3.7 5.2 6.1 9.2 6.1h199.6c4.2 0 7.9-2.6 9.4-6.6l27.9-108c2.4-6.5-2.4-13.4-9.4-13.4H176.5c-8.6 0-16-6.6-16.4-15.2-.4-9.2 6.9-16.8 16-16.8h255.6c4 0 8 1.4 11 4.1 5.1 4.6 6.6 11.8 4.2 17.9l-48 160c-2.5 6-8.4 10-14.9 10z'></path><circle cx='192' cy='416' r='32'></circle><circle cx='352' cy='416' r='32'></circle><path d='M192 295.5c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2zm64 0c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2zm64 0c-1.1 0-2.3-.3-3.3-.8-3.7-1.9-5.2-6.4-3.4-10.1l32-64c1.9-3.7 6.4-5.2 10.1-3.4 3.7 1.9 5.2 6.4 3.4 10.1l-32 64c-1.4 2.7-4.1 4.2-6.8 4.2z'></path></svg></span></div>";

window.onload = function(){
  initDatabase();
  getBuySale();
}
 
// =========================
// = buy-sale-tracker.html =
// =========================

function getBuySale() {
  let date = new Date();
  let month = String(date.getMonth() + 1);
  let query = getWhere("buysale", "month", "==", month);
    
  setTimeout(function(){ // works
    enableSelectAll(query);
    populateColumns(query);
    fillColumns();
    initCheckboxes();
    hideAnimation();
  }, 2500);  
}

function enableSelectAll(query) {
  // Removes the 'disabled' attribute from the checkbox with id "selectAll"
  if (query.length > 0) {
    $(".selectAll").removeAttr("disabled");
  }
}

function populateColumns(query) {
  while (true) {
    // If the query returns results...
      if (query.length > 0) {
        for (let i = 0; i < query.length; i++){
          let product = query[i];
          addBuySale(product);
        }
        break;
      }
  // If the query doesn't return results, prompt to add a new product
      else {
        //let row = "<tr><td colspan='8' class='no-results'><p class='text-muted'>No Records Found</p></td></tr>"
        //$("#store-stock-tracker > tbody").append(row);
        console.log("no results");
        break;
      }
  }
}

function addBuySale(product) {
  let editIcon = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='528.899px' height='528.899px' viewBox='0 0 528.899 528.899' style='enable-background:new 0 0 528.899 528.899;' xml:space='preserve'> <g> <path d='M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z'/></g></svg>";
  // Creates the transaction and puts it in the correct column. 
  let divStart = "<div class='transaction-list-item'>";
  let checkboxDiv = "<div class='width-10'><div><input type='checkbox'></div></div>";
  let infoDivStart = "<div class='width-90'>";
  let productDiv = "<div class='transaction-product'><span class='font-medium'>" + product.manufacturer + " " + product.model + "</span></div>";
  let nameDiv = "<div class='transaction-technician'><span class='block'><a>" + product.tech + "</a></span></div>";
  let skuDiv = "<div class='transaction-sku'><span class='block'>" + product.sku + "</span></div>";
  let buttonDiv = "<div class='right'><div><button type='button' class='edit-icon' onclick='editBuySale($(this))'>" + editIcon + "</button></div></div>";
  let date = "<div class='transaction-date'><label class='text-muted font-light'>" + product.date + "</label></div>";
  let id = "<div class='transaction-id'><label class='no-display'>" + product.id + "</label></div>";
  let divEnd = "</div></div>";
       
  let transaction = divStart + checkboxDiv + infoDivStart + productDiv + nameDiv + skuDiv + buttonDiv + date + id + divEnd;     
    
  if (product.buy) {
    $("#buys").prepend(transaction);
  }
  
  else if (product.sale) {
    $("#sales").prepend(transaction);
  }
}

function initCheckboxes() {
  // Checkbox with class="selectAll" will select all check boxes on the page
  $(".selectAll").click(function (e) {
      $(this).closest("table").find("td input:checkbox").prop("checked", this.checked);
  });
  
  $(":checkbox").change(function() {
    
    if ($.contains($("input:checkbox:checked"), $("#buys")){
      // If no checkboxes are selected, display "Store Stock Tracker"
      if ($("#buys input:checkbox:checked").length == 0) {
          $(".actions")[0].html(buys);
        }

      // If a single checkbox is selected, allow that product to be edited/deleted
      else if ($("#buys input:checkbox:checked").length == 1) {
        // Deselect 'selectAll' and revert 'More Actions' to 'Store Stock Tracker' if 'selectAll' is the only selected checkbox.
        if ($("#buys input[type='checkbox']:checked")[0].className == "selectAll") {
          $(".actions")[0].html(buys);
        }

        // Otherwise convert 'Store Stock Tracker' to 'More Actions'
        else {
          $("#title-buys").html(actions);
        }
      }
    }
  }); 
}

function deleteProduct() {
  let row = $("input:checkbox:checked").closest('tr');
  let sku;
  closeModal();
  for (let i = 0; i < row.length; i++) {
    sku = row[i].cells[5].innerText;
    sku = sku.replace(/\s+/g, '');
    // If SKU matches ###########A...
    if (/(\d\d\d\d\d\d\d\d\d\d\d\w)/i.test(sku)) {
      remove("devices", sku);
      row[i].remove();
      setTimeout(function() {
        showSuccessDialog("Product(s) successfully deleted.");
      }, 1000);
    }
  }
  // Display 'No Records Found' if the last row is removed from the table. 
  if ($("#store-stock-tracker tr").length == 1) { 
    row = "<tr><td colspan='8' class='no-results'><p class='text-muted'>No Records Found</p></td></tr>"
    $("#store-stock-tracker > tbody").append(row);
    $(".selectAll").prop('disabled', true);
    xToNew();
  }
  
  if ($("input:checkbox:checked").length == 0) {
    xToNew();  
  }
}

function fillColumns() {
  let noRecords = "<div class='transaction-list-item-empty text-center'><label>No Records Found</label></div>";
  
  if ($("#buys").children().length == 0) {
    $("#buys").prepend(noRecords);
  }
  
  if ($("#sales").children().length == 0) {
    $("#sales").prepend(noRecords);
  }
}

function editBuySale(element) {  
  let id = element.closest(".transaction-list-item").find(".transaction-id").children("label")[0].innerText;
  setURL("https://amastin-devicepitstop.github.io/IMS/buy-sale-tracker-edit.html?id=" + id)
}

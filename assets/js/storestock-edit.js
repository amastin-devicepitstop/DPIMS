window.onload = function(){
  preventFormSubmit();
  initDatabase();
  updatePageTitle();
  getProduct();
  autocomplete();
}

function populateForm(query) {
  let product = query[0];
  let firstName = product.tech.split(" ")[0];
  let lastName = product.tech.split(" ")[1];
  let manufacturer = product.manufacturer;
  let model = product.model;
  let actions = product.actions;
  let sku = product.sku;
  let date = product.date;
  let sold = product.sold;
  let ready = product.ready;
  
  $("#first-name").val(product.tech.split(" ")[0]);
  $("#last-name").val(product.tech.split(" ")[1]);
  $("#manufacturer").val(manufacturer);
  $("#model").val(model);
  $("#actions").val(actions);
  $("#sku").val(sku);
  $("#date").val(date);
  $("#sold").prop('checked', sold);
  $("#ready").prop('checked', ready);
}

function getProduct() {
  let query = getWhere("devices", "sku", "==", getSKU());
  setTimeout(function(){
    populateForm(query);
    hideAnimation();
  }, 1000); 
}

function updatePageTitle() {  
  $(".font-xl").text("Editing " + getModel());
}

function preventFormSubmit() {
  // Check that the current page is the "Edit" page
  
  if (urlContains("edit")) {    
    $("#date").datepicker({dateFormat: "m/d/yy"});
    
    // Prevent form submission
    $("form").submit(function (e) {  
      e.preventDefault();
      addStoreStock();
    });	
  }
}

function addStoreStock() {
  let name = document.getElementById("first-name").value + " " + document.getElementById("last-name").value;
  let manufacturer = document.getElementById("manufacturer").value;
  let model = document.getElementById("model").value;
  let actions = document.getElementById("actions").value;
  let sku = document.getElementById("sku").value;
  let date = document.getElementById("date").value;
  
  let month = getMonth(date);
  let day = getDay(date);
  let year = getYear(date);
  
  let sold = $("#sold").prop('checked');
  let ready = $("#ready").prop('checked');
  
  if (getSKU() !== sku) {
    console.log(getSKU() + " != " + sku);
    remove("devices", getSKU());
  }
  save("devices", sku, {tech: name, manufacturer: manufacturer, model: model, actions: actions, sku: sku, date: date, month: month, day: day, year: year, sold: sold, ready: ready});
}

function addAction() {
  let actions = document.getElementById("actions");
  let selectedOption = document.getElementById("actions-performed").value;
  
  // If input is empty...
  if (actions.value == "") {
    // Add the selected option to its contents
    actions.value = selectedOption;
  }
  
  // If input is not empty...
  else {
    // Append the (lowercase) selected option to its contents, separated by a comma
    selectedOption = selectedOption.toLowerCase();
    actions.value += ", " + selectedOption;
  }
}

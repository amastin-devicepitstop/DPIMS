window.onload = function(){
  hideAnimation();
  preventFormSubmit();
  initDatabase();
  autocomplete();
}

function preventFormSubmit() {
  // Check that the current page is the "New Store Stock" page
  
  if (urlContains("new")) {
    $("#date").val(new Date().toLocaleDateString());
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

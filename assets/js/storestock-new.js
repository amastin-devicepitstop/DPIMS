window.onload = function(){
  hideAnimation();
  preventFormSubmit();
  initDatabase();
}

function preventFormSubmit() {
  // Check that the current page is the "New Store Stock" page
  
  if (urlContains("new")) {
    $("#date").val(new Date().toLocaleDateString());
    
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
  
  save("devices", sku, {tech: name, manufacturer: manufacturer, model: model, actions: actions, sku: sku, date: date, month: month, day: day, year: year});
}


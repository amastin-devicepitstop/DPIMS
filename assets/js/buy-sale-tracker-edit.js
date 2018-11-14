window.onload = function(){
  setActiveTab();
  preventFormSubmit();
  initDatabase();
  autocomplete();
  getProduct();
}

function populateForm(query) {
  let product = query[0];
  let firstName = product.tech.split(" ")[0];
  let lastName = product.tech.split(" ")[1];
  let manufacturer = product.manufacturer;
  let model = product.model;
  let sku = product.sku;
  let date = product.date;
  let buy = product.buy;
  let sale = product.sale;
  
  $("#first-name").val(product.tech.split(" ")[0]);
  $("#last-name").val(product.tech.split(" ")[1]);
  $("#manufacturer").val(manufacturer);
  $("#model").val(model);
  $("#sku").val(sku);
  $("#date").val(date);
  $("#buy").prop('checked', buy);
  $("#sale").prop('checked', sale);
}

function getProduct() {
  let query = getWhere("buysale", "id", "==", getID());
  setTimeout(function(){
    populateForm(query);
    hideAnimation();
  }, 1000); 
}

function preventFormSubmit() {
  // Check that the current page is the "New Buy/Sale" page
  
  if (urlContains("new")) {
    $("#date").datepicker({dateFormat: "m/d/yy"});
    
    // Prevent form submission
    $("form").submit(function (e) {  
      e.preventDefault();
      addBuySale();
    });	
  }
}

function addBuySale() {
  let name = document.getElementById("first-name").value + " " + document.getElementById("last-name").value;
  let manufacturer = document.getElementById("manufacturer").value;
  let model = document.getElementById("model").value;
  let sku = document.getElementById("sku").value;
  let date = document.getElementById("date").value;
  
  let month = getMonth(date);
  let day = getDay(date);
  let year = getYear(date);
  
  let buy = $("#buy").prop('checked');
  let sale = $("#sale").prop('checked');
    
  save("buysale", getID(), {tech: name, manufacturer: manufacturer, model: model, sku: sku, date: date, month: month, day: day, year: year, buy: buy, sale: sale, id: time});
}

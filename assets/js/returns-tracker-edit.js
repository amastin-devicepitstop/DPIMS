window.onload = function(){
  preventFormSubmit();
  initDatabase();
  updatePageTitle();
  getReturn();
}

function populateForm(query) {
  let product = query[0];
  let firstName = product.tech.split(" ")[0];
  let lastName = product.tech.split(" ")[1];
  let reason = product.reason;
  let sku = product.sku;
  let date = product.date;
  let sold = product.sold;
  let ready = product.ready;
  
  $("#first-name").val(product.tech.split(" ")[0]);
  $("#last-name").val(product.tech.split(" ")[1]);
  $("#reason").val(reason);
  $("#sku").val(sku);
  $("#date").val(date);
}

function getReturn() {
  let query = getWhere("returns", "sku", "==", getSKU());
  setTimeout(function(){
    populateForm(query);
    hideAnimation();
  }, 1000); 
}

function updatePageTitle() {  
  $(".font-xl").text("Editing Return");
}

function preventFormSubmit() {
  // Check that the current page is the "Edit" page
  if (urlContains("edit")) {    
    $("#date").datepicker({dateFormat: "m/d/yy"});
    
    // Prevent form submission
    $("form").submit(function (e) {  
      e.preventDefault();
      addReturn();
    });	
  }
}

function addReturn() {
  let name = document.getElementById("first-name").value + " " + document.getElementById("last-name").value;
  let reason = document.getElementById("reason").value;
  let sku = document.getElementById("sku").value;
  let date = document.getElementById("date").value;
  
  let month = getMonth(date);
  let day = getDay(date);
  let year = getYear(date);
  
  update("devices", getSKU(), {tech: name, reason: reason, sku: sku, date: date, month: month, day: day, year: year});}

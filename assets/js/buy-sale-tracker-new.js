window.onload = function(){
  hideAnimation();
  preventFormSubmit();
  initDatabase();
  autocomplete();
}

function preventFormSubmit() {
  // Check that the current page is the "New Buy/Sale" page
  
  if (urlContains("new")) {
    $("#date").val(new Date().toLocaleDateString());
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
  
  let time = String(Date.now()).slice(0, -1);
  
  save("buysale", time, {tech: name, manufacturer: manufacturer, model: model, sku: sku, date: date, month: month, day: day, year: year, buy: buy, sale: sale, id: time});
}

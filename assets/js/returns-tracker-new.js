window.onload = function(){
  hideAnimation();
  preventFormSubmit();
  initDatabase();
}

function preventFormSubmit() {
  // Check that the current page is the "New Store Stock" page
  
  if (urlContains("new")) {
    $("#date").val(new Date().toLocaleDateString());
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

  save("returns", sku, {tech: name, reason: reason, sku: sku, date: date, month: month, day: day, year: year});
}

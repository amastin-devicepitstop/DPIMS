window.onload = function(){
  setActiveTab();
  initDatabase();
  updateBuySaleCount()
  updateReturnCount();
  updateSignCount();
  updateStoreStockCount();
  updateReadyForFloorCount();
  initSearch();
  setTimeout(function() {
    hideAnimation();
  }, 1000);
}

function editMSRP() {
  let span = $("#msrp-table").find("span");
  let values = $("#msrp-table").find("span").val();
  let val = "";
  //span.replaceWith("<input type='text'></input>");
  for (let i = 0; i < span.length; i++) {
    val = span[i].innerText;
    $(span[i]).replaceWith("<input type='text' value='" + val + "'></input>");
    console.log(val);
  }
}

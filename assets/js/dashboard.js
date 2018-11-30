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
  let value = "";
  for (let i = 0; i < span.length; i++) {
    value = span[i].innerText;
    span[i] = "<input></input>"
  }
}

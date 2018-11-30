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
  console.log($("#msrp-table"));  
  console.log($("#msrp-table").find("tbody").find("tr span"));
  console.log($("#msrp-table").find("span"));
}

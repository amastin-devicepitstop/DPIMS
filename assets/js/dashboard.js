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
  console.log($("#msrp").find("span"));  
}

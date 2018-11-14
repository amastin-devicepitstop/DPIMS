window.onload = function(){
  setActiveTab();
  initDatabase();
  updateBuySaleCount()
  updateReturnCount();
  updateStoreStockCount();
  updateReadyForFloorCount();
  initSearch();
  setTimeout(function() {
    hideAnimation();
  }, 1000);
}

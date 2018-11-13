window.onload = function(){
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

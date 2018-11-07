window.onload = function(){
  initDatabase();
  updateBuySaleCount()
  updateReturnCount();
  updateStoreStockCount();
  updateReadyForFloorCount();
  setTimeout(function() {
    hideAnimation();
  }, 1000);
}

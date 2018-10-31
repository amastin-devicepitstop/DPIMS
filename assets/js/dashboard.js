window.onload = function(){
  initDatabase();
  updateReturnCount();
  updateStoreStockCount();
  updateReadyForFloorCount();
  setTimeout(function() {
    hideAnimation();
  }, 1000);
}

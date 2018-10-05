window.onload = function(){
  hideAnimation();
  initDatabase();
  getStoreStock();
}

// ===================
// = storestock.html =
// ===================

function getStoreStock() {
  results = getWhere("devices", "month", "==", "10");
  console.log(results);
}

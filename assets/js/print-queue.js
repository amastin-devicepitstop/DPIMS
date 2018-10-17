window.onload = function(){
  initDatabase();
  loadSigns();
  hideAnimation();
}

function loadSigns() {
  getAll("signs");
}

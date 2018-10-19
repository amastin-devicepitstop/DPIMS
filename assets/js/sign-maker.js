window.onload = function(){
  initDatabase();
  hideAnimation();
}

function emptyQueue() {
  showConfirmDialog("Do you want to delete all signs in the print queue?");
}

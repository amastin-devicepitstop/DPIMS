window.onload = function(){
  initDatabase();
  hideAnimation();
}

function emptyQueue() {
  showConfirmDialog("Do you want to delete all signs in the print queue?");
}

function removePendingSigns() {
  closeModal();
  removeAll('signs');
  setTimeout(function() {
    showSuccessDialog("All pending signs have been successfully removed.");
  }, 1000);
}

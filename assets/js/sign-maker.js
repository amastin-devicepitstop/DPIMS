window.onload = function(){
  initDatabase();
  emptyQueue()
  hideAnimation();
}

function emptyQueue() {
  $("#removeSigns").click(function() {
    removeAll('signs');
  });
}

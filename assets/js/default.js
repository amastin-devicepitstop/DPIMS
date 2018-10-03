let database;

window.onload = function(){
  let animation = document.getElementById("load-screen");
  animation.style.display = "none";
  
  const config = {
    apiKey: "AIzaSyAchMHl30dBGYZHfVJR3ch12jFCpReQSdM",
    authDomain: "devicepitstop-imsdb.firebaseapp.com",
    databaseURL: "https://devicepitstop-imsdb.firebaseio.com",
    projectId: "devicepitstop-imsdb",
    storageBucket: "devicepitstop-imsdb.appspot.com",
    messagingSenderId: "658605927128"
  };
  const app = firebase.initializeApp(config);
  const settings = {
    timestampesInSnapshots: true  
  };
  database = firebase.firestore();
  database.settings(settings);
}

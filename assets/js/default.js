let database;

window.onload = function(){
  console.log($(window).width());
  console.log($(window).height());
  
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
    timestampsInSnapshots: true  
  };
  database = firebase.firestore();
  database.settings(settings);
}

function save(collection, doc, subCollection, subDoc, json) {
    database.collection(collection).doc(doc).collection(subCollection).doc(subDoc).set(json)
    .then(function(){
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function get(collection, doc) {
    database.collection(collection).doc(doc).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

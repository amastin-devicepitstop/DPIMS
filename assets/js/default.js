let database;

window.onload = function(){
  hideAnimation();
  initDatabase();
  preventFormSubmit();

}

function initDatabase(){
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


function hideAnimation() {
  document.getElementById("load-screen").style.display = "none";
}

function preventFormSubmit() {
  if (window.location.href.indexOf("new") !== -1){
    $("#date").val(new Date().toLocaleDateString());
    
    $("form").submit(function (e) {  
      e.preventDefault();
      addStoreStock();
    });	
  }
}

function save(collection, doc, subCollection, subDoc, json) {
    database.collection(collection).doc(doc).collection(subCollection).doc(subDoc).set(json)
    .then(function(){
        console.log("Document successfully written!");
        setURL("/IMS/storestock.html");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        alert("An error occurred while processing your request. Please try again.");
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

function setURL(url) {
  document.location.href = url;
}

function addStoreStock() {
  let name = document.getElementById("first-name").value + " " + document.getElementById("last-name").value;
  let manufacturer = document.getElementById("manufacturer").value;
  let model = document.getElementById("model").value;
  let actions = document.getElementById("actions").value;
  let sku = document.getElementById("sku").value;
  let date = document.getElementById("date").value;
  
  save("devices", manufacturer, model, sku, {tech: name, actions: actions, date: date});
}

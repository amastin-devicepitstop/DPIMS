let database;

window.onload = function(){
  hideAnimation();
  initDatabase();
  preventFormSubmit();
  getPage();

}

// ====================
// ===== FIREBASE =====
// ====================

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

function save(collection, doc, json) {
  database.collection(collection).doc(doc).set(json)
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

function getWhere(collection) {
  database.collection(collection).where("actions", "==", "Cellbie").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
}

function getAll(collection) {
  database.collection(collection).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.data());
    });
});
}

// ===============
// === GENERAL ===
// ===============


function hideAnimation() {
  document.getElementById("load-screen").style.display = "none";
}

function setURL(url) {
  document.location.href = url;
}

function getPage(){
  return location.pathname.split("/").pop();
}

function urlContains(string) {
  return window.location.href.indexOf(string) !== -1
}

// ===================
// = storestock.html =
// ===================


// =======================
// = storestock-new.html =
// =======================

function preventFormSubmit() {
  // Check that the current page is the "New Store Stock" page
  
  if (urlContains("new")) {
    $("#date").val(new Date().toLocaleDateString());
    
    // Prevent form submission
    $("form").submit(function (e) {  
      e.preventDefault();
      addStoreStock();
    });	
  }
}

function addStoreStock() {
  let name = document.getElementById("first-name").value + " " + document.getElementById("last-name").value;
  let manufacturer = document.getElementById("manufacturer").value;
  let model = document.getElementById("model").value;
  let actions = document.getElementById("actions").value;
  let sku = document.getElementById("sku").value;
  let date = document.getElementById("date").value;
  
  //save("devices", manufacturer, model, sku, {tech: name, actions: actions, date: date});
  save("devices", sku, {tech: name, manufacturer: manufacturer, model: model, actions: actions, sku: sku, date: date});
}







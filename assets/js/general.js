let database;  

window.onload = function(){
  hideAnimation();
  initDatabase();
}

// ===============
// === GENERAL ===
// ===============

function showConfirmDialog(message) {
  $("#modal-text").text(message);
  $("#modal").attr('class', 'modal open fade');
  $("#backdrop").attr('class', 'modal-backdrop fade  in open high');
  $("#modal-content").attr('class', 'modal-dialog fade show in open');
}

function closeModal(){
  $("#modal-content").attr('class', 'modal-dialog fade show in closed');
  $("#backdrop").attr('class', 'modal-backdrop fade  in closed high');
  $("#modal").attr('class', 'modal closed');
  setTimeout(function() {
    $("#backdrop").attr('class', 'modal-backdrop fade  in closed low');
  }, 500);  
}

function closeModalNoBackdrop() {
  $("#modal-content").attr('class', 'modal-dialog fade show in closed');
  $("#modal").attr('class', 'modal closed');
}

function showSuccessDialog(message) {
  $(".checkmark__circle").attr('class', 'checkmark__circle');
  $(".checkmark").attr('class', 'checkmark');
  $(".checkmark__check").attr('class', 'checkmark__check');
  $("#modal-text").text(message);
  $("#modal").attr('class', 'modal open fade');
  $("#modal-content").attr('class', 'modal-dialog fade show in open');
  setTimeout(function(){
    closeModalNoBackdrop();
    $(".checkmark__circle").attr('class', 'checkmark__circle wait');
    $(".checkmark").attr('class', 'checkmark wait');
    $(".checkmark__check").attr('class', 'checkmark__check wait');
  }, 2500);
}


function hideAnimation() {
  document.getElementById("load-screen").style.display = "none";
}

function newTab(url) {
  let tab = window.open(url, '_blank');
  tab.focus();
}

function setURL(url) {
  document.location.href = url;
}

function getPage(){
  return location.pathname.split("/").pop();
}

function getModel() {
  let model = window.location.search.replace("?model=", "");
  model = model.split("%20").join(" ");
  model = model.slice(0, model.indexOf("&"));
  return model;
}

function getSKU() {
  let sku = window.location.search;
  sku = sku.slice(sku.indexOf("1"), sku.indexOf("U") + 1);
  return sku;
}

function urlContains(string) {
  return window.location.href.indexOf(string) !== -1
}

function getMonth(date) {
  return date.split("/")[0];  
}

function getDay(date) {
  return date.split("/")[1];  
}

function getYear(date) {
  return date.split("/")[2];  
}

function sortTable(tableID, sortRules) {
  $("#" + tableID).tablesorter(sortRules);
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

function remove(collection, doc) {
  database.collection(collection).doc(doc).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      alert("An error occurred while processing your request. Please try again.");
  });  
}

function removeAll(collection) {
  showConfirmDialog("Do you want to delete all signs in the print queue?");
//   let docs = getAll(collection);
//   setTimeout(function() {
//     for (let i = 0; i < docs.length; i++){
//       remove(collection, docs[i]);
//     }
//   }, 1000);
}

function save(collection, doc, json) {
  console.log(event.target.id);
  database.collection(collection).doc(doc).set(json)
  .then(function(){
        console.log("Document successfully written!");
        if (getPage().indexOf("storestock-new") !== -1){
          setURL("/IMS/storestock.html");
        }
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

function getWhere(collection, field, operator, expected) {
  let array = [];
  database.collection(collection).where(field, operator, expected).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
          array.push(doc.data())
        });
    })
  return array;
}

function getAll(collection) {
  let array = [];
  database.collection(collection).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        array.push(doc.data());
    });
  });
  return array;
}

function merge(collection, doc, json) {
    database.collection(collection).doc(doc).set(json, { merge: true });
}

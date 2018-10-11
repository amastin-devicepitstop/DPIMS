let database;

window.onload = function(){
  hideAnimation();
  initDatabase();
}

// ===============
// === GENERAL ===
// ===============
function showConfirmDialog(message) {
//   let modalScreen = "<div class='modal-open'>";
//   let modalBackdrop = "<div class='modal-backdrop fade  in'></div>";
//   let modal = "<div class='modal fade show in'>";
//   let modalDialog = "<div class='modal-dialog modal-sm'>";
//   let modalContent = "<div class='modal-content'>"
//   let modalBody = "<div class='modal-body'>";
//   let row = "<div class='row'>";
//   let iconContainer = "<div class=''>";
//   let icon = "<i><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='icon icon-xxlg-md attention-circle-bg'><path d='M256 32c30.3 0 59.6 5.9 87.2 17.6 26.7 11.3 50.6 27.4 71.2 48s36.7 44.5 48 71.2c11.7 27.6 17.6 56.9 17.6 87.2s-5.9 59.6-17.6 87.2c-11.3 26.7-27.4 50.6-48 71.2s-44.5 36.7-71.2 48C315.6 474.1 286.3 480 256 480s-59.6-5.9-87.2-17.6c-26.7-11.3-50.6-27.4-71.2-48s-36.7-44.5-48-71.2C37.9 315.6 32 286.3 32 256s5.9-59.6 17.6-87.2c11.3-26.7 27.4-50.6 48-71.2s44.5-36.7 71.2-48C196.4 37.9 225.7 32 256 32m0-32C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0z'></path><circle cx='256' cy='384' r='32'></circle><path d='M256.3 96.3h-.6c-17.5 0-31.7 14.2-31.7 31.7v160c0 17.5 14.2 31.7 31.7 31.7h.6c17.5 0 31.7-14.2 31.7-31.7V128c0-17.5-14.2-31.7-31.7-31.7z'></path></svg></i>"
//   let endDiv = "</div>"
  
//   $("#load-screen").after(modalScreen + modalBackdrop + modal + modalDialog + modalContent + modalBody);
  
//   $("#load-screen").after("</div> <div class='col-md-10 col-sm-10 col-xs-10' style='padding-left: 2px'><p>Do you want to delete the selected contacts?</p> <!----><!----> <div class='alert-actions btn-toolbar'> <button class='btn btn-primary’ type='submit'> OK </button> <button class='btn btn-default ' > Cancel </button></div></div></div></div></div></div></div></div>")  
}

function hideAnimation() {
  document.getElementById("load-screen").style.display = "none";
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
  database.collection(collection).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.data());
    });
});
}

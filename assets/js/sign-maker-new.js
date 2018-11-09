window.onload = function(){
  preventFormSubmit();
  initDatabase();
  autocomplete();
  hideAnimation();
}

function preventFormSubmit() {
  // Check that the current page is the "New Store Stock" page
  
  if (urlContains("sign-maker")) {   
    // Prevent form submission
    $("form").submit(function (e) {  
      e.preventDefault();
      addSign();
      document.getElementById("sign-form").reset();
    });	
  }
}

function inputChange(element) {
  if (element.val() == ""){
    element.attr('class', 'sign-cell sign-value inputComment');
    element.closest("td").attr('class', 'sign-cell');
  }
  
  else{
    element.attr('class', 'sign-cell sign-value sign-comment inputComment');
    element.closest("td").attr('class', 'sign-cell sign-comment');
  }
}

function displayMSRP() {
  let msrp = "ABC"
  if ($(".sign-product").eq(0).val().indexOf("Apple") !== -1) {
    $("#sku-row").html("<td colspan='1' class='sign-cell'><input class='sign-cell sign-value sign-msrp' value=" + msrp + "></td><td colspan='1' class='sign-cell sign-sku'><input class='sign-cell sign-value sign-sku inputSKU' value=" + $(".inputSKU")[0].val() + "></td>");
  }
  else {
    $("#sku-row").html("<td colspan='2' class='sign-cell sign-sku'><input class='sign-cell sign-value sign-sku inputSKU' value=" + $(".inputSKU")[0].val() + "></td>");
  }
}

function styleCarrier(element) {
  if (element.val() == "Unlocked"){
    element.attr('class', 'sign-carrier sign-cell sign-value highlight-yellow');
    element.closest("td").attr('class', 'sign-cell highlight-yellow');
  }
  
  else{
    element.attr('class', 'sign-carrier sign-cell sign-value');
    element.closest("td").attr('class', 'sign-cell');
  }
}

function toQueue() {
  if ($(".card").children().length !== 0 ) {
    let product = $(".sign-product").val();
    let carrier = $(".sign-carrier").val();
    let storage = $(".sign-storage").val();
    let price = $(".sign-price").val();
    let comments = $(".inputComment").val();
    let sku = $(".inputSKU").val();
  
    save("signs", sku, {product: product, carrier: carrier, storage: storage, price: price, comments: comments, sku: sku});
    $(".card").empty();
    showSuccessDialog("Successfully added sign to queue!");
  }
}

function addSign() {
  // Get <input> values
  let manufacturer = $("#manufacturer").val();
  let model = $("#model").val();
  let product = '"' + manufacturer + ' ' + model + '"';
  let carrier = $("#carrier").val();
  let storage = $("#storage").val();
  let price = $("#price").val();
  let comments = '"' + $("#comments").val() + '"';
  let sku = $("#sku").val();
  
  // Create HTML for sign
  let signBegin = "<div class='sign-preview'><div><table><tbody>";
  let logoAndPriceRow = "<tr><td class='dp-logo sign-logo'></td><td class='sign-cell'><input class='sign-price sign-value' value=" + '$' + price + "></td></tr>";
  let manufacturerAndModelRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-product sign-cell sign-value' onchange='displayMSRP()' value=" + product + "></td></tr>";
  let storageRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-storage sign-cell sign-value' value=" + storage + "></input></td></tr>";
  let carrierRow;
  if (carrier == "Unlocked") {
    carrierRow = "<tr><td colspan='2' class='sign-cell highlight-yellow'><input class='sign-carrier sign-cell sign-value highlight-yellow' oninput='styleCarrier($(this))' value=" + carrier + "></td></tr>";
  }
  else {
    carrierRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-carrier sign-cell sign-value' oninput='styleCarrier($(this))' value=" + carrier + "></td></tr>";
  }
  
  let commentsRow;
  let skuRow = "<tr id='sku-row'><td colspan='2' class='sign-cell sign-sku'><input class='sign-cell sign-value sign-sku inputSKU' value=" + sku + "></td></tr>";
  // If the sign has no comments, it should appear as a blank line
  if (comments == "" || comments == '""') {
    commentsRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-cell sign-value inputComment' oninput='inputChange($(this))' value=" + comments + "></td></tr>";
  }
  // If the sign does have comments, it should appear as a yellow line with red text.
  else {
    commentsRow = "<tr><td colspan='2' class='sign-cell sign-comment'><input class='sign-cell sign-value sign-comment inputComment' oninput='inputChange($(this))' value=" + comments + "></td></tr>";
  }
  let signEnd = "</tbody></table></div></div>";
  let sign = signBegin + logoAndPriceRow + manufacturerAndModelRow + storageRow + carrierRow + commentsRow + skuRow + signEnd
  
  $(".card").empty();
  $(".card").append(sign);
  $(".card").toggle();
  setTimeout(function() {
    $(".card").toggle();
  }, 200);
  
  displayMSRP();
}

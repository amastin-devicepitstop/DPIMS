let signs;

window.onload = function(){
  setActiveTab();
  initDatabase();
  loadSigns();
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

function loadSigns() {
  signs = getAll("signs");
  setTimeout(function() {
    for (let i = 0; i < signs.length; i++){
      createSign(signs[i], isOdd(signs.indexOf(signs[i])));
      setupDelete();
    }
    hideAnimation();
  }, 1000);
}             

function createSign(sign, odd) {
  let product = sign.product;
  let carrier = sign.carrier;
  let storage = sign.storage;
  let price = sign.price;
  let comments = sign.comments;
  let sku = sign.sku;
  
  let signBegin = "<div class='sign-preview'><div class='sign-delete'></div><div><table><tbody>";
  let logoAndPriceRow = "<tr><td class='dp-logo sign-logo'></td><td class='sign-cell'><input class='sign-price sign-value' value=" + price + "></td></tr>";
  let manufacturerAndModelRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-product sign-cell sign-value'></td></tr>";
  let storageRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-storage sign-cell sign-value' value=" + storage + "></input></td></tr>";
  let carrierRow;
  if (carrier == "Unlocked") {
    carrierRow = "<tr><td colspan='2' class='sign-cell highlight-yellow'><input class='sign-carrier sign-cell sign-value highlight-yellow' oninput='styleCarrier($(this))' value=" + carrier + "></td></tr>";
  }
  else {
    carrierRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-carrier sign-cell sign-value' oninput='styleCarrier($(this))' value=" + carrier + "></td></tr>";
  }
  let commentsRow;
  // If the sign has no comments, it should appear as a blank line
  let skuRow = "<tr><td colspan='2' class='sign-cell sign-sku'><input class='sign-cell sign-value sign-sku inputSKU' value=" + sku + "></td></tr>";
  // If the sign has no comments, it should appear as a blank line
  if (comments == "" || comments == '""') {
    commentsRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-cell sign-value inputComment' oninput='inputChange($(this))'></td></tr>";
  }
  // If the sign does have comments, it should appear as a yellow line with red text.
  else {
    commentsRow = "<tr><td colspan='2' class='sign-cell sign-comment'><input class='sign-cell sign-value sign-comment inputComment' oninput='inputChange($(this))'></td></tr>";
  }
  let signEnd = "</tbody></table></div></div>";
  let newSign = signBegin + logoAndPriceRow + manufacturerAndModelRow + storageRow + carrierRow + commentsRow + skuRow + signEnd
  
  if (odd) {
    $(".queue-right").append(newSign);
    newSign = $(".queue-right").children().last();
    $(newSign).find(".sign-product").val(product);
    $(newSign).find(".inputComment").val(comments);
  }
  else if (!(odd)){
    $(".queue-left").append(newSign);
    newSign = $(".queue-left").children().last();
    $(newSign).find(".sign-product").val(product);
    $(newSign).find(".inputComment").val(comments);
  }
  else {
    alert("An error occurred while trying to place sign with SKU " + sku + " on the page.");  
  }
}

function deleteSign() {
  closeModal();
  let sku = $(".to-delete").closest(".sign-preview").find(".inputSKU").val();
  console.log(sku);
  $(".to-delete").closest(".sign-preview").remove();
  remove("signs", sku);
}

function keepSign() {
  closeModal();
  $(".to-delete").attr('class', 'sign-delete');
}

function isOdd(num) {
  return (num % 2) == 1;
}

function clearQueue() {
  let sign;
  setTimeout(function() {
    for (let j = 0; j < signs.length; j++){
      sign = signs[j];
      remove("signs", sign.sku);
    }
  }, 1000);
}

function setupDelete() {
  $(".sign-delete").click(function() {
    $(this).attr('class', 'sign-delete to-delete');
    showConfirmDialog("Do you want to delete this sign?");
  });
}

window.onload = function(){
  initDatabase();
  loadSigns();
  hideAnimation();
}

function loadSigns() {
  let signs = getAll("signs");
  setTimeout(function() {
    for (let i = 0; i < signs.length; i++){
      createSign(signs[i], isOdd(signs.indexOf(signs[i])));
    }
  }, 1000);
}
             

function createSign(sign, odd) {
  let product = sign.product;
  let carrier = sign.carrier;
  let storage = sign.storage;
  let price = sign.price;
  let comments = sign.comments;
  let sku = sign.sku;
  
  let signBegin = "<div class='sign-preview'><div><table><tbody>";
  let logoAndPriceRow = "<tr><td class='dp-logo sign-logo'></td><td class='sign-cell'><input class='sign-price sign-value' value=" + price + "></td></tr>";
  let manufacturerAndModelRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-product sign-cell sign-value' value=" + product + "></td></tr>";
  let storageRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-storage sign-cell sign-value' value=" + storage + "></input></td></tr>";
  let carrierRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-carrier sign-cell sign-value' value=" + carrier + "></td></tr>";
  let commentsRow;
  let skuRow;
  // If the sign has no comments, it should appear as a blank line
  if (comments == "") {
    commentsRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-cell sign-value inputComment' oninput='inputChange($(this))' value=" + comments + "></td></tr>";
    skuRow = "<tr><td colspan='2' class='sign-cell sign-sku'><input class='sign-cell sign-value sign-sku inputSKU' value=" + sku + "></td></tr>";
  }
  // If the sign does have comments, it should appear as a yellow line with red text.
  else {
    commentsRow = "<tr><td colspan='2' class='sign-cell sign-comment'><input class='sign-cell sign-value sign-comment inputComment' oninput='inputChange($(this))' value=" + comments + "></td></tr>";
    skuRow = "<tr><td colspan='2' class='sign-cell'><input class='sign-cell sign-value inputSKU' value=" + sku + "></td></tr>";
  }
  let signEnd = "</tbody></table></div></div>";
  let newSign = signBegin + logoAndPriceRow + manufacturerAndModelRow + storageRow + carrierRow + commentsRow + skuRow + signEnd
  
  if (odd) {
    $(".queue-right").append(newSign);
  }
  else {
    $(".queue-left").append(newSign);  
  }
}

function isOdd(num) {
  return num % 2;
}

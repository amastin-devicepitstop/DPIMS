let count = 0;
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
    });	
  }
}

function addSign() {
  let manufacturer = $("#manufacturer").val();
  let model = $("#model").val();
  let carrier = $("#carrier").val();
  let storage = $("#storage").val();
  let price = $("#price").val();
  let comments = $("#comments").val();
  let sku = $("#sku").val();

  let signBegin = "<div class='sign-preview'><div><table><tbody>";
  let logoAndPriceRow = "<tr><td class='dp-logo sign-logo'><input><td class='sign-cell sign-price'>" + '$' + price + "</td></input></tr>";
  let manufacturerAndModelRow = "<tr><td colspan='2' class='sign-cell'>" + manufacturer + " " + model + "</td></tr>";
  let storageRow = "<tr><td colspan='2' class='sign-cell'>" + storage + "</td></tr>";
  let carrierRow = "<tr><td colspan='2' class='sign-cell'>" + carrier + "</td></tr>";
  let commentsRow;
  let skuRow
  if (comments == "") {
    commentsRow = "<tr><td colspan='2' class='sign-cell'>" + ' ' + "</td></tr>";
    skuRow = "<tr><td colspan='2' class='sign-cell sign-sku'>" + sku + "</td></tr>";
  }
  else {
    commentsRow = "<tr><td colspan='2' class='sign-cell sign-comment'>" + comments + "</td></tr>";
    skuRow = "<tr><td colspan='2' class='sign-cell sign-sku-comment'>" + sku + "</td></tr>";
  }
  let signEnd = "</tbody></table></div></div>";
  let sign = signBegin + logoAndPriceRow + manufacturerAndModelRow + storageRow + carrierRow + commentsRow + skuRow + signEnd
  
  count += 1;
  $(".page").append(sign);
  console.log(count);
}

function autocomplete() {
  let manufacturers = ["Acer", "Alienware", "Apple", "ASUS",
                       "BenQ",
                       "Compaq","CyberPowerPC",
                       "Dell",
                       "Gateway",
                       "HP","HTC",
                       "Intel",
                       "Lenovo","LG",
                       "Microsoft", "Motorola", "MSI",
                       "Origin PC",
                       "Panasonic",
                       "Razer",
                       "Samsung",
                       "Toshiba",
                       "Vizio"
                      ];
  
  $("#manufacturer").autocomplete({
    source: manufacturers
  });
  
  let models = ["Elitebook ",
                "Galaxy S4", "Galaxy S4 Active",
                "Galaxy S5", "Galaxy S5 Active",
                "Galaxy S6", "Galaxy S6 Active", "Galaxy S6 Edge", "Galaxy S6 Edge+",
                "Galaxy S7", "Galaxy S7 Edge", "Galaxy S7 Active",
                "Galaxy S8", "Galaxy S8+", "Galaxy S8 Active",
                "Galaxy S9", "Galaxy S9+",
                "iPad (1st Gen)", "iPad (2nd Gen)", "iPad (3rd Gen)",
                "iPad Mini",
                "iPad (4th Gen)",
                "iPad Air",
                "iPad Mini 2",
                "iPad Air 2",
                "iPad Mini 3", "iPad Mini 4",
                "iPad Pro (1st Gen, 12.9 in.)", "iPad Pro (1st Gen, 9.7 in.)", 
                "iPad (2017)",
                "iPad Pro (2nd Gen, 12.9 in.)", "iPad Pro (2nd Gen, 9.7 in.)",
                "iPad (2018)",
                "iPhone 5", "iPhone 5S",
                "iPhone 6", "iPhone 6S", "iPhone 6S Plus", "iPhone SE",
                "iPhone 7", "iPhone 7 Plus",
                "iPhone 8", "iPhone 8 Plus",
                "iPhone X", "iPhone XR", "iPhone XS", "iPhone XS Max",
                "Thinkpad ",
                "XPS "
               ];
  
  $("#model").autocomplete({
    source: models
  });
  
  let carrier = ["AT&T",
                  "Other",
                  "T-Mobile",
                  "Unlocked",
                  "Verizon",
                  "Sprint",
                  "Wi-Fi Only"
                 ];
  
  $("#carrier").autocomplete({
    source: carrier
  });
  
  let storage = ["4GB",
                 "8GB",
                 "16GB",
                 "32GB",
                 "64GB",
                 "128GB",
                 "256GB",
                 "512GB"
                ];
                
  $("#storage").autocomplete({
    source: storage
  });
  
  
}

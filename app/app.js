var cartCount = 0;
var productInfo = {};

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  console.log(hashTag + " " + pageID);

  if (pageID != "" && pageID != "home") {
    $.get(`pages/${pageID}.html`, function (data) {
      console.log("data " + data);
      $("#app").html(data);
      loadCart();
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      console.log("home " + data);
      $("#app").html(data);
      loadBikes();
    });
  }
}

function loadCart() {
  $(".cart").html("");
  $.each(productInfo.Cart, (idx, cartItem) => {
    let bike = productInfo.Products[cartItem.itemIdx];

    $(".cart").append(`<div class="bike">
    <div class="bikeImage">
      <img src="images/${bike.productImage}" alt="Bike One" />
    </div>
    <div class="bikeDetails">
      <h3>${bike.productName}</h3>
      <p>${bike.productShortDesc}</p>
      <p class="price">$${bike.productPrice}</p>
      <div id="${idx}" class="buyNow">Delete</div>
    </div>
  </div>`);
  });
}

function loadBikes() {
  $(".home").html("");

  $.each(productInfo.Products, (idx, bike) => [
    $(".home").append(`<div class="bike">
    <div class="bikeImage">
      <img src="images/${bike.productImage}" alt="Bike One" />
    </div>
    <div class="bikeDetails">
      <h3>${bike.productName}</h3>
      <p>${bike.productShortDesc}</p>
      <p class="price">$${bike.productPrice}</p>
      <div id="${idx}" class="buyNow">Buy Now</div>
    </div>
  </div>`),
  ]);

  $(".buyNow").on("click", (e) => {
    console.log("click");
    let productIdx = e.currentTarget.id;
    let obj = {
      itemIdx: productIdx,
    };

    productInfo.Cart.push(obj);
    console.log(productInfo.Cart);
    cartCount = productInfo.Cart.length;
    updateCartCount();
  });
}

function updateCartCount() {
  if (cartCount == 0) {
    $(".cartCounter").css("display", "none");
  } else if (cartCount >= 1) {
    $(".cartCounter").css("display", "block");
    $(".cartCounter").html(cartCount);
  }
}

function getData() {
  $.get(`data/data.json`, (data) => {
    productInfo = data;
  }).fail(function (error) {
    alert("error ", error);
  });
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();

  updateCartCount();

  getData();
}

$(document).ready(function () {
  initURLListener();
});

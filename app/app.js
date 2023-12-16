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


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW_ti-DqqGWcEG2dAF4k9kNQ7Y-pnf3uo",
  authDomain: "n315-final-jd.firebaseapp.com",
  projectId: "n315-final-jd",
  storageBucket: "n315-final-jd.appspot.com",
  messagingSenderId: "159511963033",
  appId: "1:159511963033:web:98fb7c906b382ff50ddf08",
  measurementId: "G-KR05ZGPNN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
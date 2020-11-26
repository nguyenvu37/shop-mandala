var carts = JSON.parse(localStorage.getItem("carts")) || [];
var iconCart = document.querySelector(".number-cart span");

iconCart.innerHTML = carts.length || 0;

function horizontal() {
  location.assign("grid.html");
}

function vertical() {
  location.assign("list.html");
}

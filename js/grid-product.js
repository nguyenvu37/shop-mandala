var xhr = new XMLHttpRequest();
var dataProducts = [];
var products = document.querySelector(".grid__content__product");

xhr.open(
  "get",
  "https://my-json-server.typicode.com/nguyenvu37/data-mandala-js",
  true
);
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    dataProducts = JSON.parse(xhr.responseText);
    showProduct(dataProducts);
  }
  // cần thêm check server lỗi hoặc server load chậm show thông tin cho người dùng tương tác
};

function showProduct(data) {
  return data.map(function (item, index) {
    return (products.innerHTML += `<div class="grid__content__product__item grid-product${
      index + 1
    }">
        <img src="assets/img/home/${item.img}">
        <div class="grid__content__product__item__info detail-content">
            <h4>${item.manufacturer}</h4>
            <a href="#" onclick="onMoveDetails(${item.id})">
                <p>${item.name}</p>
            </a>
            <span class="price">${item.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                <small>đ</small>
            </span>
            <span class="price old ${item.disable}">
                ${item.oldPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                <small>đ</small>
            </span>
        </div>
        <div class="grid__content__product__item__icon">
            <div class="item-buying">
                <button onclick="addToCart(${index})">MUA HÀNG</button>
                <a href="404-page.html">
                    <i class="fas fa-heart"></i>
                </a>
                <a href="404-page.html">
                    <i class="fas fa-sync-alt"></i>
                </a>
            </div>
        </div>
    </div>`);
  });
}

function addToCart(index) {
  var cartStore = JSON.parse(localStorage.getItem("carts"));
  var cart = dataProducts[index];

  if (cartStore !== null) {
    var indexProduct = cartStore.findIndex(function (item) {
      return item.id === cart.id;
    });

    if (indexProduct !== -1) {
      carts[indexProduct].inCart = parseInt(carts[indexProduct].inCart) + 1;
      alert(
        `Đã thêm 1 sản phẩm vào mặt hàng ${carts[indexProduct].name}-${carts[indexProduct].manufacturer} đã có`
      );
    } else {
      carts.unshift(cart);
      alert("Đã thêm 1 sản phẩm của một mặt hàng mới vào giỏ hàng");
    }
  } else {
    carts.unshift(cart);
    alert("Đã thêm 1 sản phẩm của một mặt hàng mới vào giỏ hàng");
  }

  iconCart.innerHTML = carts.length;
  localStorage.setItem("carts", JSON.stringify(carts));
}

function onMoveDetails(id) {
  var productCart = dataProducts.find(function (item) {
    return item.id === id;
  });

  localStorage.setItem("product", JSON.stringify(productCart));
  location.assign("detail.html");
}

var imgDetail = document.querySelector(".detail__img-bg");
var imgRelated = document.querySelector(".detail__img-involve__related");
var detailInfo = document.querySelector(".detail__info__content");
var productDetail = JSON.parse(localStorage.getItem("product")) || {};

showImgDetail(productDetail);
showImgRelated(productDetail);
showInfoDetail(productDetail);

function showImgDetail(product) {
  return (imgDetail.innerHTML += `<img src="../../assets/img/home/${product.img}">`);
}

function showImgRelated(product) {
  return product.imgDetail.map(function (item) {
    return (imgRelated.innerHTML += `<img class="detail__img-involve--img1" src="../../assets/img/detail/${item}">`);
  });
}

function showInfoDetail(product) {
  var oldPrice = product.oldPrice;
  var classOldPrice = "disable";
  if (oldPrice !== "") {
    classOldPrice = "";
  }
  var optionColors = product.color.map(function (item) {
    return `<option value="${item}">${item}</option>`;
  });
  return (detailInfo.innerHTML += `<h3>${product.name}</h3>
  <div class="detail__info__price detail-price">
  <span>${product.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>
  <small class=${classOldPrice}>${product.oldPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</small></div>
    <p>Không thể phủ nhận, thời trang và phong cách chính là "tuyên ngôn" không lời mạnh mẽ nhất của mỗi người phụ nữ.
    Do đó việc mua sắm thời trang trở thành niềm vui, và có khi là nguồn cảm hứng vô tận để phái đẹp sống vui,
    sống đẹp hơn trong mắt nửa còn lại của thế giới. Để F5 tủ đồ của mình trước xu hướng ngày càng đa dạng hơn trong thế giới thời trang,
    nhiều chị em không ngần ngại chi tiêu "mạnh tay" để sở hữu những món đồ yêu thích.</p>
    <form id="formDataProduct">
        <div class="detail__info__color item-input">
            <label>màu sắc</label>
            <select id="color-product">
                ${optionColors}
            </select>
        </div>
        <div class="detail__info__quantity item-input">
            <label>số lượng</label>
            <input type="number" value=${product.inCart}>
        </div>
        <div class="detail__info__btn item-buying">
            <button type="button" onclick="getDataProduct()">MUA HÀNG</button>
            <a href="#">
                <i class="fas fa-heart"></i>
            </a>
            <a href="#">
                <i class="fas fa-sync-alt"></i>
            </a>
        </div>
    </form>`);
}

function getDataProduct() {
  var colorProduct = document.querySelector("#color-product");
  var quantity = document.querySelector(".detail__info__quantity input");
  var cartStore = JSON.parse(localStorage.getItem("carts"));
  var cart = productDetail;

  if (cartStore !== null) {
    var indexProduct = cartStore.findIndex(function (item) {
      return item.id === cart.id;
    });

    if (indexProduct !== -1) {
      carts[indexProduct].inCart = quantity.value;
      alert(
        `Đã thêm ${quantity.value} sản phẩm vào mặt hàng ${carts[indexProduct].name}-${carts[indexProduct].manufacturer} đã có`
      );
      carts[indexProduct].color = colorProduct.value;
    } else {
      cart.inCart = quantity.value;
      cart.color = colorProduct.value;
      carts.unshift(cart);
      alert(
        `Đã thêm ${quantity.value} sản phẩm của một mặt hàng mới vào giỏ hàng`
      );
    }
  } else {
    cart.inCart = quantity.value;
    cart.color = colorProduct.value;
    carts.unshift(cart);
    alert(
      `Đã thêm ${quantity.value} sản phẩm của một mặt hàng mới vào giỏ hàng`
    );
  }

  iconCart.innerHTML = carts.length;
  localStorage.setItem("carts", JSON.stringify(carts));
  // location.replace("grid.html");
}

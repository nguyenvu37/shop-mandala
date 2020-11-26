var showProductCart = document.querySelector(".cart__content");
var btnPayment = document.querySelector(".cart__content__btn .payment");
var btnBuying = document.querySelector(".cart__content__btn .buying");
var table = document.querySelector(".cart__content__table table");
var valueTotals = document.querySelector(".cart__content__total span");
var process = document.querySelector(".process");
var deleteProductCarts = document.querySelector(".cart__content__btn .delete");

btnPayment.addEventListener("click", payment);
btnBuying.addEventListener("click", buying);
deleteProductCarts.addEventListener("click", deleteAllCart);

showCart(carts);

function showCart(data) {
  var totals = 0;

  if (carts.length === 0) {
    process.innerHTML = "";
    showProductCart.innerHTML = `<div class="cart__content__nothing">
        <h2>Chưa có sản phẩm nào</h2>
        <a href="grid.html">MUA SẮM</a>
    </div>`;
  }
  return data.map(function (item) {
    var total = item.inCart * item.price;

    totals += total;
    valueTotals.innerHTML =
      totals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      "<small>đ</small>";
    localStorage.setItem("totals", JSON.stringify(totals));

    return (table.innerHTML += `<tr>
                                    <td>
                                        <img src="../../assets/img/home/${
                                          item.img
                                        }">
                                    </td>
                                    <td>
                                        ${item.name}
                                    </td>
                                    <td>
                                        <span class="price">
                                            ${item.price
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                "."
                                              )}
                                              <small>đ</small>
                                        </span>
                                    </td>
                                    <td class="num">
                                        <input type="number" value=${
                                          item.inCart
                                        } 
                                        id=${item.id}
                                        class="num-product"
                                        onchange="onChangeQuantity(${
                                          item.id
                                        })">  
                                    </td>
                                    <td>
                                        <span class="price total">
                                            ${total
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                "."
                                              )}
                                            <small>đ</small>
                                        </span>
                                    </td>
                                    <td>
                                        <div class="del-product" onclick="delProductCart(${
                                          item.id
                                        })">
                                            <i class="fas fa-trash-alt"></i>
                                        </div>
                                    </td>
                                    </tr>`);
  });
}

function onChangeQuantity(id) {
  var valueInput = document.querySelectorAll(".num .num-product");
  var valueTotal = document.querySelectorAll(".cart__content__table td .total");
  var updateTotals = 0;

  for (var i = 0; i < valueInput.length; i++) {
    if (valueInput[i].value >= 1) {
      valueTotal[i].innerHTML = (parseInt(valueInput[i].value) * carts[i].price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      valueInput[i].value = 1;
      valueTotal[i].innerHTML = carts[i].price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    updateTotals += parseInt(valueInput[i].value) * carts[i].price;

    valueTotals.innerHTML =
      updateTotals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      "<small>đ</small>";

    carts[i].inCart = valueInput[i].value;
    localStorage.setItem("carts", JSON.stringify(carts));
    localStorage.setItem("totals", JSON.stringify(updateTotals));
  }
}

function delProductCart(id) {
  if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    carts = carts.filter(function (item) {
      return item.id !== id;
    });

    localStorage.setItem("carts", JSON.stringify(carts));
    showCart(carts);
    location.reload();
  }
}

function payment() {
  location.assign("information.html");
}

function buying() {
  location.assign("grid.html");
}

function deleteAllCart() {
  if (window.confirm("Bạn có chắc muốn xóa hết sản phẩm?")) {
    carts = [];
    iconCart.innerHTML = 0;
    localStorage.setItem("carts", JSON.stringify(carts));
    location.reload();
  }
}

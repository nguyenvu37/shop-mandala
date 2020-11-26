var infoReceiver = document.querySelector(".customer-receiver span"),
  infoAdd = document.querySelector(".customer-address span"),
  infoEmail = document.querySelector(".customer-email span"),
  infoPhone = document.querySelector(".customer-phone span");
var tableCustomer = document.querySelector(
  ".payment-complete__content__info__product table"
);
var totalText = document.querySelector(
  ".payment-complete__content__info__product__total .price"
);

var infoCustomer = JSON.parse(localStorage.getItem("information")) || {},
  infoTotals = JSON.parse(localStorage.getItem("totals"));

showCustomer(infoCustomer);
showInforCart(carts);

function showCustomer(data) {
  infoReceiver.innerHTML = data.receiver;
  infoAdd.innerHTML = data.add;
  infoEmail.innerHTML = data.email;
  infoPhone.innerHTML = data.phone;
}

function showInforCart(data) {
  var totals = 0;
  return data.map(function (item) {
    var totalCustomer = item.inCart * item.price;
    totals += totalCustomer;
    totalText.innerHTML =
      totals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      "<small>đ</small>";
    return (tableCustomer.innerHTML += `<tr>
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
                                                <span class="price">
                                                ${item.inCart}
                                                </span> 
                                            </td>
                                            <td>
                                                <span class="price total">
                                                    ${totalCustomer
                                                      .toString()
                                                      .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        "."
                                                      )}
                                                    <small>đ</small>
                                                </span>
                                            </td>
                                        </tr>`);
  });
}

function onBackInforPage() {
  location.href = "information.html";
}

function onCheckout() {
  alert("Thanh toán thành công");
  carts = [];
  infoCustomer = {};
  iconCart.innerHTML = 0;
  localStorage.setItem("carts", JSON.stringify(carts));
  localStorage.setItem("information", JSON.stringify(infoCustomer));
  location.href = "index.html";
}

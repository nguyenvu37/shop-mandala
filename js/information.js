var form = document.getElementById("formCheckout");
var receiver = document.forms["inforForm"]["receiver"];
var email = document.forms["inforForm"]["email"];
var phone = document.forms["inforForm"]["phone"];
var address = document.forms["inforForm"]["address"];
var errReceiver = document.getElementById("err-receiver"),
  errAddress = document.getElementById("err-address"),
  errEmail = document.getElementById("err-email"),
  errPhone = document.getElementById("err-phone");

iconCart.innerHTML = carts.length;

form.addEventListener("submit", function (e) {
  console.log("e", e);
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  var information = {};
  var receiverValue = receiver.value.trim();
  var addressValue = address.value.trim();
  var emailValue = email.value.trim();
  var phoneValue = phone.value.trim();
  var testInput = true;

  if (receiverValue === "") {
    setErrorForm(receiver, "Bạn chưa nhập họ tên khách hàng");
    testInput = false;
  } else {
    setSuccessForm(receiver, "");
  }

  if (addressValue === "") {
    setErrorForm(address, "Bạn chưa nhập địa chỉ");
    testInput = false;
  } else {
    setSuccessForm(address, "");
  }

  if (emailValue === "") {
    setErrorForm(email, "Bạn chưa nhập email");
    testInput = false;
  } else if (!isEmail(emailValue)) {
    testInput = false;
    setErrorForm(email, "Email chưa đúng định dạng");
  } else {
    setSuccessForm(email, "");
  }

  if (phoneValue === "") {
    setErrorForm(phone, "Bạn chưa nhập số điện thoại");
    testInput = false;
  } else if (!isPhone(phoneValue)) {
    testInput = false;
    setErrorForm(phone, "Bạn chưa nhập đúng định dạng số điện thoại");
  } else {
    setSuccessForm(phone, "");
  }

  if (
    receiverValue === "" ||
    addressValue === "" ||
    emailValue === "" ||
    phoneValue === "" ||
    testInput === false
  ) {
    return false;
  } else {
    information = {
      receiver: receiverValue,
      add: addressValue,
      email: emailValue,
      phone: phoneValue,
    };
    localStorage.setItem("information", JSON.stringify(information));
    location.assign("payment.html");
  }
}

function setErrorForm(input, message) {
  const formGroup = input.parentElement;
  var errMessage = formGroup.querySelector(".error-message");

  errMessage.innerHTML = message;
  formGroup.className = "form-group error";
}

function setSuccessForm(input, message) {
  const formGroup = input.parentElement;
  var errMessage = formGroup.querySelector(".error-message");

  errMessage.innerHTML = message;
  formGroup.className = "form-group success";
}

function isEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

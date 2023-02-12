import { createWarning, params } from "./app.js";

// Sign up page logic
const form = document.forms.signUp;

if (params.error === "1") {
  createWarning(
    "signUpError",
    "Email address has already been taken. If this is your account, you can log in instead?",
    form[7]
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const email = form.emailAddress.value;
  const contact = form.contactNumber.value;
  const pwd = form.password.value;
  const confirmPwd = form[7].value;

  // Regex
  const nameRegex = /[a-zA-Z]/;
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const pwdRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  const contactRegex = /^\d{11}$/;

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    createWarning(
      "nameRequired",
      "Please enter a valid first and last name.",
      form.lastName
    );
    return;
  }

  if (!emailRegex.test(email)) {
    createWarning(
      "invalidEmail",
      "Please enter a valid email address.",
      form.emailAddress
    );
    return;
  }

  if (!contactRegex.test(contact)) {
    createWarning(
      "invalidContactNumber",
      "Please enter a valid contact number. An example of valid contact number is 09012345678.",
      form.contactNumber
    );
    return;
  }

  if (pwd.length < 8) {
    createWarning(
      "pwdLength",
      "The password must be at least 8 characters long.",
      form[7]
    );
    return;
  }

  if (!pwdRegex.test(pwd)) {
    createWarning(
      "pwdTest",
      "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      form[7]
    );
    return;
  }

  if (pwd !== confirmPwd) {
    createWarning(
      "confirmPwd",
      "The password and confirm password fields do not match.",
      form[7]
    );
    return;
  }

  // Set user type value
  const userTypeToggle = document.querySelector("#userTypeToggle");
  const userType = document.querySelector("#userType");

  if (userTypeToggle.checked) {
    userType.value = "seller";
  }

  return form.submit();
});

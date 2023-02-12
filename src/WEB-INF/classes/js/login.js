import { createWarning, params } from "./app.js";

// Log in page logic
const form = document.forms.logIn;

// If user is not authenticated
if (params.error === "1") {
  createWarning(
    "unauthorizedUser",
    "Your account and/or password is incorrect, please try again.",
    form.password
  );
}

// Submit login form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const email = form.emailAddress.value;
  const pwd = form.password.value;

  // Regex
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    createWarning(
      "invalidEmail",
      "Please enter a valid email address.",
      form.emailAddress
    );
    return;
  }

  if (!pwd) {
    createWarning(
      "pwdLength",
      "Please provide your correct password.",
      form.password
    );
    return;
  }

  return form.submit();
});

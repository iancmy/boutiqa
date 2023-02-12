import { createWarning, params } from "./app.js";

// Forgot password page logic
const form = document.forms.forgotPassword;

// If user email does not exist
if (params.error === "1") {
  createWarning(
    "userDoesNotExist",
    "This email does not exist.",
    form.emailAddress
  );
}

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const email = form.emailAddress.value;

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

  return form.submit();
});

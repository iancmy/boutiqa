import { createWarning, params } from "./app.js";

// Forgot password page logic
const form = document.forms.resetPassword;

// If user email does not exist
if (params.error === "1") {
  createWarning(
    "samePassword",
    "You entered your old password. Enter a new password.",
    form[2]
  );
} else if (params.error === "2") {
  createWarning(
    "internalError",
    "Internal error occured. Please try again.",
    form[2]
  );
}

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const pwd = form.password.value;
  const confirmPwd = form[1].value;

  // Regex
  const pwdRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (pwd.length < 8) {
    createWarning(
      "pwdLength",
      "The password must be at least 8 characters long.",
      form[2]
    );
    return;
  }

  if (!pwdRegex.test(pwd)) {
    createWarning(
      "pwdTest",
      "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      form[2]
    );
    return;
  }

  if (pwd !== confirmPwd) {
    createWarning(
      "confirmPwd",
      "The password and confirm password fields do not match.",
      form[2]
    );
    return;
  }

  return form.submit();
});

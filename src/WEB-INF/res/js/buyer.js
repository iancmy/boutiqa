import { TabNavigator } from "./TabNavigator.js";
import { createWarning, createSuccess } from "./app.js";

// Init
const tabNavigator = new TabNavigator("profile");

// Profile forms
const profileForm = document.forms.updateProfile;
const shippingAddressForm = document.forms.updateShippingAddress;
const billingAddressForm = document.forms.updateBillingAddress;
const billingAddressCheckbox = billingAddressForm.copyShipping;
const changePasswordForm = document.forms.changePassword;
const billingInputs = document.querySelectorAll(".billing-inputs");

// Init data
fetch(buyerDetailsAPI)
  .then((response) => response.json())
  .then((data) => {
    updateData(data);
  });

function updateData(data) {
  const { userAccount, userDetails, userAddress } = data;
  const { shippingAddress, billingAddress } = userAddress;

  profileForm.firstName.value = userAccount.firstName;
  profileForm.lastName.value = userAccount.lastName;
  profileForm.emailAddress.value = userAccount.emailAddress;
  profileForm.contactNumber.value = userAccount.contactNumber;

  if (shippingAddress) {
    shippingAddressForm.addressLine1.value = shippingAddress.addressLine1;
    shippingAddressForm.addressLine2.value = shippingAddress.addressLine2;
    shippingAddressForm.city.value = shippingAddress.city;
    shippingAddressForm.state.value = shippingAddress.state;
    shippingAddressForm.country.value = shippingAddress.country;
    shippingAddressForm.zipCode.value = shippingAddress.zipCode;
  }

  if (userDetails.shippingAddress === userDetails.billingAddress) {
    if (!billingAddressCheckbox.checked) {
      billingAddressCheckbox.checked = true;
      billingInputs.forEach((input) => {
        input.classList.add("hide-flip-up");
        input.classList.remove("show-flip-down");
        input.addEventListener(
          "animationend",
          (e) => {
            e.target.remove();
          },
          { once: true }
        );
      });
    }
  } else {
    billingAddressForm.addressLine1.value = billingAddress.addressLine1;
    billingAddressForm.addressLine2.value = billingAddress.addressLine2;
    billingAddressForm.city.value = billingAddress.city;
    billingAddressForm.state.value = billingAddress.state;
    billingAddressForm.country.value = billingAddress.country;
    billingAddressForm.zipCode.value = billingAddress.zipCode;
  }
}

// Update profile
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const firstName = profileForm.firstName.value;
  const lastName = profileForm.lastName.value;
  const emailAddress = profileForm.emailAddress.value;
  const contactNumber = profileForm.contactNumber.value;

  // Regex
  const nameRegex = /[a-zA-Z]/;
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const contactRegex = /^\d{11}$/;

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    createWarning(
      "nameRequired",
      "Please enter a valid first and last name.",
      profileForm.lastName
    );
    return;
  }

  if (!emailRegex.test(emailAddress)) {
    createWarning(
      "invalidEmail",
      "Please enter a valid email address.",
      profileForm.emailAddress
    );
    return;
  }

  if (!contactRegex.test(contactNumber)) {
    createWarning(
      "invalidContactNumber",
      "Please enter a valid contact number. An example of valid contact number is 09012345678.",
      profileForm.contactNumber
    );
    return;
  }

  // Prepare form data
  const formData = {
    firstName,
    lastName,
    emailAddress,
    contactNumber,
  };

  // Make POST request to API
  profileForm[4].classList.add("loading");
  fetch(updateProfileAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      profileForm[4].classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your profile. Please try again or refresh the page.",
          profileForm[4]
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess("updateSuccessful", "Update successful!", profileForm[4]);
        fetch(buyerDetailsAPI)
          .then((response) => response.json())
          .then((data) => {
            updateData(data);
          });
      } else {
        createWarning(
          "updateError",
          "Error updating your profile. Please try again or refresh the page.",
          profileForm[4]
        );
      }
    })
    .catch((error) => {
      createWarning(
        "updateError",
        "Error updating your profile. Please try again or refresh the page.",
        profileForm[4]
      );
      console.error(error);
    });
});

// Update shipping address
shippingAddressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const addressLine1 = shippingAddressForm.addressLine1.value;
  const addressLine2 = shippingAddressForm.addressLine2.value;
  const city = shippingAddressForm.city.value;
  const state = shippingAddressForm.state.value;
  const country = shippingAddressForm.country.value;
  const zipCode = shippingAddressForm.zipCode.value;

  if (!addressLine1) {
    createWarning(
      "addressLineRequired",
      "Address line 1 is required.",
      shippingAddressForm.addressLine1
    );
    return;
  }

  if (!city) {
    createWarning(
      "cityRequired",
      "City is required.",
      shippingAddressForm.city
    );
    return;
  }

  if (!state) {
    createWarning(
      "stateRequired",
      "State is required.",
      shippingAddressForm.state
    );
    return;
  }

  if (!country) {
    createWarning(
      "countryRequired",
      "Country is required.",
      shippingAddressForm.country
    );
    return;
  }

  if (!zipCode) {
    createWarning(
      "zipCodeRequired",
      "Zip code is required.",
      shippingAddressForm.zipCode
    );
    return;
  }

  // Prepare form data
  const formData = {
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    zipCode,
  };

  // Make POST request to API
  shippingAddressForm[6].classList.add("loading");
  fetch(updateShippingAddressAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      shippingAddressForm[6].classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your shipping address. Please try again or refresh the page.",
          shippingAddressForm[6]
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess(
          "updateSuccessful",
          "Update successful!",
          shippingAddressForm[6]
        );
        fetch(buyerDetailsAPI)
          .then((response) => response.json())
          .then((data) => {
            updateData(data);
          });
      } else {
        createWarning(
          "updateError",
          "Error updating your shipping address. Please try again or refresh the page.",
          shippingAddressForm[6]
        );
      }
    })
    .catch((error) => {
      createWarning(
        "updateError",
        "Error updating your shipping address. Please try again or refresh the page.",
        shippingAddressForm[6]
      );
      console.error(error);
    });
});

// Update billing address
billingAddressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const addressLine1 = billingAddressForm.addressLine1.value;
  const addressLine2 = billingAddressForm.addressLine2.value;
  const city = billingAddressForm.city.value;
  const state = billingAddressForm.state.value;
  const country = billingAddressForm.country.value;
  const zipCode = billingAddressForm.zipCode.value;

  if (!addressLine1) {
    createWarning(
      "addressLineRequired",
      "Address line 1 is required.",
      billingAddressForm.addressLine1
    );
    return;
  }

  if (!city) {
    createWarning("cityRequired", "City is required.", billingAddressForm.city);
    return;
  }

  if (!state) {
    createWarning(
      "stateRequired",
      "State is required.",
      billingAddressForm.state
    );
    return;
  }

  if (!country) {
    createWarning(
      "countryRequired",
      "Country is required.",
      billingAddressForm.country
    );
    return;
  }

  if (!zipCode) {
    createWarning(
      "zipCodeRequired",
      "Zip code is required.",
      billingAddressForm.zipCode
    );
    return;
  }

  // Prepare form data
  const formData = {
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    zipCode,
  };

  // Make POST request to API
  billingAddressForm[7].classList.add("loading");
  fetch(updateBillingAddressAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      billingAddressForm[7].classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your billing address. Please try again or refresh the page.",
          billingAddressForm[7]
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess(
          "updateSuccessful",
          "Update successful!",
          billingAddressForm[7]
        );
        fetch(buyerDetailsAPI)
          .then((response) => response.json())
          .then((data) => {
            updateData(data);
          });
      } else {
        createWarning(
          "updateError",
          "Error updating your billing address. Please try again or refresh the page.",
          billingAddressForm[7]
        );
      }
    })
    .catch((error) => {
      createWarning(
        "updateError",
        "Error updating your billing address. Please try again or refresh the page.",
        billingAddressForm[7]
      );
      console.error(error);
    });
});

// Listener for same as shipping address checkbox
billingAddressCheckbox.addEventListener("change", (e) => {
  if (billingAddressCheckbox.checked) {
    billingInputs.forEach((input) => {
      input.classList.add("hide-flip-up");
      input.classList.remove("show-flip-down");
      input.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
        },
        { once: true }
      );
    });

    fetch(copyShippingAddressAPI, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful update
          return response.json();
        } else {
          // Handle unsuccessful update
          createWarning(
            "updateError",
            "Error updating your billing address. Please refresh the page.",
            billingAddressForm
          );
          throw new Error("Update failed");
        }
      })
      .then((responseData) => {
        if (responseData.updateSuccessful) {
          createSuccess(
            "updateSuccessful",
            "Update successful!",
            billingAddressForm
          );
          fetch(buyerDetailsAPI)
            .then((response) => response.json())
            .then((data) => {
              updateData(data);
            });
        } else {
          createWarning(
            "updateError",
            "Error updating your billing address. Please refresh the page.",
            billingAddressForm
          );
        }
      })
      .catch((error) => {
        createWarning(
          "updateError",
          "Error updating your billing address. Please refresh the page.",
          billingAddressForm
        );
        console.error(error);
      });
  } else {
    billingInputs.forEach((input) => {
      input.classList.remove("hide-flip-up");
      input.classList.add("show-flip-down");
      billingAddressForm.append(input);
    });
  }
});

// Change password logic
changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const oldPassword = changePasswordForm.oldPassword.value;
  const newPassword = changePasswordForm.newPassword.value;
  const confirmPassword = changePasswordForm.confirmPassword.value;

  const pwdRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!oldPassword) {
    createWarning(
      "oldPwdEmpty",
      "Please provide your old password",
      changePasswordForm.oldPassword
    );
    return;
  }

  if (newPassword.length < 8) {
    createWarning(
      "newPasswordLength",
      "The password must be at least 8 characters long.",
      changePasswordForm.newPassword
    );
    return;
  }

  if (!pwdRegex.test(newPassword)) {
    createWarning(
      "pwdTest",
      "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      changePasswordForm.newPassword
    );
    return;
  }

  if (oldPassword === newPassword) {
    createWarning(
      "samePwd",
      "Your new password cannot be the same as your old password. Change your new password and try again.",
      changePasswordForm.newPassword
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    createWarning(
      "confirmPwd",
      "The password and confirm password fields do not match.",
      changePasswordForm.confirmPassword
    );
    return;
  }

  // Prepare form data
  const formData = {
    password: newPassword,
  };

  // Make POST request to API
  changePasswordForm[3].classList.add("loading");
  fetch(changePasswordAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Old-Password": oldPassword,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      changePasswordForm[3].classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else if (response.status === 403) {
        createWarning(
          "updateError",
          "Incorrect old password. Please try again and enter your old password correctly.",
          changePasswordForm[3]
        );
        throw new Error("Update failed");
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your password. Please try again or refresh the page.",
          changePasswordForm[3]
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess(
          "updateSuccessful",
          "Update successful!",
          changePasswordForm[3]
        );
        fetch(buyerDetailsAPI)
          .then((response) => response.json())
          .then((data) => {
            updateData(data);
          });
        changePasswordForm.reset();
      } else {
        createWarning(
          "updateError",
          "Error updating your password. Please try again or refresh the page.",
          changePasswordForm[3]
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

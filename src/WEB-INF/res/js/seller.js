import { TabNavigator } from "./TabNavigator.js";
import {
  createWarning,
  createSuccess,
  createToast,
  addElement,
  deleteElement,
  stagger,
} from "./app.js";

// Init
const tabNavigator = new TabNavigator("profile");

// Profile forms
const profileForm = document.forms.updateProfile;
const storeAddressForm = document.forms.updateStoreAddress;
const pickUpAddressForm = document.forms.updatePickUpAddress;
const pickUpAddressCheckbox = pickUpAddressForm.copyStoreAddress;
const changePasswordForm = document.forms.changePassword;
const pickUpAddressInputs = document.querySelectorAll(
  ".pick-up-address-inputs"
);
const newProductForm = document.forms.newProduct;
const editProductForm = document.forms.editProduct;

// Init data
fetch(sellerDetailsAPI)
  .then((response) => response.json())
  .then((data) => {
    updateData(data);
  });

fetch(getProductListingAPI)
  .then((response) => response.json())
  .then((data) => {
    updateProductListing(data);
  });

function updateData(data) {
  const { userAccount, userDetails, userAddress } = data;
  const { storeAddress, pickUpAddress } = userAddress;

  profileForm.storeName.value = userDetails.storeName;
  profileForm.firstName.value = userAccount.firstName;
  profileForm.lastName.value = userAccount.lastName;
  profileForm.emailAddress.value = userAccount.emailAddress;
  profileForm.contactNumber.value = userAccount.contactNumber;

  if (storeAddress) {
    storeAddressForm.addressLine1.value = storeAddress.addressLine1;
    storeAddressForm.addressLine2.value = storeAddress.addressLine2;
    storeAddressForm.city.value = storeAddress.city;
    storeAddressForm.state.value = storeAddress.state;
    storeAddressForm.country.value = storeAddress.country;
    storeAddressForm.zipCode.value = storeAddress.zipCode;
  }

  if (userDetails.storeAddress === userDetails.pickUpAddress) {
    if (!pickUpAddressCheckbox.checked) {
      pickUpAddressCheckbox.checked = true;
      pickUpAddressInputs.forEach((input) => {
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
    pickUpAddressForm.addressLine1.value = pickUpAddress.addressLine1;
    pickUpAddressForm.addressLine2.value = pickUpAddress.addressLine2;
    pickUpAddressForm.city.value = pickUpAddress.city;
    pickUpAddressForm.state.value = pickUpAddress.state;
    pickUpAddressForm.country.value = pickUpAddress.country;
    pickUpAddressForm.zipCode.value = pickUpAddress.zipCode;
  }
}

function createProductDiv(product) {
  const productDiv = document.createElement("div");
  productDiv.innerHTML = `
      <input type="checkbox"/>
      <div class="collapse-title text-lg flex gap-4">
        <span class="font-medium italic">${new Date(
          product.productDetails.dateCreated
        ).toLocaleString()}</span> 
        <span class="font-bold text-primary">${
          product.productDetails.productName
        }</span> 
      </div>
      <div class="collapse-content flex flex-col gap-4">
        <div class="flex flex-row gap-4 items-center">
          <p class="flex-1 text-3xl font-bold text-primary">
            <i class="fa-solid fa-peso-sign"></i>
            <span>${product.productDetails.price}</span> 
          </p>
          <a href="#editProduct" class="edit-product btn btn-primary">Edit</a>
          <button class="delete-product swap swap-flip btn btn-error">
            <i class="swap-off fa-solid fa-xmark"></i>
          </button>
        </div>
        <p class="text-xl">${product.productDetails.description}</p> 
        <p class="text-xl">
          <span class="font-bold mr-2">Quantity left:</span>
          <span>${product.productDetails.quantity}</span> 
        </p>
        <p class="text-xl font-bold">
          <span class="mr-2">Categories:</span>
          ${product.productCategories
            .map(
              (category) =>
                `<span class="badge badge-accent">${category}</span>`
            )
            .join("")}
        </p>
      </div>`;

  productDiv.tabIndex = "0";
  productDiv.classList.add(
    "product",
    "collapse",
    "collapse-arrow",
    "border",
    "border-base-300",
    "bg-base-100",
    "rounded-box"
  );
  productDiv.setAttribute("data-productId", product.productDetails.productId);

  return productDiv;
}

function updateProductListing(data) {
  const productListingContainer = document.querySelector("#productListing");
  const { isSuccessful, productListing } = data;

  if (Object.keys(productListing).length === 0) {
    const message = document.createElement("p");
    message.innerHTML = "There's no product";
    message.classList.add(
      "text-center",
      "italic",
      "border",
      "border-base-300",
      "bg-base-100",
      "rounded-box"
    );
    productListingContainer.appendChild(message);
    return;
  }

  if (!isSuccessful) {
    const message = document.createElement("p");
    message.innerHTML = "There's an error loading the products";
    message.classList.add(
      "text-center",
      "text-error",
      "italic",
      "border",
      "border-base-300",
      "bg-base-100",
      "rounded-box"
    );
    productListingContainer.appendChild(message);
    return;
  }

  const productElements = Object.values(productListing)
    .sort((a, b) => b.productDetails.dateCreated - a.productDetails.dateCreated)
    .map((product) => createProductDiv(product));

  stagger(productElements, productListingContainer, "slide-in-top", 0.15);
}

// Update profile
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const storeName = profileForm.storeName.value;
  const firstName = profileForm.firstName.value;
  const lastName = profileForm.lastName.value;
  const emailAddress = profileForm.emailAddress.value;
  const contactNumber = profileForm.contactNumber.value;

  // Regex
  const nameRegex = /[a-zA-Z]/;
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const contactRegex = /^\d{11}$/;

  if (!nameRegex.test(storeName)) {
    createWarning(
      "nameRequired",
      "Please enter a valid store name.",
      profileForm.storeName
    );
    return;
  }

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
    storeName,
    firstName,
    lastName,
    emailAddress,
    contactNumber,
  };

  // Make POST request to API
  profileForm.submit.classList.add("loading");
  fetch(updateProfileAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      profileForm.submit.classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your profile. Please try again or refresh the page.",
          profileForm.submit
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess(
          "updateSuccessful",
          "Update successful!",
          profileForm.submit
        );
        fetch(sellerDetailsAPI)
          .then((response) => response.json())
          .then((data) => {
            updateData(data);
          });
      } else {
        createWarning(
          "updateError",
          "Error updating your profile. Please try again or refresh the page.",
          profileForm.submit
        );
      }
    })
    .catch((error) => {
      createWarning(
        "updateError",
        "Error updating your profile. Please try again or refresh the page.",
        profileForm.submit
      );
      console.error(error);
    });
});

// Update store address
storeAddressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const addressLine1 = storeAddressForm.addressLine1.value;
  const addressLine2 = storeAddressForm.addressLine2.value;
  const city = storeAddressForm.city.value;
  const state = storeAddressForm.state.value;
  const country = storeAddressForm.country.value;
  const zipCode = storeAddressForm.zipCode.value;

  if (!addressLine1) {
    createWarning(
      "addressLineRequired",
      "Address line 1 is required.",
      storeAddressForm.addressLine1
    );
    return;
  }

  if (!city) {
    createWarning("cityRequired", "City is required.", storeAddressForm.city);
    return;
  }

  if (!state) {
    createWarning(
      "stateRequired",
      "State is required.",
      storeAddressForm.state
    );
    return;
  }

  if (!country) {
    createWarning(
      "countryRequired",
      "Country is required.",
      storeAddressForm.country
    );
    return;
  }

  if (!zipCode) {
    createWarning(
      "zipCodeRequired",
      "Zip code is required.",
      storeAddressForm.zipCode
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
  storeAddressForm.submit.classList.add("loading");
  fetch(updateShippingAddressAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      storeAddressForm.submit.classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your store address. Please try again or refresh the page.",
          storeAddressForm.submit
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess(
          "updateSuccessful",
          "Update successful!",
          storeAddressForm.submit
        );
        fetch(sellerDetailsAPI)
          .then((response) => response.json())
          .then((data) => {
            updateData(data);
          });
      } else {
        createWarning(
          "updateError",
          "Error updating your store address. Please try again or refresh the page.",
          storeAddressForm.submit
        );
      }
    })
    .catch((error) => {
      createWarning(
        "updateError",
        "Error updating your store address. Please try again or refresh the page.",
        storeAddressForm.submit
      );
      console.error(error);
    });
});

// Update pick-up address
pickUpAddressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  const addressLine1 = pickUpAddressForm.addressLine1.value;
  const addressLine2 = pickUpAddressForm.addressLine2.value;
  const city = pickUpAddressForm.city.value;
  const state = pickUpAddressForm.state.value;
  const country = pickUpAddressForm.country.value;
  const zipCode = pickUpAddressForm.zipCode.value;

  if (!addressLine1) {
    createWarning(
      "addressLineRequired",
      "Address line 1 is required.",
      pickUpAddressForm.addressLine1
    );
    return;
  }

  if (!city) {
    createWarning("cityRequired", "City is required.", pickUpAddressForm.city);
    return;
  }

  if (!state) {
    createWarning(
      "stateRequired",
      "State is required.",
      pickUpAddressForm.state
    );
    return;
  }

  if (!country) {
    createWarning(
      "countryRequired",
      "Country is required.",
      pickUpAddressForm.country
    );
    return;
  }

  if (!zipCode) {
    createWarning(
      "zipCodeRequired",
      "Zip code is required.",
      pickUpAddressForm.zipCode
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
  pickUpAddressForm.submit.classList.add("loading");
  fetch(updateBillingAddressAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      pickUpAddressForm.submit.classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your pick-up address. Please try again or refresh the page.",
          pickUpAddressForm.submit
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess(
          "updateSuccessful",
          "Update successful!",
          pickUpAddressForm.submit
        );
        fetch(sellerDetailsAPI)
          .then((response) => response.json())
          .then((data) => {
            updateData(data);
          });
      } else {
        createWarning(
          "updateError",
          "Error updating your pick-up address. Please try again or refresh the page.",
          pickUpAddressForm.submit
        );
      }
    })
    .catch((error) => {
      createWarning(
        "updateError",
        "Error updating your pick-up address. Please try again or refresh the page.",
        pickUpAddressForm.submit
      );
      console.error(error);
    });
});

// Listener for same as shipping address checkbox
pickUpAddressCheckbox.addEventListener("change", (e) => {
  if (pickUpAddressCheckbox.checked) {
    pickUpAddressInputs.forEach((input) => {
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

    fetch(copyStoreAddressAPI, {
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
            "Error updating your pick-up address. Please refresh the page.",
            pickUpAddressForm
          );
          throw new Error("Update failed");
        }
      })
      .then((responseData) => {
        if (responseData.updateSuccessful) {
          createSuccess(
            "updateSuccessful",
            "Update successful!",
            pickUpAddressForm
          );
          fetch(sellerDetailsAPI)
            .then((response) => response.json())
            .then((data) => {
              updateData(data);
            });
        } else {
          createWarning(
            "updateError",
            "Error updating your pick-up address. Please refresh the page.",
            pickUpAddressForm
          );
        }
      })
      .catch((error) => {
        createWarning(
          "updateError",
          "Error updating your pick-up address. Please refresh the page.",
          pickUpAddressForm
        );
        console.error(error);
      });
  } else {
    pickUpAddressInputs.forEach((input) => {
      input.classList.remove("hide-flip-up");
      input.classList.add("show-flip-down");
      pickUpAddressForm.append(input);
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
  changePasswordForm.submit.classList.add("loading");
  fetch(changePasswordAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Old-Password": oldPassword,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      changePasswordForm.submit.classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else if (response.status === 403) {
        createWarning(
          "updateError",
          "Incorrect old password. Please try again and enter your old password correctly.",
          changePasswordForm.submit
        );
        throw new Error("Update failed");
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your password. Please try again or refresh the page.",
          changePasswordForm.submit
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess(
          "updateSuccessful",
          "Update successful!",
          changePasswordForm.submit
        );
        fetch(sellerDetailsAPI)
          .then((response) => response.json())
          .then((data) => {
            updateData(data);
          });
        changePasswordForm.reset();
      } else {
        createWarning(
          "updateError",
          "Error updating your password. Please try again or refresh the page.",
          changePasswordForm.submit
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// Add new product
newProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const category = newProductForm.category.value;
  const images = Object.values(newProductForm.images.files);
  const productName = newProductForm.productName.value;
  const description = newProductForm.description.value;
  const price = parseFloat(newProductForm.price.value);
  const quantity = parseInt(newProductForm.quantity.value);

  // Validation
  if (category === "Select category") {
    createWarning(
      "noCategory",
      "No category selected. Select one category appropriate for your product.",
      newProductForm.category
    );
    return;
  }

  if (productName.length < 1) {
    createWarning(
      "nameRequired",
      "Provide a name for your product.",
      newProductForm.productName
    );
    return;
  }

  if (description.length < 1) {
    createWarning(
      "description required",
      "Provide a description for your product.",
      newProductForm.description
    );
    return;
  }

  if (isNaN(price)) {
    createWarning(
      "priceRequired",
      "Set a price for your product.",
      newProductForm.price
    );
    return;
  }

  if (price < 1) {
    createWarning(
      "priceBelowMinimum",
      "Price cannot be below 1. Set a price higher than zero.",
      newProductForm.price
    );
    return;
  }

  if (isNaN(quantity)) {
    createWarning(
      "quantityRequired",
      "Set a quantity for the product you are selling.",
      newProductForm.quantity
    );
    return;
  }

  if (quantity < 1) {
    createWarning(
      "quantityBelowMinimum",
      "Quantity cannot be zero.",
      newProductForm.quantity
    );
    return;
  }

  // Create form data
  const formData = new FormData();
  const product = {
    productName,
    description,
    price,
    quantity,
  };
  const categories = [category];

  formData.append("product", JSON.stringify(product));
  images.forEach((image) => {
    formData.append("images", image);
  });
  formData.append("categories", categories);

  // Save product
  newProductForm.submit.classList.add("loading");
  fetch(saveProductAPI, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      newProductForm.submit.classList.remove("loading");
      if (response.ok) {
        // Handle successful save
        return response.json();
      } else {
        // Handle unsuccessful save
        createWarning(
          "saveError",
          "Error saving your new product. Please try again or refresh the page.",
          newProductForm.submit.parentElement
        );
        throw new Error("Save failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        newProductForm.reset();
        createToast("saveSuccessful", "Save successful!");

        fetch(`${getProductAPI}?id=${responseData.productId}`)
          .then((response) => response.json())
          .then((data) => {
            const productListingContainer =
              document.querySelector("#productListing");
            const newProductEl = createProductDiv(data.product);
            addElement(
              newProductEl,
              productListingContainer,
              "slide-in-top",
              "prepend"
            );
          });
      } else {
        createWarning(
          "updateError",
          "Error saving your new product. Please try again or refresh the page.",
          newProductForm.submit.parentElement
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// Listener for reset newProductForm
newProductForm.addEventListener("reset", (e) => {
  window.location.hash = "#productList";
});

// Edit product
document.addEventListener("click", (e) => {
  const editButton = e.target.closest("div.product a.edit-product");
  const productElement = e.target.closest("div.product:has(a.edit-product)");

  if (editButton) {
    const productId = productElement.dataset.productid;

    editButton.classList.add("loading");
    fetch(`${getProductAPI}?id=${productId}`)
      .then((response) => {
        editButton.classList.remove("loading");
        if (response.ok) {
          // Handle successful get
          return response.json();
        } else {
          // Handle unsuccessful get
          createToast(
            "getError",
            "Error fetching the details of your product. Please try again or refresh the page.",
            "error"
          );
          throw new Error("Get failed");
        }
      })
      .then((responseData) => {
        if (responseData.getSuccessful) {
          const title = editProductForm.parentElement.querySelector("h3");
          const categoryElement = editProductForm.category;
          const productNameElement = editProductForm.productName;
          const descriptionElement = editProductForm.description;
          const priceElement = editProductForm.price;
          const quantityElement = editProductForm.quantity;

          const categories = responseData.product.productCategories;
          const { productId, productName, description, price, quantity } =
            responseData.product.productDetails;

          categories.forEach((category) => {
            [...categoryElement.options].forEach((option) => {
              if (option.text === category) {
                categoryElement.value = option.value;
                return;
              }
            });
          });

          editProductForm.dataset.productid = productId;
          title.textContent = `Edit product: ${productId}`;
          productNameElement.value = productName;
          descriptionElement.value = description;
          priceElement.value = price;
          quantityElement.value = quantity;
        } else {
          createToast(
            "getError",
            "Error fetching the details of your product. Please try again or refresh the page.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

editProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productId = e.target.dataset.productid;
  const category = editProductForm.category.value;
  const productName = editProductForm.productName.value;
  const description = editProductForm.description.value;
  const price = parseFloat(editProductForm.price.value);
  const quantity = parseInt(editProductForm.quantity.value);

  // Validation
  if (category === "Select category") {
    createWarning(
      "noCategory",
      "No category selected. Select one category appropriate for your product.",
      editProductForm.category
    );
    return;
  }

  if (productName.length < 1) {
    createWarning(
      "nameRequired",
      "Provide a name for your product.",
      editProductForm.productName
    );
    return;
  }

  if (description.length < 1) {
    createWarning(
      "description required",
      "Provide a description for your product.",
      editProductForm.description
    );
    return;
  }

  if (isNaN(price)) {
    createWarning(
      "priceRequired",
      "Set a price for your product.",
      editProductForm.price
    );
    return;
  }

  if (price < 1) {
    createWarning(
      "priceBelowMinimum",
      "Price cannot be below 1. Set a price higher than zero.",
      editProductForm.price
    );
    return;
  }

  if (isNaN(quantity)) {
    createWarning(
      "quantityRequired",
      "Set a quantity for the product you are selling.",
      editProductForm.quantity
    );
    return;
  }

  if (quantity < 1) {
    createWarning(
      "quantityBelowMinimum",
      "Quantity cannot be zero.",
      editProductForm.quantity
    );
    return;
  }

  // Create form data
  const formData = new FormData();
  const product = {
    productId,
    productName,
    description,
    price,
    quantity,
  };
  const categories = [category];

  formData.append("product", JSON.stringify(product));
  formData.append("categories", categories);

  // Save product
  editProductForm.submit.classList.add("loading");
  fetch(editProductAPI, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      editProductForm.submit.classList.remove("loading");
      if (response.ok) {
        // Handle successful save
        return response.json();
      } else {
        // Handle unsuccessful save
        createWarning(
          "updateError",
          "Error saving your product. Please try again or refresh the page.",
          editProductForm.submit.parentElement
        );
        throw new Error("Save failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        editProductForm.reset();
        createToast("saveSuccessful", "Save successful!");

        fetch(`${getProductAPI}?id=${productId}`)
          .then((response) => response.json())
          .then((data) => {
            const oldProductEl = document.querySelector(
              `div.product[data-productid='${productId}']`
            );
            const updatedProductEl = createProductDiv(data.product);
            addElement(
              updatedProductEl,
              oldProductEl,
              "slide-in-top",
              "replace",
              "slide-out-right"
            );
          });
      } else {
        createWarning(
          "updateError",
          "Error saving your product. Please try again or refresh the page.",
          editProductForm.submit.parentElement
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// Listener for reset editProductForm
editProductForm.addEventListener("reset", (e) => {
  window.location.hash = "#productList";
});

// Delete product
document.addEventListener("click", (e) => {
  const deleteButtonBefore = e.target.closest(
    "div.product button.delete-product:not(.swap-active)"
  );
  const deleteButton = e.target.closest(
    "div.product button.delete-product.swap-active"
  );
  const productElement = e.target.closest(
    "div.product:has(button.delete-product)"
  );

  if (deleteButtonBefore) {
    const prompt = document.createElement("span");
    prompt.classList.add("swap-on", "font-bold");
    prompt.textContent = "Are you sure?";

    const cancel = document.createElement("button");
    cancel.classList.add("btn", "btn-error");
    cancel.textContent = "Cancel";

    deleteButtonBefore.append(prompt);
    deleteButtonBefore.classList.add("swap-active");

    deleteButtonBefore.parentElement.append(cancel);
    cancel.addEventListener(
      "click",
      (e) => {
        deleteButtonBefore.innerHTML = "";
        const origEl = document.createElement("i");
        origEl.classList.add("swap-off", "fa-solid", "fa-xmark");

        deleteButtonBefore.append(origEl);
        deleteButtonBefore.classList.remove("swap-active");
        e.target.remove();
      },
      { once: true }
    );
  }

  if (deleteButton) {
    const productId = productElement.dataset.productid;
    deleteButton.classList.remove("swap", "swap-flip", "swap-active");
    deleteButton.innerHTML = "<span class='font-bold ml-2'>Deleting...</span>";

    deleteButton.classList.add("loading");
    fetch(deleteProductAPI, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => {
        deleteButton.classList.remove("loading");
        if (response.ok) {
          // Handle successful update
          return response.json();
        } else if (response.status === 401) {
          createToast(
            "unauthorizedUser",
            "Unauthorized user. Please try again or refresh the page.",
            "error"
          );
          throw new Error("Delete failed");
        } else {
          // Handle unsuccessful update
          createToast(
            "deleteError",
            "Error deleting your product. Please try again or refresh the page.",
            "error"
          );
          throw new Error("Update failed");
        }
      })
      .then((responseData) => {
        if (responseData.deleteSuccessful) {
          createToast("deleteSuccessful", "Delete successful!");
          deleteElement(productElement, "slide-out-right");
        } else {
          createToast(
            "deleteError",
            "Error deleting your product. Please try again or refresh the page.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

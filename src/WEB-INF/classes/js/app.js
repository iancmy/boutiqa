let searchDebounce;

function initialize() {
  // Initialize top navigation (Check if user is logged in)
  fetch(isLoggedInUrl)
    .then((response) => response.json())
    .then((data) => {
      const headerProfile = document.querySelector("#headerProfile");
      const headerOrders = document.querySelector("#headerOrders");
      const headerSettings = document.querySelector("#headerSettings");
      const headerLogout = document.querySelector("#headerLogout");
      const headerLogin = document.querySelector("#headerLogin");
      const headerSignup = document.querySelector("#headerSignup");
      const cart = document.querySelector("#cartHeader");

      if (data.isLoggedIn) {
        headerLogin.classList.add("hidden");
        headerSignup.classList.add("hidden");
        headerProfile.classList.remove("hidden");
        headerOrders.classList.remove("hidden");
        headerSettings.classList.remove("hidden");
        headerLogout.classList.remove("hidden");
      } else {
        headerLogin.classList.remove("hidden");
        headerSignup.classList.remove("hidden");
        headerProfile.classList.add("hidden");
        headerOrders.classList.add("hidden");
        headerSettings.classList.add("hidden");
        headerLogout.classList.add("hidden");
      }

      if (data.userType !== "buyer") {
        cart.classList.add("hidden");

        if (data.userType === "admin") {
          headerOrders.classList.add("hidden");
          headerProfile.querySelector("a").textContent = "Admin Dashboard";
          headerProfile
            .querySelector("a")
            .setAttribute("href", "/WDF-Project/account#dashboard");
        }
      } else if (data.userType === "buyer") {
        cart.classList.remove("hidden");

        updateCart();
      }
    });

  // Initialize bottom navigation
  const bottomNavLinks = document.querySelectorAll(".btm-nav-link");

  bottomNavLinks.forEach((link) => {
    const path = link.dataset.path;

    if (
      window.location.pathname.includes(path) ||
      window.location.hash.includes(path)
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Check darkmode
  const darkmode = window.localStorage.getItem("boutiqa-dark-mode");
  const darkModeToggle = document.querySelector("#darkModeToggle");
  const body = document.querySelector("body");

  if (darkmode === "true") {
    body.dataset.theme = "dracula";
    darkModeToggle.checked = true;
  } else {
    body.dataset.theme = "fantasy";
    darkModeToggle.checked = false;
  }
}

// Create warning element for forms
function createWarning(warningID, message, insertAfter) {
  if (document.getElementById(warningID)) {
    document.getElementById(warningID).remove();
  }

  const warningElement = document.createElement("div");
  const container = document.createElement("div");

  const warningMessage = document.createElement("span");
  warningMessage.textContent = message;

  const warningIcon = document.createElement("i");
  warningIcon.classList.add("fa-regular", "fa-circle-xmark");

  container.append(warningIcon, warningMessage);
  warningElement.append(container);
  warningElement.classList.add("alert", "alert-error", "shadow-lg", "warning");
  warningElement.id = warningID;
  insertAfter.insertAdjacentElement("afterend", warningElement);
  warningElement.addEventListener("animationend", (e) => {
    e.target.remove();
  });

  return warningElement;
}

// Create success element for forms
function createSuccess(successID, message, insertAfter) {
  if (document.getElementById(successID)) {
    document.getElementById(successID).remove();
  }

  const successElement = document.createElement("div");
  const container = document.createElement("div");

  const successMessage = document.createElement("span");
  successMessage.textContent = message;

  const successIcon = document.createElement("i");
  successIcon.classList.add("fa-solid", "fa-circle-check");

  container.append(successIcon, successMessage);
  successElement.append(container);
  successElement.classList.add(
    "alert",
    "alert-success",
    "shadow-lg",
    "warning"
  );
  successElement.id = successID;
  insertAfter.insertAdjacentElement("afterend", successElement);
  successElement.addEventListener("animationend", (e) => {
    e.target.remove();
  });

  return successElement;
}

// Stagger element that is dynamically added
function stagger(
  elementArray,
  container,
  animationClass,
  delaySeconds = 0.1,
  type = "append"
) {
  let delay = 0;
  elementArray.forEach((element) => {
    element.classList.add(animationClass);
    element.style.animationDelay = `${delay}s`;
    delay += delaySeconds;

    if (type === "append") {
      container.appendChild(element);
    } else if (type === "prepend") {
      container.prepend(element);
    }

    element.addEventListener("animationend", (e) => {
      e.target.style.animationDelay = "";
    });
  });
}

// Create toast element / notification
function createToast(messageID, message, type = "success") {
  if (document.getElementById(messageID)) {
    document.getElementById(messageID).remove();
  }

  let toastContainer = document.querySelector("#toast");

  if (!toastContainer) {
    const main = document.querySelector("main");
    toastContainer = document.createElement("div");
    toastContainer.classList.add("toast", "toast-end");
    toastContainer.id = "toast";

    main.insertAdjacentElement("afterend", toastContainer);
  }

  const toastElement = document.createElement("div");
  toastElement.classList.add("alert", "toast-element");

  const messageContainer = document.createElement("div");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid");
  const messageEl = document.createElement("span");
  messageEl.textContent = message;

  switch (type) {
    case "success":
      icon.classList.add("fa-circle-check");
      toastElement.classList.add("alert-success");
      break;
    case "error":
      icon.classList.add("fa-circle-xmark");
      toastElement.classList.add("alert-error");
      break;
    case "info":
      icon.classList.add("fa-circle-info");
      toastElement.classList.add("alert-info");
      break;
    case "cart":
      icon.classList.add("fa-cart-plus");
      toastElement.classList.add("alert-success");
      break;
    case "cart-remove":
      icon.classList.add("fa-cart-shopping");
      toastElement.classList.add("alert-error");
      break;
  }

  messageContainer.append(icon, messageEl);
  toastElement.append(messageContainer);
  toastContainer.prepend(toastElement);

  toastElement.addEventListener("animationend", (e) => {
    e.target.remove();
    toastContainer.remove();
  });
}

function addElement(
  element,
  referenceElement,
  animationClass,
  type = "append",
  replaceAnimation = null
) {
  element.classList.add(animationClass);

  element.addEventListener(
    "animationend",
    (e) => {
      e.target.classList.remove(animationClass);
    },
    { once: true }
  );

  if (type === "append") {
    referenceElement.append(element);
  } else if (type === "prepend") {
    referenceElement.prepend(element);
  } else if (type === "insertAfter") {
    referenceElement.insertAdjacentElement("afterend", element);
  } else if (type === "insertBefore") {
    referenceElement.insertAdjacentElement("beforebegin", element);
  } else if (type === "replace") {
    referenceElement.classList.add(replaceAnimation);
    referenceElement.addEventListener("animationend", (e) => {
      e.target.replaceWith(element);
    });
  }
}

function deleteElement(element, animationClass) {
  if (element.classList.contains(animationClass)) {
    element.classList.remove(animationClass);
  }

  element.classList.add(animationClass);

  element.addEventListener("animationend", (e) => {
    e.currentTarget.remove();
  });
}

function createProductCard(productId) {
  return fetch(`${getProductAPI}?id=${productId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
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
        const categories = responseData.product.productCategories;
        let thumbnailPath;
        let thumbnailFileName;

        if (responseData.product.productImages?.length > 0) {
          thumbnailPath = responseData?.product.productImages[0].imagePath;
          thumbnailFileName =
            thumbnailPath.split("/")[thumbnailPath.split("/").length - 1];
        } else {
          thumbnailPath = "/img/product_images/default.jpg";
          thumbnailFileName =
            thumbnailPath.split("/")[thumbnailPath.split("/").length - 1];
        }

        const { productId, productName, price, dateCreated } =
          responseData.product.productDetails;

        const categoriesHTML = categories.map((category) => {
          return `
            <div class="badge badge-outline">${category}</div>
          `;
        });

        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

        const containerElement = document.createElement("div");
        containerElement.dataset.productid = productId;
        containerElement.classList.add(
          "product",
          "card",
          "card-compact",
          "max-w-full",
          "lg:max-w-xs",
          "bg-base-100",
          "shadow-xl",
          "grow",
          "shrink-0"
        );
        containerElement.innerHTML = `
          <figure>
            <img src="/WDF-Project${thumbnailPath}" alt="${thumbnailFileName}" />
          </figure>
          <div class="card-body gap-4">
            <div class="flex items-center gap-2 justify-between">
              <h2 class="card-title text-2xl text-primary font-bold truncate">
                ${productName}
              </h2>
              ${
                new Date(dateCreated) > fiveDaysAgo
                  ? '<span class="badge badge-secondary">NEW</span>'
                  : ""
              }
            </div>
            <div class="card-actions">
                ${categoriesHTML.join("")}
            </div>
            <div class="text-xl font-bold text-accent">
              <i class="fa-solid fa-peso-sign mr-2"></i><span>${price}</span>
            </div>
            <div class="card-actions flex items-center justify-center">
              <button class="add-to-cart btn btn-outline rounded-lg grow shrink-0">
                Add to Cart
              </button>
              <button class="view-product btn btn-primary rounded-lg grow shrink-0">
                View Product
              </button>
            </div>
          </div>
        `;
        return containerElement;
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

  return element;
}

function updateCart() {
  fetch(cartDetailsAPI)
    .then((response) => response.json())
    .then((data) => {
      const { cartSummary } = data;

      const cartBadge = document.querySelector("#cartBadge");
      const cartTotalItems = document.querySelector("#cartTotalItems");
      const cartSubtotal = document.querySelector("#cartSubtotal");

      cartBadge.textContent = cartSummary.totalItems;
      cartTotalItems.textContent = cartSummary.totalItems;
      cartSubtotal.textContent = cartSummary.subTotal;
    });
}

function addToCart(productId, quantity = 1) {
  fetch(isLoggedInUrl)
    .then((res) => res.json())
    .then((data) => {
      if (!data.isLoggedIn) {
        window.location.pathname = "/WDF-Project/login";
        return;
      }
      if (data.userType !== "buyer") {
        createToast(
          "notConsumer",
          "Cannot add to cart. Only consumers can add to their cart.",
          "error"
        );
        return;
      }

      const reqBody = new FormData();
      reqBody.append("productId", productId);
      reqBody.append("quantity", quantity);

      // Add to cart
      fetch(addToCartAPI, {
        method: "POST",
        body: reqBody,
      })
        .then((response) => {
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
              "updateError",
              "Error adding to cart. Please try again or refresh the page.",
              "error"
            );
            throw new Error("Update failed");
          }
        })
        .then((responseData) => {
          if (responseData.updateSuccessful) {
            createToast("updateSuccessful", "Product added to cart!", "cart");
            updateCart();
          } else {
            createToast(
              "updateError",
              "Error adding to cart. Please try again or refresh the page.",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

// Store request params
const requestParams = new URLSearchParams(window.location.search);
const params = {};

for (const [key, value] of requestParams) {
  params[key] = value;
}

initialize();

document.addEventListener("click", (e) => {
  const addToCartButton = e.target.closest("div.product button.add-to-cart");
  const viewProductButton = e.target.closest("div.product button.view-product");

  if (viewProductButton) {
    const productId = e.target.closest("div.product").dataset.productid;

    window.location.pathname = `/WDF-Project/product/${productId}`;
  }

  if (addToCartButton) {
    const productId = e.target.closest("div.product").dataset.productid;

    addToCart(productId);
  }
});

// Search products
const searchProductsElement = document.querySelector("#searchProducts");
searchProductsElement.addEventListener("input", handleSearch);
searchProductsElement.addEventListener("focusout", () => {
  setTimeout(() => {
    const searchSuggestionsElement =
      document.querySelector("#searchSuggestions");
    searchSuggestionsElement.parentElement.classList.add("hidden");
    searchSuggestionsElement.innerHTML = "";
  }, 350);
});

function handleSearch(e) {
  const userInput = e.target.value;
  const searchSuggestionsElement = document.querySelector("#searchSuggestions");
  searchSuggestionsElement.parentElement.classList.add("hidden");
  searchSuggestionsElement.innerHTML = "";

  if (searchDebounce) {
    clearTimeout(searchDebounce);
  }

  searchDebounce = setTimeout(() => {
    fetch(`${searchProductAPI}?search=${userInput}`)
      .then((response) => response.json())
      .then((data) => {
        const searchResults = data.products;

        if (!searchResults.length) {
          const noSuggestions = document.createElement("li");
          noSuggestions.classList.add("p-4");
          const message = document.createElement("span");
          message.classList.add("truncate", "w-full", "text-center", "text-lg");

          message.textContent = "Sorry, we couldn't find any results";
          noSuggestions.append(message);
          searchSuggestionsElement.append(noSuggestions);

          searchSuggestionsElement.parentElement.classList.remove("hidden");
          return;
        }

        searchResults.forEach((product) => {
          const suggestionElement = document.createElement("li");
          const suggestionLink = document.createElement("a");
          suggestionElement.classList.add("p-1");
          suggestionLink.classList.add(
            "truncate",
            "btn",
            "btn-ghost",
            "w-full",
            "justify-start",
            "text-lg"
          );
          suggestionLink.href = `/WDF-Project/product/${product.productId}`;
          suggestionLink.textContent = product.productName;

          suggestionElement.append(suggestionLink);
          searchSuggestionsElement.append(suggestionElement);
        });

        searchSuggestionsElement.parentElement.classList.remove("hidden");
      });
  }, 300);
}

// Dark Mode
const darkModeToggle = document.querySelector("#darkModeToggle");
darkModeToggle.addEventListener("change", (e) => {
  const body = document.querySelector("body");

  if (e.target.checked) {
    body.dataset.theme = "dracula";
    window.localStorage.setItem("boutiqa-dark-mode", "true");
  } else {
    body.dataset.theme = "fantasy";
    window.localStorage.setItem("boutiqa-dark-mode", "false");
  }
});

// Exports
export {
  createWarning,
  createSuccess,
  createToast,
  addElement,
  deleteElement,
  createProductCard,
  stagger,
  updateCart,
  addToCart,
  params,
};

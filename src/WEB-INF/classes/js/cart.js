import {
  createWarning,
  createSuccess,
  createToast,
  addElement,
  deleteElement,
  updateCart,
  stagger,
} from "./app.js";

const cartItems = document.querySelector("#cartItems");

// Initialize cart items
function initialize() {
  cartItems.innerHTML = "";
  fetch(cartDetailsAPI)
    .then((res) => res.json())
    .then((data) => {
      const cartProducts = data.cartProducts;

      if (!cartProducts?.length) {
        const cartProductsHTML = document.createElement("h3");
        cartProductsHTML.classList.add(
          "font-bold",
          "text-primary",
          "text-lg",
          "self-center"
        );
        cartProductsHTML.textContent = "There are no items in your cart yet.";

        addElement(cartProductsHTML, cartItems, "fade-in-top", "append");
        return;
      }

      const cartProductsHTML = cartProducts.map((product) =>
        createItemDiv(product)
      );

      stagger(cartProductsHTML, cartItems, "fade-in-top", 0.05, "prepend");
    });
}

function createItemDiv(product) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("flex", "flex-row", "gap-2");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.dataset.productid = product.ProductId;
  checkbox.classList.add(
    "select-product",
    "checkbox",
    "border-2",
    "border-secondary",
    "mt-4"
  );

  const itemDiv = document.createElement("div");
  itemDiv.innerHTML = `
      <input type="checkbox"/>
      <div class="collapse-title flex gap-4 items-center">
        <p class="font-bold text-xl flex-1 max-h-12 overflow-hidden">${product.ProductName}</p> 
        <p class="font-bold text-primary text-xl">
          <i class="fa-solid fa-peso-sign"></i>
          <span class="product-price">${product.Price}</span>
        </p>
      </div>
      <div class="collapse-content flex flex-col gap-4">
        <progress class="progress progress-success w-full self-center"></progress>
        <img src="" class="product-img w-full object-cover rounded-xl hidden">
        <div class="product-categories flex flex-row gap-2 hidden">

        </div>
        <p class="product-description text-md hidden"></p>
        <div class="flex flex-row gap-4 hidden">
          <button data-productid='${product.ProductId}' class="delete-item btn btn-error rounded-xl flex-1">Remove</button>
          <button
            class="minus-quantity btn btn-primary btn-square rounded-xl"
            data-productid='${product.ProductId}'
          >
            <i class="fa-solid fa-minus pointer-events-none"></i>
          </button>
          <input
            type="number"
            placeholder="1"
            class="quantity-input input input-bordered w-fit"
            value="${product.Quantity}"
            min="1"
            max="${product.MaxQuantity}"
          />
          <button
            class="add-quantity btn btn-primary btn-square rounded-xl mb-4"
            data-productid='${product.ProductId}'
          >
            <i class="fa-solid fa-plus pointer-events-none"></i>
          </button>
        </div>
      </div>`;
  itemDiv.tabIndex = "0";
  itemDiv.classList.add(
    "item",
    "collapse",
    "collapse-arrow",
    "border",
    "border-base-300",
    "bg-base-100",
    "rounded-box",
    "w-full"
  );
  itemDiv.setAttribute("data-productid", product.ProductId);

  itemContainer.append(checkbox);
  itemContainer.append(itemDiv);

  return itemContainer;
}

function updateTotals() {
  const checkboxes = document.querySelectorAll(
    "#cartItems input[type='checkbox']:is(.select-product)"
  );

  fetch(cartDetailsAPI)
    .then((res) => res.json())
    .then((data) => {
      const cartProducts = data.cartProducts;
      const totalSelectedElement = document.querySelector(
        "#totalSelectedItems"
      );
      const selectedSubtotalElement =
        document.querySelector("#selectedSubtotal");
      let totalSelected = 0;
      let selectedSubtotal = 0;

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          const productId = checkbox.dataset.productid;
          const { Price, Quantity } = cartProducts.find(
            (product) => product.ProductId === productId
          );

          totalSelected += 1;
          selectedSubtotal += parseFloat(Price) * parseInt(Quantity);
        }
      });

      totalSelectedElement.textContent = totalSelected;
      selectedSubtotalElement.textContent = selectedSubtotal;
    });
}

// View cart item
document.addEventListener("click", (e) => {
  const dropdownClicked = e.target.closest("div.item input[type='checkbox']");

  if (dropdownClicked) {
    const itemDiv = e.target.closest("div.item");
    const productId = itemDiv.dataset.productid;
    const loading = itemDiv.querySelector("progress");
    const imageContainer = itemDiv.querySelector(".product-img");
    const categoriesContainer = itemDiv.querySelector(".product-categories");
    // <div class="badge badge-primary font-bold">Gadgets</div>
    const descriptionContainer = itemDiv.querySelector(".product-description");
    const quantityInput = itemDiv.querySelector(".quantity-input");

    fetch(`${getProductAPI}?id=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        loading.classList.add("hidden");

        imageContainer.classList.remove("hidden");
        categoriesContainer.classList.remove("hidden");
        descriptionContainer.classList.remove("hidden");
        quantityInput.parentElement.classList.remove("hidden");

        const {
          productCategories,
          productImages,
          productDetails: { description, quantity },
        } = data.product;

        const categoriesHTML = [];
        productCategories.forEach((category) => {
          const categoryDiv = `<div class="badge badge-primary font-bold">${category}</div>`;

          categoriesHTML.push(categoryDiv);
        });

        categoriesContainer.innerHTML = categoriesHTML.join("");

        if (!productImages.length) {
          imageContainer.setAttribute(
            "src",
            "/WDF-Project/img/product_images/default.jpg"
          );
        } else {
          imageContainer.setAttribute(
            "src",
            `/WDF-Project${productImages[0].imagePath}`
          );
        }

        descriptionContainer.textContent = description;
        quantityInput.setAttribute("max", quantity);
      });
  }
});

// Add and subtract quantity
document.addEventListener("click", (e) => {
  const minusQuantity = e.target.closest("div.item button.minus-quantity");
  const addQuantity = e.target.closest("div.item button.add-quantity");

  if (e.target === minusQuantity) {
    const quantityInput =
      minusQuantity.parentElement.querySelector(".quantity-input");
    const productId = minusQuantity.dataset.productid;

    if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }

    const reqBody = new FormData();
    reqBody.append("productId", productId);
    reqBody.append("quantity", parseInt(quantityInput.value));

    // Update cart item
    fetch(updateCartItemAPI, {
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
            "Error updating cart item. Please try again or refresh the page.",
            "error"
          );
          throw new Error("Update failed");
        }
      })
      .then((responseData) => {
        if (responseData.updateSuccessful) {
          updateCart();
          updateTotals();
        } else {
          createToast(
            "updateError",
            "Error updating cart item. Please try again or refresh the page.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (e.target === addQuantity) {
    const quantityInput =
      addQuantity.parentElement.querySelector(".quantity-input");
    const productId = addQuantity.dataset.productid;

    if (
      parseInt(quantityInput.value) <
      parseInt(quantityInput.getAttribute("max"))
    ) {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    }

    const reqBody = new FormData();
    reqBody.append("productId", productId);
    reqBody.append("quantity", parseInt(quantityInput.value));

    // Update cart item
    fetch(updateCartItemAPI, {
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
            "Error updating cart item. Please try again or refresh the page.",
            "error"
          );
          throw new Error("Update failed");
        }
      })
      .then((responseData) => {
        if (responseData.updateSuccessful) {
          updateCart();
          updateTotals();
        } else {
          createToast(
            "updateError",
            "Error updating cart item. Please try again or refresh the page.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

// Delete item
document.addEventListener("click", (e) => {
  const deleteButton = e.target.closest("div.item button.delete-item");

  if (deleteButton) {
    const productId = deleteButton.dataset.productid;

    fetch(`${deleteCartItemAPI}?productId=${productId}`, { method: "DELETE" })
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
            "Error deleting cart item. Please try again or refresh the page.",
            "error"
          );
          throw new Error("Update failed");
        }
      })
      .then((responseData) => {
        if (responseData.deleteSuccessful) {
          createToast(
            "deleteSuccessful",
            "Product deleted from cart!",
            "cart-remove"
          );
          updateCart();
          initialize();
          updateTotals();
        } else {
          createToast(
            "updateError",
            "Error deleting cart item. Please try again or refresh the page.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

// Checkbox tick listener
document.addEventListener("change", (e) => {
  const checkbox = e.target.closest(
    "#cartItems input[type='checkbox']:is(.select-product)"
  );

  if (checkbox) {
    updateTotals();
  }
});

// Initialize
initialize();
updateTotals();

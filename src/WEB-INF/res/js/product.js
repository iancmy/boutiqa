import { addToCart, updateCart } from "./app.js";

const minusQuantity = document.querySelector("#minusQuantity");
const quantityInput = document.querySelector("#quantityInput");
const addQuantity = document.querySelector("#addQuantity");
const addToCartButton = document.querySelector("#addToCart");
const buyNowButton = document.querySelector("#buyNow");

minusQuantity.addEventListener("click", () => {
  if (parseInt(quantityInput.value) > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});

addQuantity.addEventListener("click", () => {
  if (
    parseInt(quantityInput.value) < parseInt(quantityInput.getAttribute("max"))
  ) {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  }
});

addToCartButton.addEventListener("click", (e) => {
  const productId = e.target.dataset.productid;

  addToCart(productId, parseInt(quantityInput.value));
  updateCart();
});

import { createProductCard, addElement } from "./app.js";

fetch(getLatestProductsAPI)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      createToast(
        "getError",
        "Error fetching the details of products. Please try again or refresh the page.",
        "error"
      );
      throw new Error("Get failed");
    }
  })
  .then((responseData) => {
    if (responseData.getSuccessful) {
      const latestProducts = responseData.latestProducts;
      const container = document.querySelector("#latestProducts");

      latestProducts.forEach((product) => {
        createProductCard(product.productId).then((product) => {
          addElement(product, container, "fade-in-top");
        });
      });
    } else {
      createToast(
        "getError",
        "Error fetching the details of products. Please try again or refresh the page.",
        "error"
      );
    }
  })
  .catch((error) => {
    console.error(error);
  });

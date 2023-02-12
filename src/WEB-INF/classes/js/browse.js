import { params, createProductCard, addElement } from "./app.js";

const searchQuery = params.search;
const category = params.category;
const query = {
  category: `category=${encodeURIComponent(category)}`,
  search: `search=${searchQuery}`,
};

if (!params.search) {
  const resultsTitle = document.querySelector("#resultsTitle");
  resultsTitle.textContent = "Product list";
  query.search = "";
}

if (!params.category) {
  query.category = "";
}

function initialize(query) {
  fetch(`${searchProductAPI}?${Object.values(query).join("&")}`)
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
        const allProducts = responseData.products;
        const container = document.querySelector("#productList");

        if (allProducts?.length < 1) {
          const noResult = document.createElement("h2");
          noResult.classList.add(
            "text-3xl",
            "font-bold",
            "self-center",
            "text-center",
            "w-full"
          );
          noResult.textContent = "Sorry, there are no result for that query.";

          container.innerHTML = "";
          addElement(noResult, container, "fade-in-top", "append");
          return;
        }

        container.innerHTML = "";
        allProducts.forEach((product) => {
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
}

function selectCategoryPill() {
  const categoryPillsElements = document.querySelectorAll("div.category");

  const requestParams = new URLSearchParams(window.location.search);
  const params = {};

  for (const [key, value] of requestParams) {
    params[key] = value;
  }

  const category = params.category;

  if (!params.category) {
    categoryPillsElements.forEach((categoryPill, i) => {
      if (i === 0) {
        categoryPill.classList.remove("btn-outline");
      } else {
        categoryPill.classList.add("btn-outline");
      }
    });
    return;
  }

  categoryPillsElements.forEach((categoryPill) => {
    if (category === categoryPill.dataset.categoryname) {
      categoryPill.classList.remove("btn-outline");
    } else {
      categoryPill.classList.add("btn-outline");
    }
  });
}

document.addEventListener("click", (e) => {
  const categoryPill = e.target.closest("div div.category");

  if (categoryPill) {
    const category = categoryPill.dataset.categoryname;

    if (!category) {
      query.category = "";

      // Change the url
      // Get the current URL
      const currentUrl = new URL(window.location.href);

      // Get the search parameters
      const searchParams = new URLSearchParams(currentUrl.search);

      // Change the value of a specific parameter
      searchParams.delete("category");

      // Update the search property of the current URL
      currentUrl.search = searchParams.toString();

      // Update the browser's address bar
      window.history.pushState({}, "", currentUrl.href);

      initialize(query);
      selectCategoryPill();
      return;
    }

    query.category = `category=${encodeURIComponent(category)}`;

    // Change the url
    // Get the current URL
    const currentUrl = new URL(window.location.href);

    // Get the search parameters
    const searchParams = new URLSearchParams(currentUrl.search);

    // Change the value of a specific parameter
    searchParams.set("category", category);

    // Update the search property of the current URL
    currentUrl.search = searchParams.toString();

    // Update the browser's address bar
    window.history.pushState({}, "", currentUrl.href);

    initialize(query);
    selectCategoryPill();
  }
});

initialize(query);
selectCategoryPill();

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" isELIgnored="false" %> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="productCategories" value="${product.productCategories}" />
<c:set var="productImages" value="${product.productImages}" />
<c:set var="productDetails" value="${product.productDetails}" />

<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>View Product</title>

    <!-- CSS -->

    <!-- JS -->
    <script type="module" src="<%=contextPath%>/js/product.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div class="hero min-h-screen-50 mb-4 relative">
        <div class="carousel w-full z-0 absolute inset-0">
          <c:if test="${empty productImages}">
            <div id="slide1" class="carousel-item relative w-full">
              <img
                src="<%=contextPath%>/img/product_images/default.jpg"
                class="w-full object-cover"
              />
              <div
                class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
              >
                <a class="btn btn-circle"
                  ><i class="fa-solid fa-chevron-left"></i
                ></a>
                <a class="btn btn-circle"
                  ><i class="fa-solid fa-chevron-right"></i
                ></a>
              </div>
            </div>
          </c:if>
          <c:if test="${not empty productImages}">
            <c:forEach
              items="${productImages}"
              var="productImage"
              varStatus="status"
            >
              <div
                id="slide${status.index + 1}"
                class="carousel-item relative w-full"
              >
                <img
                  src="<%=contextPath %>${productImage.imagePath}"
                  class="w-full object-cover"
                />
                <div
                  class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
                >
                  <c:if test="${status.first}">
                    <a href="#slide${status.count}" class="btn btn-circle">
                      <i class="fa-solid fa-chevron-left"></i>
                    </a>
                  </c:if>
                  <c:if
                    test="${!status.first && !status.last && status.count > 1}"
                  >
                    <a href="#slide${status.index}" class="btn btn-circle">
                      <i class="fa-solid fa-chevron-left"></i>
                    </a>
                  </c:if>
                  <c:if test="${status.last && status.count > 1}">
                    <a href="#slide1" class="btn btn-circle">
                      <i class="fa-solid fa-chevron-left"></i>
                    </a>
                  </c:if>
                  <c:if test="${status.last}">
                    <a href="#slide1" class="btn btn-circle">
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                  </c:if>
                  <c:if test="${!status.last}">
                    <a href="#slide${status.index + 2}" class="btn btn-circle">
                      <i class="fa-solid fa-chevron-right"></i>
                    </a>
                  </c:if>
                </div>
              </div>
            </c:forEach>
          </c:if>
        </div>
      </div>
      <div class="flex flex-col w-9/12 lg:w-1/2 2xl:w-1/3 mb-4">
        <h2 class="text-xl lg:text-3xl mb-4 font-bold">
          ${productDetails.productName}
        </h2>
        <div class="mb-4">
          <c:forEach
            items="${productCategories}"
            var="category"
            varStatus="status"
          >
            <div class="badge badge-primary font-bold">${category}</div>
          </c:forEach>
        </div>
        <h3
          class="text-xl lg:text-3xl mb-4 py-4 px-8 font-bold bg-accent text-accent-content rounded-full w-fit"
        >
          <i class="fa-solid fa-peso-sign"></i> ${productDetails.price}
        </h3>
        <p class="text-md lg:text-xl mb-4 p-4 font-bold bg-base-200 rounded-xl">
          ${productDetails.description}
        </p>
        <h4 class="text-md lg:text-xl font-bold mb-4">Quantity</h4>
        <div class="flex flex-row gap-4">
          <button
            id="minusQuantity"
            class="btn btn-primary btn-square rounded-xl"
          >
            <i class="fa-solid fa-minus"></i>
          </button>
          <input
            id="quantityInput"
            type="number"
            placeholder="1"
            class="input input-bordered w-fit"
            value="1"
            min="1"
            max="${productDetails.quantity}"
          />
          <button
            id="addQuantity"
            class="btn btn-primary btn-square rounded-xl mb-4"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="flex flex-row justify-between items-center gap-4">
          <button
            id="addToCart"
            data-productid="${productDetails.productId}"
            class="btn btn-outline btn-primary grow"
          >
            Add to Cart
          </button>
          <button
            id="buyNow"
            data-productid="${productDetails.productId}"
            class="btn btn-accent grow"
          >
            Buy now
          </button>
        </div>
      </div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

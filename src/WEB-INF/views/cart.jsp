<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Account | boutiqa</title>

    <!-- CSS -->

    <!-- JS -->
    <script>
      const deleteCartItemAPI = "<%=contextPath %>/api/deleteCartItem";
      const updateCartItemAPI = "<%=contextPath %>/api/updateCartItem";
    </script>
    <script type="module" src="<%=contextPath %>/js/cart.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div
        class="hero min-h-screen-50 mb-4"
        style="background-image: url('<%=contextPath %>/img/cart.jpg')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl">
            <h1 class="my-5 text-5xl font-bold">Cart</h1>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-9/12 lg:w-1/2 2xl:w-1/3 mb-5">
        <div class="flex flex-row gap-2 items-center">
          <h2 class="text-primary text-3xl font-bold flex-1">Cart Items</h2>
          <div>
            <h3 class="text-secondary text-xl font-bold">
              Total Selected Items:
              <span id="totalSelectedItems" class="text-primary">0</span>
            </h3>
            <h3 class="text-secondary text-xl font-bold">
              Subtotal:
              <i class="fa-solid fa-peso-sign"></i>
              <span id="selectedSubtotal" class="text-primary">0</span>
            </h3>
          </div>
        </div>
        <div class="divider m-0"></div>
        <div id="cartItems" class="flex flex-col gap-4 mt-2"></div>
      </div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

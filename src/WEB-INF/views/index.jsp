<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Home | boutiqa</title>

    <!-- CSS -->

    <!-- JS -->
    <script>
      const getLatestProductsAPI = "<%=contextPath %>/api/getLatestProducts";
    </script>
    <script type="module" src="<%=contextPath %>/js/index.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center justify-center min-h-screen">
      <div
        class="hero min-h-screen mb-4"
        style="background-image: url('<%=contextPath %>/img/hero.jpg')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">Welcome to boutiqa!</h1>
            <p class="mb-5">
              <span class="font-bold">Shop unique, shop boutiqa:</span>
              Your one-stop destination for unique and hard-to-find products.
            </p>
            <a href="<%=contextPath %>/browse" class="btn btn-primary"
              >Browse products</a
            >
            <a
              href="<%=contextPath %>/signup"
              class="btn btn-accent text-primary-focus"
              >Sign up</a
            >
          </div>
        </div>
      </div>
      <h2 class="text-3xl self-start ml-4 font-bold">Categories</h2>
      <div class="flex flex-wrap my-4 px-4 gap-2 w-full">
        <a
          href="<%=contextPath %>/browse?category=Men%27s%20Apparel"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/mensapparel.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Men's Apparel</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Gadgets"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/gadgets.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Gadgets</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Home%20%26%20Living"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/homeandliving.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Home & Living</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Groceries"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/groceries.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Groceries</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Toys"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/toys.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Toys</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Women%27s%20Apparel"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/womensapparel.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Women's Apparel</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Personal%20Care"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/personalcare.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Personal Care</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Sports%20%26%20Travel"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/sports.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Sports & Travel</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Gaming"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/gaming.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Gaming</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Audio"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/audio.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Audio</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Stationery"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/stationery.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Stationery</span
          >
        </a>
        <a
          href="<%=contextPath %>/browse?category=Pet%20Care"
          class="btn btn-square grow shrink-0 h-40 w-40 border-0 bg-[url('<%=contextPath %>/img/categories/petcare.jpg')] bg-cover"
        >
          <span
            class="flex items-center justify-center text-center text-2xl text-primary rounded-xl h-full w-full font-bold drop-shadow-sm bg-neutral-content bg-opacity-30 backdrop-blur-[1px]"
            >Pet Care</span
          >
        </a>
      </div>
      <h2 class="text-3xl self-start ml-4 font-bold">Latest Products</h2>
      <div
        id="latestProducts"
        class="flex flex-wrap my-4 px-4 gap-2 w-full lg:w-6/7 justify-center"
      ></div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

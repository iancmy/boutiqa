<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %> <%@ taglib prefix="spring"
uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Browse | boutiqa</title>

    <!-- CSS -->

    <!-- JS -->
    <script type="module" src="<%=contextPath %>/js/browse.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen items-center">
      <div
        class="hero min-h-screen-50 mb-4"
        style="background-image: url('<%=contextPath %>/img/browse.jpg')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl">
            <h1 class="my-5 text-5xl font-bold">Browse</h1>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center w-full">
        <h2 id="resultsTitle" class="flex-1 text-xl lg:text-3xl ml-4 font-bold">
          Search results for: <%=request.getParameter("search")%>
        </h2>
        <label for="browseFilter" class="btn btn-circle btn-ghost">
          <i class="fa-solid fa-filter"></i>
        </label>
        <button class="btn btn-circle btn-ghost">
          <i class="fa-solid fa-arrow-down-wide-short"></i>
        </button>
      </div>
      <input type="checkbox" id="browseFilter" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-2xl">Filter options</h3>
          <div class="divider m-0"></div>
          <div class="modal-action flex flex-row gap-2">
            <label for="browseFilter" class="btn btn-error">Cancel</label>
            <label for="browseFilter" class="btn btn-primary">Update</label>
          </div>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="flex gap-2 w-full overflow-x-scroll p-3">
        <div class="category btn btn-xs rounded-full btn-primary btn-outline">
          All
        </div>
        <div
          data-categoryname="Men's Apparel"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Men's Apparel
        </div>
        <div
          data-categoryname="Gadgets"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Gadgets
        </div>
        <div
          data-categoryname="Home & Living"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Home & Living
        </div>
        <div
          data-categoryname="Groceries"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Groceries
        </div>
        <div
          data-categoryname="Toys"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Toys
        </div>
        <div
          data-categoryname="Women's Apparel"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Women's Apparel
        </div>
        <div
          data-categoryname="Personal Care"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Personal Care
        </div>
        <div
          data-categoryname="Sports & Travel"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Sports & Travel
        </div>
        <div
          data-categoryname="Gaming"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Gaming
        </div>
        <div
          data-categoryname="Audio"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Audio
        </div>
        <div
          data-categoryname="Stationery"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Stationery
        </div>
        <div
          data-categoryname="Pet Care"
          class="category btn btn-xs rounded-full btn-primary btn-outline"
        >
          Pet Care
        </div>
      </div>
      <div
        id="productList"
        class="flex flex-wrap my-4 px-4 gap-2 w-full lg:w-6/7 justify-center"
      ></div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

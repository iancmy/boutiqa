<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Registration successful</title>

    <!-- CSS -->

    <!-- JS -->
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div
        class="hero min-h-screen"
        style="background-image: url('<%=contextPath %>/img/signup.jpg')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl bg-base-100 bg-opacity-70 p-5 rounded-xl">
            <h1 class="my-5 text-5xl font-bold text-primary">
              Registration successful!
            </h1>
            <h2 class="my-5 text-2xl text-neutral">
              Thank you for joining boutiqa,
              <span class="font-bold"
                ><%= request.getAttribute("firstName") %> <%=
                request.getAttribute("lastName") %></span
              >! Hope you have a wonderful shopping experience!
            </h2>
            <p class="text-neutral mb-4">
              Looking for products?
              <a href="<%=contextPath %>/browse" class="link link-neutral"
                >Browse here!</a
              >
            </p>
            <p class="text-neutral mb-4">
              Ready to shop?
              <a href="<%=contextPath %>/login" class="link link-neutral"
                >Log in here!</a
              >
            </p>
          </div>
        </div>
      </div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

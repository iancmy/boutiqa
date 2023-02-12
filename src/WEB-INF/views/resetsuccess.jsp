<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %> <%@ taglib prefix="spring"
uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Successful reset</title>

    <!-- CSS -->

    <!-- JS -->
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div
        class="hero min-h-screen"
        style="background-image: url('<spring:url value='/img/reset.jpg'/>')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl bg-base-100 bg-opacity-70 p-5 rounded-xl">
            <h1 class="my-5 text-5xl font-bold text-primary">
              Reset successful!
            </h1>
            <h2 class="my-5 text-2xl text-neutral">
              Your password have been changed.
            </h2>
            <p class="text-neutral mb-4">
              Ready to shop?
              <a href="<spring:url value='/login'/>" class="link link-neutral"
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

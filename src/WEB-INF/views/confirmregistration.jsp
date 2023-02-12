<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Confirm registration</title>

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
          <div class="max-w-xl">
            <h1 class="my-5 text-5xl font-bold">Confirm your registration</h1>
            <h2 class="my-5 text-2xl">
              We have sent a registration code to your email
              <span class="font-bold"
                >(<%= request.getAttribute("emailAddress") %>)</span
              >. Make sure to check the spam folder.
            </h2>
            <div class="bg-base-100 bg-opacity-70 p-5 rounded-xl">
              <form
                class="flex flex-col"
                action="<%=contextPath %>/registersuccess"
                method="post"
                name="registersuccess"
              >
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Enter registration code here</span>
                  </label>
                  <input
                    type="number"
                    name="signUpCode"
                    placeholder="1234"
                    class="input input-bordered w-full"
                  />
                </div>
                <input
                  type="submit"
                  value="Confirm registration"
                  class="btn btn-primary btn-outline my-5 drop-shadow-md"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Forgot password</title>

    <!-- CSS -->

    <!-- JS -->
    <script type="module" src="<%=contextPath %>/js/forgot.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div
        class="hero min-h-screen"
        style="background-image: url('<%=contextPath %>/img/forgot.JPG')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl">
            <h1 class="my-5 text-5xl font-bold">Reset your password</h1>
            <h2 class="my-5 text-2xl">
              Enter your account's email address to reset your password.
            </h2>
            <div class="bg-base-100 bg-opacity-70 p-5 rounded-xl">
              <form
                class="flex flex-col"
                action="<%=contextPath %>/confirmreset"
                method="post"
                name="forgotPassword"
              >
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Email address</span>
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    placeholder="Email address"
                    class="input input-bordered w-full"
                  />
                </div>
                <input
                  type="submit"
                  value="Reset your password"
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

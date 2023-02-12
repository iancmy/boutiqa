<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Log In | boutiqa</title>

    <!-- CSS -->

    <!-- JS -->
    <script type="module" src="<%=contextPath %>/js/login.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div
        class="hero min-h-screen"
        style="background-image: url('<%=contextPath %>/img/login.jpg')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl">
            <h1 class="my-5 text-5xl font-bold">Log in to your account</h1>
            <div class="bg-base-100 bg-opacity-70 p-5 rounded-xl">
              <form
                class="flex flex-col"
                action="<%=contextPath %>/login"
                method="post"
                name="logIn"
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
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    class="input input-bordered w-full"
                  />
                </div>
                <input
                  type="submit"
                  value="log in"
                  class="btn btn-primary btn-outline my-5 drop-shadow-md"
                />
              </form>
              <a href="<%=contextPath %>/forgot" class="link link-neutral"
                >Forgot your password?</a
              >
              <p class="text-neutral">
                Doesn't have an account yet?
                <a href="<%=contextPath %>/signup" class="link link-neutral"
                  >Sign up here!</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

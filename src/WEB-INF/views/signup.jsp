<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="head.jsp"%>

    <title>Sign Up | boutiqa</title>

    <!-- CSS -->

    <!-- JS -->
    <script type="module" src="<%=contextPath %>/js/signup.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div
        class="hero min-h-screen-50 mb-4"
        style="background-image: url('<%=contextPath %>/img/signup.jpg')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl">
            <h1 class="my-5 text-5xl font-bold">Sign up to boutiqa!</h1>
          </div>
        </div>
      </div>
      <form
        class="flex flex-col w-9/12 lg:w-1/2 2xl:w-1/3"
        action="<%=contextPath %>/signup"
        method="post"
        name="signUp"
      >
        <div class="form-control w-full self-center">
          <div class="label">
            <span class="label-text text-xl text-accent font-bold"
              >User type:</span
            >
            <label class="flex gap-x-3 label cursor-pointer">
              <span class="label-text text-xl text-secondary font-medium"
                >Buyer</span
              >
              <input id="userTypeToggle" type="checkbox" class="toggle" />
              <input
                id="userType"
                type="hidden"
                name="userType"
                value="buyer"
              />
              <span class="label-text text-xl text-secondary font-medium"
                >Seller</span
              >
            </label>
          </div>
        </div>
        <div class="form-control w-full self-center drop-shadow-md">
          <label class="label">
            <span class="label-text">What is your first name?</span>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full self-center drop-shadow-md">
          <label class="label">
            <span class="label-text">What is your last name?</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full self-center drop-shadow-md">
          <label class="label">
            <span class="label-text">What is your email address?</span>
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
            <span class="label-text">Provide your contact number</span>
          </label>
          <input
            type="tel"
            name="contactNumber"
            placeholder="09012345678"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full self-center drop-shadow-md">
          <label class="label">
            <span class="label-text">Create a password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full self-center drop-shadow-md">
          <label class="label">
            <span class="label-text">Confirm your password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            class="input input-bordered w-full"
          />
        </div>

        <input
          type="submit"
          value="sign up"
          class="btn btn-success my-5 drop-shadow-md"
        />
      </form>
      <p class="text-neutral mb-4">
        Already have an account?
        <a href="<%=contextPath %>/login" class="link link-neutral"
          >Log in here!</a
        >
      </p>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

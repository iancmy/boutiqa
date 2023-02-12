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
      const getAllUsersAPI = "<%=contextPath %>/api/getAllUsers";
      const getUserAPI = "<%=contextPath %>/api/getUser";
      const saveUserAPI = "<%=contextPath %>/api/saveUser";
      const deleteUserAPI = "<%=contextPath %>/api/deleteUser";
    </script>
    <script type="module" src="<%=contextPath %>/js/admin.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div
        class="hero min-h-screen-50 mb-4"
        style="background-image: url('<%=contextPath %>/img/buyer.jpg')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl">
            <h1 class="my-5 text-5xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-9/12 lg:w-1/2 2xl:w-1/3 mb-5 gap-4">
        <div class="tabs tabs-boxed self-start mb-5">
          <a href="#dashboard" class="tab">Manage users</a>
          <a href="#settings" class="tab">Settings</a>
        </div>
        <div id="dashboard" class="flex flex-col gap-4">
          <div class="overflow-x-auto">
            <div id="usersList" class="flex flex-col gap-4"></div>
          </div>
        </div>
        <div id="settings" class="flex flex-col gap-4">
          <form
            class="p-5 rounded-xl bg-base-100 drop-shadow-xl"
            action="<%=contextPath %>/changePassword"
            method="post"
            name="changePassword"
          >
            <div class="form-control w-full self-center">
              <div class="label">
                <p class="label-text text-xl text-primary font-bold">
                  Change password
                </p>
              </div>
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">Enter your old password</span>
              </label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">Create a new password</span>
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">Confirm your new password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                class="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              class="btn btn-success my-5 drop-shadow-md w-full"
            >
              Change password
            </button>
          </form>
        </div>
      </div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

<header id="navTop">
  <div
    class="navbar rounded-b-lg z-50 text-primary-content drop-shadow-lg fixed justify-center transition-all"
  >
    <div class="flex-1 ml-2">
      <a
        href="<%= contextPath %>/home"
        class="btn btn-ghost normal-case text-xl px-0 ml-2"
      >
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 768 992.53"
          width="2em"
          height="2em"
          preserveAspectRatio="xMidYMid"
        >
          <path
            d="M154.67,339.82s2-294.2,184.56-322.14S486.88,307.94,486.88,307.94"
            transform="translate(0 -3.35)"
            fill="none"
            stroke="#6e0b75"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="25.17"
          />
          <path
            d="M688.12,340.2C694,593.7,741.62,802,766.75,895.6c6.59,24.52-13.84,47.72-39,44.61-199.7-24.67-399.87,25.3-493.35,54.06-24.83,7.64-49.16-13-45.85-38.73,26.94-209.72,17.3-502.76,12.78-604.5a35.67,35.67,0,0,1,34.92-37.24l415.51-8.48A35.7,35.7,0,0,1,688.12,340.2Z"
            transform="translate(0 -3.35)"
            fill="#6e0b75"
          />
          <path
            d="M166,963.88c37.57-245.52,27.8-506.18,22.18-603.18a29.77,29.77,0,0,0-36.73-27.17,174.61,174.61,0,0,1-56.82,3.83,29.69,29.69,0,0,0-32.37,29.35c-.83,86-8.36,312.64-61.31,523.55a29.79,29.79,0,0,0,13.91,33l106.81,61.89A29.76,29.76,0,0,0,166,963.88Z"
            transform="translate(0 -3.35)"
            fill="#007ebd"
          />
          <path
            d="M290.58,380.09S154.67,37.81,398,19.35,601,381.77,601,381.77"
            transform="translate(0 -3.35)"
            fill="none"
            stroke="#007ebd"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="25.17"
          />
          <path
            d="M497,476c33.08-.45,57.66,6.67,74.06,21.23q24.35,21.63,26,64.53.92,22.88-9.75,40.61t-32.82,28.53c-14.87,7.2-33.56,11.44-56.19,12.72l1.06-22.44A184.11,184.11,0,0,1,536,623.51a135.24,135.24,0,0,1,39.56,12.59,84.78,84.78,0,0,1,31.72,27.2Q619.92,681,621,709.66q1.23,31.46-8.4,52.31t-26.34,33.54a117.45,117.45,0,0,1-36.54,18.78A200.79,200.79,0,0,1,511,822.35L379.75,835.74q-14.21,1.44-24.31-6.41a27.32,27.32,0,0,1-10.86-21.08l-16-297.95a28.75,28.75,0,0,1,8.67-23q9.36-9.3,23.92-9.5Zm-6.71,59.52-95.11,2.73,6.69-8.41,4.62,92.47L399.77,618l95.64-4.63a42.1,42.1,0,0,0,26.38-10.7q11.34-9.91,10.56-27.7-.92-21.27-12.35-30.62T490.32,535.51Zm10.32,136.24-96.23,6.1,4.67-4.35,5.3,106.09-5.62-4.53,99.75-8.74Q532,764.27,545,751.2t12-36.72q-.93-21.84-10.38-31a38.52,38.52,0,0,0-22.33-10.81A126.48,126.48,0,0,0,500.64,671.75Z"
            transform="translate(0 -3.35)"
            fill="#fff"
          />
        </svg>
        <span class="ml-2">boutiqa</span>
      </a>
    </div>
    <div class="form-control">
      <label class="label cursor-pointer mx-4">
        <span class="font-bold mr-2">Dark mode</span>
        <input
          id="darkModeToggle"
          type="checkbox"
          class="toggle toggle-primary"
        />
      </label>
    </div>
    <form
      class="form-control flex-row gap-2"
      action="<%=contextPath %>/browse"
      method="get"
    >
      <input
        id="searchProducts"
        type="text"
        name="search"
        placeholder="Search products"
        class="input input-bordered input-ghost hidden lg:block"
      />
      <button type="submit" class="btn btn-ghost hidden lg:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-5 w-5"
          fill="currentColor"
        >
          <path
            d="M10,19.91a10,10,0,1,1,10-9.95A10,10,0,0,1,10,19.91ZM10,1.53A8.43,8.43,0,1,0,18.38,10,8.44,8.44,0,0,0,10,1.53Z"
          />
          <path
            d="M23.23,24a.76.76,0,0,1-.54-.22L15.91,17A.77.77,0,1,1,17,15.91l6.78,6.78a.79.79,0,0,1,0,1.09A.77.77,0,0,1,23.23,24Z"
          />
        </svg>
      </button>
      <div
        class="hidden w-96 absolute border-2 rounded-xl bg-base-100 top-full mt-2"
      >
        <ul
          id="searchSuggestions"
          class="flex flex-col max-h-96 overflow-y-scroll"
        ></ul>
      </div>
    </form>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal">
        <li>
          <a href="<%=contextPath %>/browse" class="btn btn-ghost rounded-lg"
            >Browse</a
          >
        </li>
      </ul>
    </div>

    <div class="flex-none">
      <div class="dropdown dropdown-end dropdown-hover">
        <label
          tabindex="0"
          id="cartHeader"
          class="btn btn-ghost btn-circle hidden"
        >
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19.25,23.5a3.25,3.25,0,1,1,3.25-3.25A3.26,3.26,0,0,1,19.25,23.5Zm0-5A1.75,1.75,0,1,0,21,20.25,1.76,1.76,0,0,0,19.25,18.5Z"
              />
              <path
                d="M9.25,23.5a3.25,3.25,0,1,1,3.25-3.25A3.26,3.26,0,0,1,9.25,23.5Zm0-5A1.75,1.75,0,1,0,11,20.25,1.76,1.76,0,0,0,9.25,18.5Z"
              />
              <path
                d="M18.25,18.5H10.13a3.74,3.74,0,0,1-3.65-2.89l-2-8.67v0L3.16,1.5H.75A.76.76,0,0,1,0,.75.76.76,0,0,1,.75,0h3a.75.75,0,0,1,.73.58L5.76,6h17a.78.78,0,0,1,.58.27.75.75,0,0,1,.16.61l-1.55,8.54A3.75,3.75,0,0,1,18.25,18.5ZM6.11,7.5l1.83,7.77A2.24,2.24,0,0,0,10.13,17h8.12a2.25,2.25,0,0,0,2.21-1.85L21.85,7.5Z"
              />
            </svg>
            <span id="cartBadge" class="badge badge-sm indicator-item"></span>
          </div>
        </label>
        <div
          tabindex="0"
          class="card card-compact dropdown-content w-52 bg-base-100 shadow-xl"
        >
          <div class="card-body">
            <p class="font-bold text-lg text-primary">
              <span id="cartTotalItems"></span> Items
            </p>
            <p class="text-success font-bold">
              Subtotal: <i class="fa-solid fa-peso-sign mx-2"></i
              ><span id="cartSubtotal"></span>
            </p>
            <div class="card-actions">
              <a href="<%=contextPath %>/cart" class="btn btn-primary btn-block"
                >View cart</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end dropdown-hover">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              style="transform: scale(0.5)"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M22.21,24H1.79A1.79,1.79,0,0,1,0,22.21,12,12,0,0,1,7.87,10.94a.77.77,0,1,1,.53,1.44,10.5,10.5,0,0,0-6.87,9.83.26.26,0,0,0,.26.26H22.21a.26.26,0,0,0,.26-.26,10.5,10.5,0,0,0-6.88-9.83.77.77,0,1,1,.53-1.44A12,12,0,0,1,24,22.21,1.79,1.79,0,0,1,22.21,24Z"
              />
              <path
                d="M12,13.79a6.9,6.9,0,1,1,6.89-6.9A6.91,6.91,0,0,1,12,13.79ZM12,1.53a5.37,5.37,0,1,0,5.36,5.36A5.37,5.37,0,0,0,12,1.53Z"
              />
            </svg>
          </div>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52"
        >
          <li id="headerProfile">
            <a href="<%=contextPath %>/account#profile">Profile</a>
          </li>
          <li id="headerOrders">
            <a href="<%=contextPath %>/account#orders">Orders</a>
          </li>
          <li id="headerSettings">
            <a href="<%=contextPath %>/account#settings">Settings</a>
          </li>
          <li id="headerLogout">
            <a href="<%=contextPath %>/logout">Log out</a>
          </li>
          <li id="headerLogin">
            <a href="<%=contextPath %>/login">Log in</a>
          </li>
          <li id="headerSignup">
            <a href="<%=contextPath %>/signup">Sign up</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</header>

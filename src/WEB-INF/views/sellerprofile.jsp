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
      const sellerDetailsAPI = "<%=contextPath %>/api/sellerDetails";
      const updateShippingAddressAPI =
        "<%=contextPath %>/api/updateStoreAddress";
      const updateBillingAddressAPI =
        "<%=contextPath %>/api/updatePickupAddress";
      const copyStoreAddressAPI = "<%=contextPath %>/api/copyStoreAddress";
      const getProductListingAPI = "<%=contextPath %>/api/getProductListing";
      const saveProductAPI = "<%=contextPath %>/api/saveProduct";
      const editProductAPI = "<%=contextPath %>/api/editProduct";
      const deleteProductAPI = "<%=contextPath %>/api/deleteProduct";
    </script>
    <script type="module" src="<%=contextPath %>/js/seller.js"></script>
  </head>
  <body data-theme="fantasy">
    <%@ include file="header.jsp"%>
    <main class="flex flex-col items-center min-h-screen">
      <div
        class="hero min-h-screen-50 mb-4"
        style="background-image: url('<%=contextPath %>/img/seller.jpg')"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-xl">
            <h1 class="my-5 text-5xl font-bold">Account</h1>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-9/12 lg:w-1/2 2xl:w-1/3 mb-5">
        <div class="tabs tabs-boxed self-start mb-5">
          <a href="#profile" class="tab">Profile</a>
          <a href="#orders" class="tab">Orders</a>
          <a href="#settings" class="tab">Settings</a>
          <a href="#productList" class="tab">Product Listing</a>
        </div>
        <div id="profile" class="flex flex-col gap-4">
          <form
            class="p-5 rounded-xl bg-base-100 drop-shadow-xl"
            action="<%=contextPath %>/updateProfile"
            method="post"
            name="updateProfile"
          >
            <div class="form-control w-full self-center">
              <div class="label">
                <p class="label-text text-xl text-accent">
                  User type:<span class="text-primary font-bold ml-3"
                    >Seller</span
                  >
                </p>
              </div>
              <input type="hidden" name="userType" value="buyer" />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">Store name</span>
              </label>
              <input
                type="text"
                name="storeName"
                placeholder="Store name"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">First name</span>
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
                <span class="label-text">Last name</span>
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
                <span class="label-text">Contact number</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                placeholder="09012345678"
                class="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              name="submit"
              class="btn btn-success my-5 drop-shadow-md w-full"
            >
              Update profile
            </button>
          </form>
          <form
            class="p-5 rounded-xl bg-base-100 drop-shadow-xl"
            action="<%=contextPath %>/updateStoreAddress"
            method="post"
            name="updateStoreAddress"
          >
            <div class="form-control w-full self-center">
              <div class="label">
                <p class="label-text text-xl text-primary font-bold">
                  Store Address
                </p>
              </div>
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">Address Line 1</span>
              </label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">Address Line 2</span>
              </label>
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">City</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">State or Province</span>
              </label>
              <input
                type="text"
                name="state"
                placeholder="State or Province"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">Country</span>
              </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full self-center drop-shadow-md">
              <label class="label">
                <span class="label-text">Zip Code</span>
              </label>
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                class="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              name="submit"
              class="btn btn-success my-5 drop-shadow-md w-full"
            >
              Update Store Address
            </button>
          </form>
          <form
            class="p-5 rounded-xl bg-base-100 drop-shadow-xl"
            action="<%=contextPath %>/updatePickUpAddress"
            method="post"
            name="updatePickUpAddress"
          >
            <div class="form-control w-full self-center">
              <div class="label">
                <p class="label-text text-xl text-primary font-bold">
                  Pick-up Address
                </p>
              </div>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Same as Store Address</span>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  name="copyStoreAddress"
                />
              </label>
            </div>
            <div
              class="form-control w-full self-center drop-shadow-md pick-up-address-inputs"
            >
              <label class="label">
                <span class="label-text">Address Line 1</span>
              </label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                class="input input-bordered w-full"
              />
            </div>
            <div
              class="form-control w-full self-center drop-shadow-md pick-up-address-inputs"
            >
              <label class="label">
                <span class="label-text">Address Line 2</span>
              </label>
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                class="input input-bordered w-full"
              />
            </div>
            <div
              class="form-control w-full self-center drop-shadow-md pick-up-address-inputs"
            >
              <label class="label">
                <span class="label-text">City</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                class="input input-bordered w-full"
              />
            </div>
            <div
              class="form-control w-full self-center drop-shadow-md pick-up-address-inputs"
            >
              <label class="label">
                <span class="label-text">State or Province</span>
              </label>
              <input
                type="text"
                name="state"
                placeholder="State or Province"
                class="input input-bordered w-full"
              />
            </div>
            <div
              class="form-control w-full self-center drop-shadow-md pick-up-address-inputs"
            >
              <label class="label">
                <span class="label-text">Country</span>
              </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                class="input input-bordered w-full"
              />
            </div>
            <div
              class="form-control w-full self-center drop-shadow-md pick-up-address-inputs"
            >
              <label class="label">
                <span class="label-text">Zip Code</span>
              </label>
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                class="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              name="submit"
              class="btn btn-success my-5 drop-shadow-md w-full pick-up-address-inputs"
            >
              Update Pick-up Address
            </button>
          </form>
        </div>
        <div class="flex-col gap-2" id="orders">
          <h2 class="text-md italic">
            This is a static sample data. Orders are not yet implemented.
          </h2>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Items</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023-03-04 17:30:31</td>
                  <td>20</td>
                  <td class="font-bold">
                    <i class="fa-solid fa-peso-sign mr-4"></i>28,842
                  </td>
                  <td>Completed</td>
                  <td><a class="btn btn-primary">View</a></td>
                </tr>
                <tr>
                  <td>2023-03-04 17:30:31</td>
                  <td>20</td>
                  <td class="font-bold">
                    <i class="fa-solid fa-peso-sign mr-4"></i>28,842
                  </td>
                  <td>Completed</td>
                  <td><a class="btn btn-primary">View</a></td>
                </tr>
                <tr>
                  <td>2023-03-04 17:30:31</td>
                  <td>20</td>
                  <td class="font-bold">
                    <i class="fa-solid fa-peso-sign mr-4"></i>28,842
                  </td>
                  <td>Completed</td>
                  <td><a class="btn btn-primary">View</a></td>
                </tr>
                <tr>
                  <td>2023-03-04 17:30:31</td>
                  <td>20</td>
                  <td class="font-bold">
                    <i class="fa-solid fa-peso-sign mr-4"></i>28,842
                  </td>
                  <td>Completed</td>
                  <td><a class="btn btn-primary">View</a></td>
                </tr>
              </tbody>
            </table>
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
              name="submit"
              class="btn btn-success my-5 drop-shadow-md"
            >
              Change password
            </button>
          </form>
        </div>
        <div id="productList" class="flex flex-col gap-4">
          <a href="#newProduct" class="btn btn-success">Add new product</a>
          <div class="modal modal-bottom sm:modal-middle" id="newProduct">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Create your new product</h3>
              <form
                class="p-5 rounded-xl bg-base-100 drop-shadow-xl"
                action="<%=contextPath %>/newProduct"
                method="post"
                name="newProduct"
                enctype="multipart/form-data"
              >
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Category</span>
                  </label>
                  <select
                    name="category"
                    class="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>Select category</option>
                    <option value="1">Men's Apparel</option>
                    <option value="2">Gadgets</option>
                    <option value="3">Home & Living</option>
                    <option value="4">Groceries</option>
                    <option value="5">Toys</option>
                    <option value="6">Women's Apparel</option>
                    <option value="7">Personal Care</option>
                    <option value="8">Sports & Travel</option>
                    <option value="9">Gaming</option>
                    <option value="10">Audio</option>
                    <option value="11">Stationery</option>
                    <option value="12">Pet Care</option>
                  </select>
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Photos</span>
                  </label>
                  <input
                    type="file"
                    name="images"
                    class="file-input file-input-bordered w-full max-w-xs"
                    multiple
                  />
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Product name</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Product name"
                    class="input input-bordered w-full"
                  />
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Product description"
                    class="textarea textarea-bordered h-24 w-full"
                  ></textarea>
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    step=".01"
                    class="input input-bordered w-full"
                  />
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Quantity</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    class="input input-bordered w-full"
                  />
                </div>
                <div class="modal-action">
                  <button type="reset" class="btn btn-error">Cancel</button>
                  <button type="submit" name="submit" class="btn btn-success">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="modal modal-bottom sm:modal-middle" id="editProduct">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Edit product</h3>
              <form
                class="p-5 rounded-xl bg-base-100 drop-shadow-xl"
                action="<%=contextPath %>/editProduct"
                method="post"
                name="editProduct"
              >
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Category</span>
                  </label>
                  <select
                    name="category"
                    class="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>Select category</option>
                    <option value="1">Men's Apparel</option>
                    <option value="2">Gadgets</option>
                    <option value="3">Home & Living</option>
                    <option value="4">Groceries</option>
                    <option value="5">Toys</option>
                    <option value="6">Women's Apparel</option>
                    <option value="7">Personal Care</option>
                    <option value="8">Sports & Travel</option>
                    <option value="9">Gaming</option>
                    <option value="10">Audio</option>
                    <option value="11">Stationery</option>
                    <option value="12">Pet Care</option>
                  </select>
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Product name</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Product name"
                    class="input input-bordered w-full"
                  />
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Product description"
                    class="textarea textarea-bordered h-24 w-full"
                  ></textarea>
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    step=".01"
                    class="input input-bordered w-full"
                  />
                </div>
                <div class="form-control w-full self-center drop-shadow-md">
                  <label class="label">
                    <span class="label-text">Quantity</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    class="input input-bordered w-full"
                  />
                </div>
                <div class="modal-action">
                  <button type="reset" class="btn btn-error">Cancel</button>
                  <button type="submit" name="submit" class="btn btn-success">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="overflow-x-auto">
            <div id="productListing" class="flex flex-col gap-4"></div>
          </div>
        </div>
      </div>
    </main>
    <%@ include file="footer.jsp"%>
  </body>
</html>

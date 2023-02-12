import { TabNavigator } from "./TabNavigator.js";
import {
  createWarning,
  createSuccess,
  createToast,
  addElement,
  deleteElement,
  stagger,
} from "./app.js";

// Init
const tabNavigator = new TabNavigator("dashboard");

// Forms
const changePasswordForm = document.forms.changePassword;

// Init data
fetch(getAllUsersAPI)
  .then((response) => response.json())
  .then((data) => {
    showUsers(data);
  });

function showUsers(data) {
  const usersContainer = document.querySelector("#usersList");
  const usersList = data.users;
  const usersHTML = usersList.map((user) => createUserDiv(user));
  const newUserDiv = document.createElement("div");
  newUserDiv.innerHTML = `
      <input type="checkbox"/>
      <div class="collapse-title text-lg flex gap-4">
        <i class="fa-solid fa-user-plus self-center text-primary"></i>
        <span class="font-bold text-primary">Create a new user</span> 
      </div>
      <div class="collapse-content flex flex-col gap-4">
          <form
          class="flex flex-col"
          name="saveUser"
        >
          <div class="form-control w-full self-center drop-shadow-md">
            <label class="label">
              <span class="label-text">User type:</span>
            </label>
            <select name="userType" class="select select-bordered">
              <option disabled selected value="none">Select a user type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="form-control w-full self-center drop-shadow-md">
            <label class="label">
              <span class="label-text">First name:</span>
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
              <span class="label-text">Last name:</span>
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
              <span class="label-text">Email address:</span>
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
              <span class="label-text">Contact number:</span>
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
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              class="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            name="submit"
            class="btn btn-success my-5 drop-shadow-md"
          >Save</button>
        </form>
      </div>`;
  newUserDiv.tabIndex = "0";
  newUserDiv.classList.add(
    "newUser",
    "collapse",
    "collapse-arrow",
    "border",
    "border-base-300",
    "bg-base-100",
    "rounded-box"
  );

  stagger(usersHTML, usersContainer, "fade-in-top", 0.05, "prepend");
  addElement(newUserDiv, usersContainer, "fade-in-top", "prepend");
}

function createUserDiv(user) {
  const userDiv = document.createElement("div");
  userDiv.innerHTML = `
      <input type="checkbox"/>
      <div class="collapse-title text-lg flex gap-4">
        <span class="font-medium italic">${
          user.fullName || user.firstName + " " + user.lastName
        }</span> 
        <span class="font-bold text-primary">${
          user.email || user.emailAddress
        }</span> 
      </div>
      <div class="collapse-content flex flex-col gap-4">
        <progress class="progress progress-success w-full self-center"></progress>
          <form
          class="flex flex-col hidden"
          name="saveUser"
        >
          <div class="form-control w-full self-center drop-shadow-md">
            <label class="label">
              <span class="label-text">User type:</span>
            </label>
            <select disabled name="userType" class="select select-bordered">
              <option disabled selected value="none">Select a user type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="form-control w-full self-center drop-shadow-md">
            <label class="label">
              <span class="label-text">First name:</span>
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
              <span class="label-text">Last name:</span>
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
              <span class="label-text">Email address:</span>
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
              <span class="label-text">Contact number:</span>
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
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              class="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            name="submit"
            class="btn btn-success my-5 drop-shadow-md"
          >Save</button>
          <button
            type="button"
            name="delete"
            class="btn btn-error mb-5 drop-shadow-md"
          >Delete</buton>
        </form>
      </div>`;

  userDiv.tabIndex = "0";
  userDiv.classList.add(
    "user",
    "collapse",
    "collapse-arrow",
    "border",
    "border-base-300",
    "bg-base-100",
    "rounded-box"
  );
  userDiv.setAttribute("data-userid", user.userId);

  return userDiv;
}

// View user
document.addEventListener("click", (e) => {
  const dropdownClicked = e.target.closest("div.user input[type='checkbox']");

  if (dropdownClicked) {
    const userDiv = e.target.closest("div.user");
    const userId = userDiv.dataset.userid;
    const loading = userDiv.querySelector("progress");
    const form = userDiv.querySelector("form");
    fetch(`${getUserAPI}?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        loading.classList.add("hidden");
        form.classList.remove("hidden");
        const {
          firstName,
          lastName,
          emailAddress,
          contactNumber,
          userType,
          password,
        } = data.user;
        const userTypeInput = form.userType;
        const firstNameInput = form.firstName;
        const lastNameInput = form.lastName;
        const emailAddressInput = form.emailAddress;
        const contactNumberInput = form.contactNumber;
        const passwordInput = form.password;

        [...userTypeInput.options].forEach((option) => {
          if (option.value === userType) {
            userTypeInput.value = option.value;
            return;
          }
        });

        firstNameInput.value = firstName;
        lastNameInput.value = lastName;
        emailAddressInput.value = emailAddress;
        contactNumberInput.value = contactNumber;
        passwordInput.value = password;
      });
  }
});

// Save user
document.addEventListener("submit", (e) => {
  e.preventDefault();
  const form =
    e.target.closest("div.user form") || e.target.closest("div.newUser form");

  if (form) {
    const userDiv = e.target.closest("div.user");
    const userId = userDiv?.dataset.userid;
    const userType = form.userType.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const emailAddress = form.emailAddress.value;
    const contactNumber = form.contactNumber.value;
    const password = form.password.value;

    // Regex
    const nameRegex = /[a-zA-Z]/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pwdRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const contactRegex = /^\d{11}$/;

    if (userType === "none") {
      createWarning(
        "userTypeRequired",
        "Please enter a valid first and last name.",
        form.userType
      );
      return;
    }

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      createWarning(
        "nameRequired",
        "Please enter a valid first and last name.",
        form.lastName
      );
      return;
    }

    if (!emailRegex.test(emailAddress)) {
      createWarning(
        "invalidEmail",
        "Please enter a valid email address.",
        form.emailAddress
      );
      return;
    }

    if (!contactRegex.test(contactNumber)) {
      createWarning(
        "invalidContactNumber",
        "Please enter a valid contact number. An example of valid contact number is 09012345678.",
        form.contactNumber
      );
      return;
    }

    if (password.length < 8) {
      createWarning(
        "pwdLength",
        "The password must be at least 8 characters long.",
        form.password
      );
      return;
    }

    if (!pwdRegex.test(password)) {
      createWarning(
        "pwdTest",
        "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        form.password
      );
      return;
    }

    // Create form data
    const formData = new FormData();
    const user = {
      userType,
      firstName,
      lastName,
      emailAddress,
      contactNumber,
      password,
    };

    if (userId) {
      user.userId = userId;
    }

    formData.append("user", JSON.stringify(user));

    // Save product
    form.submit.classList.add("loading");
    fetch(saveUserAPI, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        form.submit.classList.remove("loading");
        if (response.ok) {
          // Handle successful save
          return response.json();
        } else {
          // Handle unsuccessful save
          createWarning(
            "saveError",
            "Error saving the user. Please try again or refresh the page.",
            form.submit
          );
          throw new Error("Save failed");
        }
      })
      .then((responseData) => {
        if (responseData.updateSuccessful) {
          createToast("saveSuccessful", "Save successful!");

          if (responseData.newUser) {
            fetch(`${getUserAPI}?userId=${responseData.userId}`)
              .then((res) => res.json())
              .then((data) => {
                const newUserEl = createUserDiv(data.user);

                addElement(
                  newUserEl,
                  form.closest("div.newUser"),
                  "fade-in-top",
                  "insertAfter"
                );
              });

            form.reset();
          }
        } else {
          createWarning(
            "updateError",
            "Error saving the user. Please try again or refresh the page.",
            form.submit
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

// Delete user
document.addEventListener("click", (e) => {
  const promptDeleteButton = e.target.closest(
    "div.user button[name='delete']:not(.confirm)"
  );

  const actualDeleteButton = e.target.closest(
    "div.user button[name='delete']:is(.confirm)"
  );

  if (promptDeleteButton) {
    promptDeleteButton.classList.add("confirm");
    promptDeleteButton.textContent = "Are you sure?";

    const cancelDelete = document.createElement("button");
    cancelDelete.setAttribute("type", "button");
    cancelDelete.setAttribute("name", "cancel");
    cancelDelete.classList.add("btn", "btn-error", "mb-5", "drop-shadow-md");
    cancelDelete.textContent = "Cancel";

    addElement(cancelDelete, promptDeleteButton, "fade-in-top", "insertAfter");

    cancelDelete.addEventListener(
      "click",
      (e) => {
        promptDeleteButton.classList.remove("confirm");
        promptDeleteButton.textContent = "Delete";
        e.target.classList.add("slide-out-right");

        e.target.addEventListener("animationend", (e) => {
          e.target.remove();
        });
      },
      { once: true }
    );
  }

  if (actualDeleteButton) {
    actualDeleteButton.classList.add("loading");

    const userDiv = actualDeleteButton.closest("div.user");
    const userId = userDiv.dataset.userid;

    fetch(deleteUserAPI, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => {
        actualDeleteButton.classList.remove("loading");
        if (response.ok) {
          // Handle successful update
          return response.json();
        } else if (response.status === 401) {
          createToast(
            "unauthorizedUser",
            "Unauthorized user. Please try again or refresh the page.",
            "error"
          );
          throw new Error("Delete failed");
        } else {
          // Handle unsuccessful update
          createToast(
            "deleteError",
            "Error deleting user. Please try again or refresh the page.",
            "error"
          );
          throw new Error("Update failed");
        }
      })
      .then((responseData) => {
        if (responseData.deleteSuccessful) {
          const userContainer = document.querySelector(
            `div.user[data-userid='${userId}']`
          );

          deleteElement(userContainer, "slide-out-right");
          createToast("deleteSuccessful", "Delete successful!");
        } else {
          createToast(
            "deleteError",
            "Error deleting user. Please try again or refresh the page.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

// Change password logic
changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const oldPassword = changePasswordForm.oldPassword.value;
  const newPassword = changePasswordForm.newPassword.value;
  const confirmPassword = changePasswordForm.confirmPassword.value;

  const pwdRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!oldPassword) {
    createWarning(
      "oldPwdEmpty",
      "Please provide your old password",
      changePasswordForm.oldPassword
    );
    return;
  }

  if (newPassword.length < 8) {
    createWarning(
      "newPasswordLength",
      "The password must be at least 8 characters long.",
      changePasswordForm.newPassword
    );
    return;
  }

  if (!pwdRegex.test(newPassword)) {
    createWarning(
      "pwdTest",
      "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      changePasswordForm.newPassword
    );
    return;
  }

  if (oldPassword === newPassword) {
    createWarning(
      "samePwd",
      "Your new password cannot be the same as your old password. Change your new password and try again.",
      changePasswordForm.newPassword
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    createWarning(
      "confirmPwd",
      "The password and confirm password fields do not match.",
      changePasswordForm.confirmPassword
    );
    return;
  }

  // Prepare form data
  const formData = {
    password: newPassword,
  };

  // Make POST request to API
  changePasswordForm[3].classList.add("loading");
  fetch(changePasswordAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Old-Password": oldPassword,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      changePasswordForm[3].classList.remove("loading");
      if (response.ok) {
        // Handle successful update
        return response.json();
      } else if (response.status === 403) {
        createWarning(
          "updateError",
          "Incorrect old password. Please try again and enter your old password correctly.",
          changePasswordForm[3]
        );
        throw new Error("Update failed");
      } else {
        // Handle unsuccessful update
        createWarning(
          "updateError",
          "Error updating your password. Please try again or refresh the page.",
          changePasswordForm[3]
        );
        throw new Error("Update failed");
      }
    })
    .then((responseData) => {
      if (responseData.updateSuccessful) {
        createSuccess(
          "updateSuccessful",
          "Update successful!",
          changePasswordForm[3]
        );
        changePasswordForm.reset();
      } else {
        createWarning(
          "updateError",
          "Error updating your password. Please try again or refresh the page.",
          changePasswordForm[3]
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

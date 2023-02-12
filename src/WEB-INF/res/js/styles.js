// Get elements
const bottomNav = document.querySelector("#btmNav");
const root = document.querySelector(":root");

// Get computed styles
const bottomNavHeight = getComputedStyle(bottomNav).getPropertyValue("height");

// Set property
root.style.setProperty("--bottom-nav-height", bottomNavHeight);

// On scroll change the background of header nav
document.addEventListener("scroll", () => {
  const nav = document.querySelector("#navTop").querySelector(".navbar");
  const navHeight = parseInt(getComputedStyle(nav).getPropertyValue("height"));

  if (window.scrollY > navHeight) {
    nav.classList.remove("text-primary-content");
    nav.classList.add("bg-base-100", "text-primary-focus");
  } else {
    nav.classList.remove("bg-base-100", "text-primary-focus");
    nav.classList.add("text-primary-content");
  }
});

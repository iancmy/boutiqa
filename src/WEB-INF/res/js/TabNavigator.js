export class TabNavigator {
  constructor(defaultHash) {
    this.tabs = document.querySelectorAll(".tab");
    this.defaultHash = defaultHash;
    this.bindEvents();
    this.updateActiveTab();
  }

  bindEvents() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", this.handleTabClick.bind(this));
    });
  }

  handleTabClick(e) {
    e.preventDefault();
    const hash = e.target.getAttribute("href").slice(1);
    history.pushState({}, "", `#${hash}`);
    this.updateActiveTab();
  }

  updateActiveTab() {
    let hash = window.location.hash.slice(1);
    if (!hash) {
      hash = this.defaultHash;
      history.replaceState({}, "", `#${hash}`);
    }
    this.tabs.forEach((tab) => {
      const href = tab.getAttribute("href").slice(1);
      if (hash === href) {
        tab.classList.add("tab-active");
        document.getElementById(hash).style.display = "flex";
      } else {
        tab.classList.remove("tab-active");
        document.getElementById(href).style.display = "none";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Toggle theme between dark and light mode
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const body = document.body;
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    }
  });

  // Toggle Side Navigation expansion
  const navToggle = document.getElementById("nav-toggle");
  const sideNav = document.getElementById("side-nav");
  
  navToggle.addEventListener("click", () => {
    if (sideNav.classList.contains("expanded")) {
      sideNav.classList.remove("expanded");
      sideNav.classList.add("collapsed");
    } else {
      sideNav.classList.remove("collapsed");
      sideNav.classList.add("expanded");
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Toggle theme between dark and light mode
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    const body = document.body;
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
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

  // Basic Drag & Drop for Meal Items onto Calendar Days
  const mealItems = document.querySelectorAll('.meal-item');
  const dropzones = document.querySelectorAll('.dropzone');

  mealItems.forEach((item) => {
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', handleDragStart);
  });

  dropzones.forEach((zone) => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('drop', handleDrop);
  });

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.innerText);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const newItem = document.createElement('div');
    newItem.innerText = data;
    newItem.classList.add('meal-item');
    e.target.appendChild(newItem);
  }
});

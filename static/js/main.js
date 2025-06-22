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

  // Drag & Drop for Dashboard Meal Boxes:
  const mealDraggables = document.querySelectorAll('.meal-box');
  const dropzones = document.querySelectorAll('.calendar-day');

  dropzones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.style.background = "rgba(39,174,96,0.15)";
    });
    zone.addEventListener('dragleave', e => {
      zone.style.background = "";
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.style.background = "";
      const mealData = e.dataTransfer.getData('text/plain');
      // Create a new meal box element
      const mealBox = document.createElement('div');
      mealBox.className = 'meal-box';
      mealBox.innerText = mealData;
      // Add a delete icon to the meal box
      const delIcon = document.createElement('i');
      delIcon.className = 'fas fa-trash-alt delete-meal';
      delIcon.addEventListener('click', function() {
        mealBox.remove();
      });
      mealBox.appendChild(delIcon);
      zone.appendChild(mealBox);
    });
  });

  // Drag & Drop for Meal Creator Ingredients:
  const ingredientItems = document.querySelectorAll('.ingredient-item');
  const builderPanel = document.querySelector('.builder-panel');

  ingredientItems.forEach((item) => {
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.innerText);
    });
  });

  if(builderPanel){
    builderPanel.addEventListener('dragover', e => {
      e.preventDefault();
    });
    builderPanel.addEventListener('drop', e => {
      e.preventDefault();
      const ingText = e.dataTransfer.getData('text/plain');
      const newIng = document.createElement('div');
      newIng.className = 'ingredient-item';
      newIng.innerText = ingText;
      builderPanel.appendChild(newIng);
    });
  }
});

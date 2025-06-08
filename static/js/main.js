// Toggle between dark and light mode
document.getElementById("theme-toggle").addEventListener("click", () => {
  const body = document.body;
  if(body.classList.contains("dark-mode")){
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  }
});

// Main interactions for John David A. Calimpong portfolio
// - Theme toggle (light/dark) placeholder
// - Future animations or section behaviors

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  // Initialize theme
  const isDarkStart = savedTheme
    ? savedTheme === "dark"
    : prefersDark;

  if (isDarkStart) {
    document.body.classList.add("theme-dark");
  }

  // Theme toggle handler
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("theme-dark");
      const isDark = document.body.classList.contains("theme-dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
});



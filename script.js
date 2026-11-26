// Lab Step 11: restore and save the user's light/dark theme preference.
const themeButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeKey = "portfolio-theme";

function setTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeIcon.textContent = dark ? "☀" : "☾";
}

// Storage can be unavailable in some private browsing or local-file contexts.
let savedTheme = "light";
try {
  savedTheme = localStorage.getItem(themeKey) || "light";
} catch (error) {
  // The toggle still works if the browser does not permit local storage.
}
setTheme(savedTheme);

themeButton.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  try {
    localStorage.setItem(themeKey, nextTheme);
  } catch (error) {
    // Keep the current theme even when storage is blocked.
  }
});

// Responsive navigation menu.
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  // Replace this address with your own email address.
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
});

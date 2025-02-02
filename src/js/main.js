import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

document.getElementById("newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  console.log("Newsletter signup email:", email);
  alert("Thank you for signing up for our newsletter!");
  document.getElementById("newsletter-form").reset();
});
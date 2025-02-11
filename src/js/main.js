import { loadHeaderFooter, setLocalStorageSearch } from "./utils.mjs";
loadHeaderFooter();



document.getElementById("newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  console.log("Newsletter signup email:", email);
  alert("Thank you for signing up for our newsletter!");
  document.getElementById("newsletter-form").reset();
});





// document.addEventListener("DOMContentLoaded", function() {
//   let inputSearch = document.querySelector("#searchbar").value;
//   searchButton.addEventListener("click", setLocalStorageSearch("search-bar", inputSearch ));

//   // ...existing code...
// });

// const inputSearch = document.getElementById("searchbar");
// const value = inputSearch.value;
// console.log(inputSearch);

// const searchButton = document.querySelector(".goSearch");



// searchButton.addEventListener("click", setLocalStorageSearch("search-bar", inputSearch ));



// setLocalStorageSearch("search-bar", document.getElementById("searchbar").value);

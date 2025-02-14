// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  updateCartCount()
  cartAnimation()
}

export function getParams(param) {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  console.log(product);
  return product;
}

export function setLocalStorageSearch(key, data) {
  // localStorage.setItem(key, JSON.stringify(data))
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorageSearch(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const strings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, strings.join(""));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  cartCount.innerHTML = "";
  const count = getLocalStorage("so-cart").length;
  if (count > 0) {
    cartCount.innerHTML = count;
  } else {
    cartCount.innerHTML = 0;
  }
}

export function cartAnimation(){
  const cart = document.querySelector(".cart")
  cart.classList.add("cart-animation")
  setTimeout(() => {
    cart.classList.remove("cart-animation")
  }, 500)
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback();
  }
}

export async function loadHeaderFooter() {
  const headerElement = document.querySelector("#main-header");
  const headerTemplate = await loadTemplate("../partials/header.html");

  const footerElement = document.querySelector("#main-footer");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  updateCartCount();

  function setSearch() {
    var inputSearch = document.querySelector("#searchbar").value.toLowerCase();
    setLocalStorageSearch("search-bar", inputSearch)
        
  
  };

  document.querySelector(".goSearch").addEventListener("click", ()=>setSearch()); 
  
}

export async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export function removeItemFromCart(trashIndex) {
  let cartItems = getLocalStorage("so-cart");
  cartItems.splice(trashIndex, 1);
  setLocalStorage("so-cart", cartItems);
}

export function updateTotalPrice(cartItems) {
  if (cartItems === null) {
    return 0;
  } else {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });
    const totalElement = document.querySelector(".cart-footer");
    totalElement.style.display = "block";
    const totalText = document.querySelector(".cart-total");
    totalText.innerHTML = `Total price: $${total}`;
  }
}

export function alertMessage(message, scroll = true, duration = 3000) {
  // create element to hold our alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  // set the contents. You should have a message and an X or something the user can click on to remove

  alert = `<p>${message}</p><span>X</span>`;

  //add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function(e) {
    if(e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  })

  // add the alert to the top of main

  const main = document.querySelector("main");
  main.prepend(alert);

  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this so default to scroll = true, but allow it to be passed in and overridden.

  if(scroll)
    window.scrollTo(0,0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
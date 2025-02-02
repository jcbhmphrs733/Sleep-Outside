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
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
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

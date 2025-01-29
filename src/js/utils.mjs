// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))|| [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  updateCartCount()
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
  clear = false
 ) {
  const strings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, strings.join(""));
 }

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// cart count

export function updateCartCount(){
  const cartCount = document.querySelector(".cart-count")
  cartCount.innerHTML = ""
  const count = getLocalStorage("so-cart").length
  if (count>0){
    cartCount.innerHTML = count
  } else {
    cartCount.innerHTML = 0
  }
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.insertAdjacentHTML("afterbegin",template);
  if (callback) {
    callback()
  }
}

export async function loadHeaderFooter(){
  const headerElement = document.querySelector("#main-header")
  const headerTemplate = await loadTemplate("../partials/header.html")

  const footerElement = document.querySelector("#main-footer")
  const footerTemplate = await loadTemplate("../partials/footer.html")
  
  renderWithTemplate(headerTemplate,headerElement)
  renderWithTemplate(footerTemplate,footerElement)
}

export async function loadTemplate(path){
  const html = await fetch(path)
  const template = await html.text()
  return template
}
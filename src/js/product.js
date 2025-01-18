import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { updateCartCount } from "./utils.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const newCartList = getLocalStorage("so-cart");
  // console.log(Array.isArray(newCartList));
  newCartList.push(product);
  setLocalStorage("so-cart", newCartList);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// update cart count
updateCartCount();
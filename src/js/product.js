import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

const productID = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productID, dataSource);
product.init();


function addProductToCart(product) {
  const newCartList = getLocalStorage("so-cart");
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

import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./productData.mjs";
import ProductList from "./productList.mjs";

loadHeaderFooter();

const category = getParams("category");
const data = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, data, element);

listing.init();

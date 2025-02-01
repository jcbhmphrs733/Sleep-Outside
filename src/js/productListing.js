import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParams("category");
const data = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, data, element);

listing.init();

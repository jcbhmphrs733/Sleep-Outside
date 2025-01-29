import productData from "./productData.mjs";
import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new productData("tents");
const element = document.querySelector(".product-list");
const listing = new productList("tents", dataSource, element);

listing.init();

import { getParams } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productID = getParams("product");

const product = new ProductDetails(productID, dataSource);
product.init();
loadHeaderFooter();

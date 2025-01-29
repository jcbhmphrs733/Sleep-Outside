import { getParams } from "./utils.mjs";
import ProductDetails from "./productDetails.mjs";
import ProductData from "./productData.mjs";
import { loadHeaderFooter } from "./utils.mjs";
const dataSource = new ProductData("tents");
const productID = getParams("product");

const product = new ProductDetails(productID, dataSource);
product.init();
loadHeaderFooter();

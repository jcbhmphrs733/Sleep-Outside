import { getParams, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import productData from "./productData.mjs";

const dataSource = new productData("tents");
const productID = getParams("product");

const product = new productDetails(productID, dataSource);
product.init();

loadHeaderFooter();

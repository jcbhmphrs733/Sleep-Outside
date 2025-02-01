import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./productData.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const productID = getParams("product");
const product = new ProductDetails(productID, dataSource);

product.init();

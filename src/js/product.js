import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./productDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const productID = getParams("product");
const product = new ProductDetails(productID, dataSource);

product.init();

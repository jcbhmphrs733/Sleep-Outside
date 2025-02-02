import { getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParams("category");
const data = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, data, element);

listing.init().then(() => {
    document.getElementById("sort-options").addEventListener("change", (event) => {
        const sortBy = event.target.value;
        listing.sortProducts(sortBy);
    });    
});


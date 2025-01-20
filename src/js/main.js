import ProductData from "./ProductData.mjs";    
import ProductList from "./ProductList.mjs";
import {qs} from "./utils.mjs";

// Instanting the ProductDetails class
const dataSource= new ProductData("tents");

const element = qs(".product-list");

const listing = new ProductList("tents", dataSource, element);

listing.init();


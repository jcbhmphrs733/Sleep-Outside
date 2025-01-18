import ProductListing from "./ProductList.mjs"
import { updateCartCount } from "./utils.mjs"

const refer = document.querySelector(".product-list")
//refer.innerHTML = ""

let productListing = new ProductListing("tents", "tents", refer)

//productListing.init()
updateCartCount()
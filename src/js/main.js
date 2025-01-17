import ProductListing from "./ProductList.mjs"

const refer = document.querySelector(".product-list")
refer.innerHTML = ""

let productListing = new ProductListing("tents", "tents", refer)


productListing.init()

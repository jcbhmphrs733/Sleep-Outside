import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();



const checkout = new CheckoutProcess("so-cart", ".checkout-summary");

checkout.init();

document.querySelector("#zip").addEventListener("blur", checkout.calculateOrdertotal.bind(checkout));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    checkout.checkout();
})

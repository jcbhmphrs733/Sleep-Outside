import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
        this.calculateOrdertotal();
    }
    
    calculateItemSummary() {
        const summaryElement = document.querySelector("#cartTotal");

        const itemNumElement = document.querySelector("#num-items");
        
        itemNumElement.innerText = this.list.length;

        // Calculate the total of all the items in the cart

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);


        summaryElement.innerText = "$" + this.itemTotal.toFixed(2);

    }

    calculateOrdertotal() {
        this.shipping = 10 + (this.list.length-1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals () {
        const shipping = document.querySelector( "#shipping");
        const tax = document.querySelector("#tax");
        const orderTotal = document.querySelector("#orderTotal");

        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    }

    async checkout() {
        const formElement = document.forms["checkout"];

        const json = formDataToJSON(formElement);

        // add total, and item details

        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);

        try {
            const res = await services.checkout(json);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

}
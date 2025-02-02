import {
  getLocalStorage,
  removeItemFromCart,
  updateTotalPrice,
} from "./utils.mjs";

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider" data-index="${index}">
  <a href="#" class="cart-card__image" style="position: relative; display: block;">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
      style="display: block; width: 100%;"
    />
    <svg
      class="cart-card__icon"
      style="position: absolute; top: 10px; left: 10px; width: 20px; height: 20px;"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <title>delete from cart</title>
      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </svg>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  createTrashCanEventListeners() {
    const icons = document.querySelectorAll(".cart-card__icon");
    icons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const unwantedItem = event.target.closest(".cart-card");
        const trashIndex = unwantedItem.getAttribute("data-index");
        removeItemFromCart(trashIndex);
        this.renderCartContents();
      });
    });
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item, index) =>
      cartItemTemplate(item, index),
    );
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    this.createTrashCanEventListeners();
    updateTotalPrice(cartItems);
  }
}

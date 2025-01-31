import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
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

  removeItemFromCart(index) {
    let cartItems = getLocalStorage("so-cart");
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
  }

  createTrashCanEventListeners() {
    const icons = document.querySelectorAll(".cart-card__icon");
    icons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const cartItem = event.target.closest(".cart-card");
        const itemIndex = cartItem.getAttribute("data-index");
        this.removeItemFromCart(itemIndex);
        cartItem.remove();
      });
    });
  }

  updateTotalPrice(ObjectList) {
    let total = 0;
    ObjectList.forEach((item) => {
      total += item.FinalPrice;
    });
    if (cartItems.length !== 0) {
      let totalElement = document.querySelector(".cart-footer");
      let total = document.querySelector(".cart-total");
      totalElement.style.display = "block";
      total.innerHTML = `Total price: $${this.totalPrice(cartItems)}`;
    }
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

  

    if (cartItems.length !== 0) {
      let totalElement = document.querySelector(".cart-footer");
      let total = document.querySelector(".cart-total");
      totalElement.style.display = "block";
      total.innerHTML = `Total price: $${this.totalPrice(cartItems)}`;
    }
  }
}

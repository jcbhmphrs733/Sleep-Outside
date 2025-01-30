import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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

  return newItem;
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

  addRemoveEventListeners() {
    const icons = document.querySelectorAll(".cart-card__icon");
    icons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const cartItem = event.target.closest(".cart-card");
        const itemIndex = cartItem.getAttribute("data-index");
        removeItemFromCart(itemIndex);
        cartItem.remove();
      });
    });
  }
  
  totalPrice(ObjectList) {
    let total = 0;
    ObjectList.forEach((item) => {
      total += item.FinalPrice;
    });
    return total;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    console.log(cartItems);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    console.log(htmlItems);
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

    if (cartItems.length !== 0) {
      let totalElement = document.querySelector(".cart-footer");
      let total = document.querySelector(".cart-total");
      totalElement.style.display = "block";
      total.innerHTML = `Total price: $${totalPrice(cartItems)}`;
    }
  }
}

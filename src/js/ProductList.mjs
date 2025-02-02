import { renderListWithTemplate } from "./utils.mjs";
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    const list = await this.dataSource.getData(this.category);
    console.log(this.products);
    this.renderList(list);

    document.querySelector(".title").innerHTML = this.category.toUpperCase();
  }

  renderList(list) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  sortProducts(sortBy) {
    let sortedProducts = [...this.products];

    if (sortBy === "name") {
      sortedProducts = [...this.products].sort((a, b) =>
        a.Name.localeCompare(b.Name),
      );
    } else if (sortBy === "price") {
      sortedProducts = [...this.products].sort(
        (a, b) => a.FinalPrice - b.FinalPrice,
      );
    }
    console.log(sortedProducts);
    this.renderList(sortedProducts);
    
  }
}

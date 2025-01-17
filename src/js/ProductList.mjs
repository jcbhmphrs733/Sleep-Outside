import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `<li class="product-card">
                <a href="product_pages/index.html?product=${product.Id}">
                    <img src="${product.Image}" alt="Image of ${product.Name.split("-")[0]}">
                    <h3 class="card__brand">${product.Brand.Name}</h3>
                    <h2 class="card__name">${product.NameWithoutBrand}</h2>
                    <p class="product-card__price">$${product.ListPrice}</p>
                </a>
            </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = new ProductData(dataSource);
        this.listElement = listElement;
    }

    renderList(list) {
        list = list.slice(0, 4);
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    async init(){
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
}
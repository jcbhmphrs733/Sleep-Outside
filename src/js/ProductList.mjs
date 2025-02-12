import { renderListWithTemplate, getLocalStorageSearch } from "./utils.mjs";
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
    console.log(list);
    this.renderList(list);

    if (this.category !== null) {
      document.querySelector(".title").innerHTML = this.category.toUpperCase();
    }

    
  }



  renderList(list) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  sortProducts(sortBy) {
    let sortedProducts = [...this.products];
    console.log(sortedProducts);

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



export class Search {
  constructor(searchCriteria, dataSource, listElement) {
    this.searchCriteria = searchCriteria;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async initSearch() {
    const tents = await this.dataSource.getData("tents");
    const hammocks = await this.dataSource.getData("hammocks");
    const backpacks = await this.dataSource.getData("backpacks");
    const  sleepingBags= await this.dataSource.getData("sleeping-bags");

    tents.forEach(element => {
      console.log(element.Category);
      
    });

    // Filtering products array of objects
    const filteredTents = tents.filter(element => element.Name.toLowerCase().includes(this.searchCriteria) || element.Brand.Name.toLowerCase().includes(this.searchCriteria) || element.Category.toLowerCase().includes(this.searchCriteria))

    const filteredHammocks = hammocks.filter(element => element.Name.toLowerCase().includes(this.searchCriteria) || element.Brand.Name.toLowerCase().includes(this.searchCriteria) || element.Category.toLowerCase().includes(this.searchCriteria))

    const filteredBackpacks = backpacks.filter(element => element.Name.toLowerCase().includes(this.searchCriteria) || element.Brand.Name.toLowerCase().includes(this.searchCriteria) || element.Category.toLowerCase().includes(this.searchCriteria))

    const filteredBags = sleepingBags.filter(element => element.Name.toLowerCase().includes(this.searchCriteria) || element.Brand.Name.toLowerCase().includes(this.searchCriteria) || element.Category.toLowerCase().includes(this.searchCriteria))
    
    // Adding the filter products to the list of products by using the addSearchedProductToList function
    this.addSearchedProductsToList(filteredTents);
    this.addSearchedProductsToList(filteredBags);
    this.addSearchedProductsToList(filteredBackpacks);
    this.addSearchedProductsToList(filteredHammocks);
    
    // Renering the list of products filtered by using the rederList function

    this.renderList(this.products);

    
  }

  renderList(list) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  
  // function lo add the filtered products to the product list
  addSearchedProductsToList (filtered) {
    filtered.forEach(element => {
      this.products.push(element);      
    });
  }
}

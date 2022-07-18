'use strict';

loadProducts() //
  .then(products => {
    displayProducts(products);
  })
  .catch(console.log);

async function loadProducts() {
  const response = await fetch('data/products.json');
  if (response.ok) {
    const obj = await response.json();
    return obj.products;
  } else {
    throw new Error(`HTTP Error ${response.status}`);
  }
}

function displayProducts(products) {
  const container = document.querySelector('.products');
  const elements = products.map(createElement);
  container.append(...elements);
}

function createElement(product) {
  const listItem = document.createElement('li');
  listItem.classList.add('product');
  listItem.innerHTML = `
    <img src=${product.img} alt=${product.name} class="product__img" />
    <p class="product__price">${product.price}</p>
    `;
  return listItem;
}

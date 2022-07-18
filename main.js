'use strict';

loadProducts() //
  .then(products => {
    const productElements = displayProducts(products);

    // Filter products by category on button click
    const btns = document.querySelector('.btns');
    btns.addEventListener('click', e => onBtnclick(e, productElements));

    // Sort products by price on select change
    const select = document.querySelector('.select');
    select.addEventListener('change', e => onSelectChange(e, productElements));
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
  return elements;
}

function createElement(product) {
  const listItem = document.createElement('li');
  listItem.classList.add('product');
  listItem.setAttribute('data-category', product.category);
  listItem.setAttribute('data-price', product.price);
  listItem.innerHTML = `
    <img src=${product.img} alt=${product.name} class="product__img" />
    <p class="product__price">${product.price}</p>
    `;
  return listItem;
}

function onBtnclick(e, products) {
  const category = e.target.dataset.category;
  if (!category) {
    return;
  }
  filterProducts(products, category);
}

function filterProducts(products, category) {
  products.forEach(product => {
    if (category === '*' || category === product.dataset.category) {
      product.classList.remove('product--hidden');
    } else {
      product.classList.add('product--hidden');
    }
  });
}

function onSelectChange(e, products) {
  const criteria = e.target.value;
  sortProducts(products, criteria);
}

function sortProducts(products, criteria) {
  const toBeSorted = [...products];
  let sorted;

  switch (criteria) {
    case 'ascending':
      sorted = toBeSorted.sort((a, b) => a.dataset.price - b.dataset.price);
      break;
    case 'descending':
      sorted = toBeSorted.sort((a, b) => b.dataset.price - a.dataset.price);
      break;
    case '':
      sorted = products;
      break;
  }

  const container = document.querySelector('.products');
  container.append(...sorted);
}

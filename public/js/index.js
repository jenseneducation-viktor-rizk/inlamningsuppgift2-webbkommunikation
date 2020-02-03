const fetchProducts = async () => {
  await fetch("/products", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(products => {
      appendProducts(products);
    })
    .catch(error => {
      console.error(error);
    });
};

const addToCartButton = (i, productContainer) => {
  let buttonName = document.createTextNode("Add To Cart");
  const cartButton = document.createElement("button");
  cartButton.className = "button-cart";
  cartButton.id = 1 + i;
  cartButton.appendChild(buttonName);
  productContainer.appendChild(cartButton);
};

const productElement = async (products, i, productContainer) => {
  const prodNameElem = document.createElement("h2");
  let prodName = document.createTextNode(products[i].name);
  prodNameElem.appendChild(prodName);
  productContainer.appendChild(prodNameElem);
};

const productPrice = async (products, i, productContainer) => {
  const prodPriceElem = document.createElement("h3");
  let prodPrice = document.createTextNode(products[i].price + " kr");
  prodPriceElem.appendChild(prodPrice);
  productContainer.appendChild(prodPriceElem);
};

const productImg = async (products, i, productContainer) => {
  const imgContainer = document.createElement("img");
  imgContainer.src = products[i].image;
  productContainer.appendChild(imgContainer);
};

const appendProducts = async products => {
  for (let i = 0; i < products.length; i++) {
    const productContainer = document.createElement("div");
    productContainer.className = "product";
    productElement(products, i, productContainer);
    productImg(products, i, productContainer);
    productPrice(products, i, productContainer);
    addToCartButton(i, productContainer);
    document.querySelector(".product-container").appendChild(productContainer);
  }
};

fetchProducts();

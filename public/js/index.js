// hämtar produkter från databasen
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
// lägger till produkt i varukorgen
const addToCart = async i => {
  await fetch("/cart/add/" + i, {
    method: "POST"
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);

      alreadyAdded(i, data);
    })
    .catch(error => {
      console.error(error);
    });
};

// produktknapp för att lägga till i varukorgen
const addToCartButton = (i, productContainer) => {
  let buttonName = document.createTextNode("Add To Cart");
  const cartButton = document.createElement("button");
  const buttonId = 1 + i;
  cartButton.className = "button-cart";
  cartButton.id = "button-" + buttonId;
  cartButton.appendChild(buttonName);
  productContainer.appendChild(cartButton);
  cartButton.addEventListener("click", () => {
    addToCart(buttonId);
  });
};

const alreadyAdded = (i, data) => {
  document.querySelector(`#button-${i}`).innerHTML = data.message;
};

// hämtar produktnamn och lägger till i HTML
const productName = async (products, i, productContainer) => {
  const prodNameElem = document.createElement("h2");
  let prodName = document.createTextNode(products[i].name);
  prodNameElem.appendChild(prodName);
  productContainer.appendChild(prodNameElem);
};
// hämtar produktpris och lägger till i HTML
const productPrice = async (products, i, productContainer) => {
  const prodPriceElem = document.createElement("h3");
  let prodPrice = document.createTextNode(products[i].price + " kr");
  prodPriceElem.appendChild(prodPrice);
  productContainer.appendChild(prodPriceElem);
};
// hämtar produktbild och lägger till i HTML
const productImg = async (products, i, productContainer) => {
  const imgContainer = document.createElement("img");
  imgContainer.src = products[i].image;
  productContainer.appendChild(imgContainer);
};
// lägger till produkterna i HTML
const appendProducts = async products => {
  for (let i = 0; i < products.length; i++) {
    const productContainer = document.createElement("div");
    productContainer.className = "product";
    productName(products, i, productContainer);
    productImg(products, i, productContainer);
    productPrice(products, i, productContainer);
    addToCartButton(i, productContainer);
    document.querySelector(".product-container").appendChild(productContainer);
  }
};

fetchProducts();

// hämtar produkter från databasen
const fetchCart = async () => {
  await fetch("/cart", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(cart => {
      appendProducts(cart);
    })
    .catch(error => {
      console.error(error);
    });
};

const removeFromCart = async i => {
  await fetch("/cart/remove/" + i, {
    method: "DELETE"
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      buttonMsg(i, data);
    })
    .catch(error => {
      console.error(error);
    });
};

// produktknapp för att lägga till i varukorgen
const removeFromCartButton = (cartId, productContainer) => {
  let buttonName = document.createTextNode("Remove From Cart");
  const cartButton = document.createElement("button");

  cartButton.className = "button-cart";
  cartButton.id = "button-" + cartId;
  cartButton.appendChild(buttonName);
  productContainer.appendChild(cartButton);
  cartButton.addEventListener("click", () => {
    removeFromCart(cartId);
  });
};
// meddelande om produkt lagts till eller om den redan fanns i varukorgen
const buttonMsg = (i, data) => {
  document.querySelector(`#button-${i}`).innerHTML = data.message;
};

// hämtar produktnamn och lägger till i HTML
const productName = async (cart, i, productContainer) => {
  const prodNameElem = document.createElement("h2");
  let prodName = document.createTextNode(cart[i].name);
  prodNameElem.appendChild(prodName);
  productContainer.appendChild(prodNameElem);
};
// hämtar produktpris och lägger till i HTML
const productPrice = async (cart, i, productContainer) => {
  const prodPriceElem = document.createElement("h3");
  let prodPrice = document.createTextNode(cart[i].price + " kr");
  prodPriceElem.appendChild(prodPrice);
  productContainer.appendChild(prodPriceElem);
};
// hämtar produktbild och lägger till i HTML
const productImg = async (cart, i, productContainer) => {
  const imgContainer = document.createElement("img");
  imgContainer.src = cart[i].image;
  productContainer.appendChild(imgContainer);
};

// lägger till produkterna i HTML
const appendProducts = async cart => {
  for (let i = 0; i < cart.length; i++) {
    const productContainer = document.createElement("div");
    productContainer.className = "product";
    productName(cart, i, productContainer);
    productImg(cart, i, productContainer);
    productPrice(cart, i, productContainer);
    removeFromCartButton(cart[i].id, productContainer);
    document.querySelector(".product-container").appendChild(productContainer);
  }
};

fetchCart();

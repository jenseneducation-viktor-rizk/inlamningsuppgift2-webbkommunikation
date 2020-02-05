import { fetchRemoveFromCart } from "../js/cart.js";

// produktknapp för att lägga till i varukorgen
const removeFromCartButton = (cartId, productContainer) => {
  let buttonName = document.createTextNode("Remove From Cart");
  const cartButton = document.createElement("button");

  cartButton.className = "button-cart";

  cartButton.id = "button-" + cartId;
  cartButton.appendChild(buttonName);
  productContainer.appendChild(cartButton);
  cartButton.addEventListener("click", () => {
    fetchRemoveFromCart(cartId);
  });
};

// meddelande om produkt lagts till eller om den redan fanns i varukorgen
export const buttonMsg = (i, data) => {
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
export const appendProducts = async cart => {
  for (let i = 0; i < cart.length; i++) {
    const productContainer = document.createElement("div");
    productContainer.className = "product";
    productContainer.id = "product-" + cart[i].id;
    productName(cart, i, productContainer);
    productImg(cart, i, productContainer);
    productPrice(cart, i, productContainer);
    removeFromCartButton(cart[i].id, productContainer);
    document.querySelector(".cart-container").appendChild(productContainer);
  }
};

import { appendProducts, buttonMsg } from "../modules/cart-functions.js";

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
// tar bort produkt från varukorgen
export const fetchRemoveFromCart = async i => {
  await fetch("/cart/remove/" + i, {
    method: "DELETE"
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      buttonMsg(i, data);
      removeProdFromHTML(i);
    })
    .catch(error => {
      console.error(error);
    });
};

const removeProdFromHTML = i => {
  let item = document.getElementById("product-" + i);

  setTimeout(function() {
    item.parentNode.removeChild(item);
  }, 1000);
  // item.parentNode.removeChild(item);
};

fetchCart();

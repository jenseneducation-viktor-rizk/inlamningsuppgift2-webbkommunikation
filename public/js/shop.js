import { appendProducts, buttonMsg } from "../modules/shop-functions.js";

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
export const addToCart = async i => {
  await fetch("/cart/add/" + i, {
    method: "POST"
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

fetchProducts();

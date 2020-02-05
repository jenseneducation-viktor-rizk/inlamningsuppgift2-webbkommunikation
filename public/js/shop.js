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
// hämtar varukorgen och kolla om en specifik produkt finns med hjälp av id
export const checkIfInCart = async i => {
  let status;
  await fetch("/cart", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data[i]) {
        status = data[i].id;
      }
    })
    .catch(error => {
      console.error(error);
    });
  return status;
};

fetchProducts();

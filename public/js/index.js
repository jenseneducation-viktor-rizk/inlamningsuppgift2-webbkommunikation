const fetchProducts = async () => {
  await fetch("/products", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      appendProducts(data);
    })
    .catch(error => {
      console.error(error);
    });
};

const appendProducts = async products => {
  const container = document.createElement("div");

  let specProd = document.createTextNode(products[0].name);

  container.appendChild(specProd);
  document.querySelector(".product-container").appendChild(container);
};

document
  .querySelector(".button-products")
  .addEventListener("click", fetchProducts);

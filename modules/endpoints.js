// import
const express = require("express");
const app = express.Router();
const database = require("./database-operations");

// hämtar alla produkter
app.get("/products", async (req, res) => {
  const data = await database.getProducts();
  res.send(data);
});

// hämtar varukorgen
app.get("/cart", async (req, res) => {
  const data = await database.getCart();
  res.send(data);
});
// lägger till produkt i varukorgen från produktlistan
app.post("/cart/add/:id", async (req, res) => {
  const id = req.params.id;
  const prod = await database.getSpecProd(id);

  if (prod) {
    // om produkten finns i produktlistan

    const specCart = await database.checkIfInCart(id);

    if (!specCart) {
      // om produkten finns i produktlistan men inte i varukorgen
      const addedProd = await database.addToCart(prod);
      let message = {
        success: true,
        message: addedProd[addedProd.length - 1].name + " Added To Cart.",
        data: addedProd[addedProd.length - 1]
      };

      res.send(message);
    } else {
      // om produkten finns i produktlistan och finns i varukorgen
      let message = {
        success: false,
        message: specCart.name + " Is Already Added",
        data: specCart
      };
      res.send(message);
    }
  } else {
    // om produkten inte finns i produktlistan
    res.status(404).send("Cannot add a product that does not exist.");
  }
});
// tar bort produkt från varukorgen
app.delete("/cart/remove/:id", async (req, res) => {
  const id = req.params.id;
  const removedProd = await database.removeFromCart(id);

  if (removedProd[0]) {
    // om produkten finns i varukorgen
    let message = {
      success: true,
      message: removedProd[0].name + " Removed From Cart",
      data: removedProd[0]
    };
    res.send(message);
  } else {
    let message = {
      success: false,
      message: "There is nothing to remove."
    };
    res.status(404).send(message);
  }
});

module.exports = app;

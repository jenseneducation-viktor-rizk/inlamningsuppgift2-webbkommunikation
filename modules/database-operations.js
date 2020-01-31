// import
const lowdb = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("database.json");
const database = lowdb(adapter);

// initierar databas och
// lägger till "products:" eller/och "cart:" beroende på om dem finns eller inte
const initiateDatabase = () => {
  const hasProduct = database.has("products").value();
  const hasCart = database.has("cart").value();

  if (!hasProduct) {
    database.defaults({ products: [] }).write();
  } else if (!hasCart) {
    database.defaults({ cart: [] }).write();
  }
};

// hämtar alla produkter från databasen
const getProducts = async () => {
  return await database.get("products").value();
};

// letar efter en specifik produkt från databasen
const getSpecProd = async id => {
  return await database
    .get("products")
    .find({ id: id })
    .value();
};

// letar efter en specifik produkt i varukorg
const checkIfInCart = async id => {
  return await database
    .get("cart")
    .find({ id: id })
    .value();
};

// hämtar varukorg från databasen
const getCart = async () => {
  return await database.get("cart").value();
};

// lägger till vara i varukorgen
const addToCart = async data => {
  const res = await database
    .get("cart")
    .push(data)
    .write();
  return res;
};

// tar bort från varukorg
const removeFromCart = async id => {
  const res = await database
    .get("cart")
    .remove({ id: id })
    .write();
  return res;
};

module.exports = {
  initiateDatabase,
  getProducts,
  getSpecProd,
  checkIfInCart,
  getCart,
  addToCart,
  removeFromCart
};

// import
const express = require("express");
const app = express();
const endpoints = require("./modules/endpoints");
const database = require("./modules/database-operations");
const port = process.env.PORT || 3000;

// laddar "endpoints" från /modules/endpoints
app.use("/", endpoints);

app.listen(port, () => {
  console.log("Server started on port: ", port);
  database.initiateDatabase();
});

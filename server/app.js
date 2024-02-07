require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const db = require("./config/connection");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server now running on port ${PORT}`);
  });
});

module.exports = app;
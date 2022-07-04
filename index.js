const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://olsi:olsi@172.25.0.2:27017/?authSource=admin")
  .then(() => {
    console.log("Succeessfully connected to mongo database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>multiple@@ docker files!!</h1>");
});

const express = require("express");
const path = require("path");
// const axios = require("axios");

const app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.status(200).render("index.pug");
});

const port = 8000;
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

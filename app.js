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

// app.post("/weather_city", (req, res) => {
//     console.log(req.body.city);
//     let city = req.body.city;
//     var data = "";
//     let config = {
//       method: "get",
//       url:
//         `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=d8395d622bdb1178d90f31ca72915d78&units=metric`,
//       headers: {},
//       data: data,
//     };
//     axios(config)
//       .then(function (response) {
//         // console.log(response);
//         // console.log(response.data);
//         res.send(JSON.stringify(response.data));
//       })
//       .catch(function (error) {
//         // console.log(error);
//         console.log("Error");
//         res.send("Error");
//       });
// });

const port = 8000;
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

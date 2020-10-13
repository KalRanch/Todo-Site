//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, newItems: items });
});

app.post("/", function (req, res) {
  item = req.body.newItems;

  items.push(item);

  res.redirect("/");
});

app.listen(3001, function () {
  console.log("Server started on port 3001.");
});

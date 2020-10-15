//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];
var workItems = [];

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

  res.render("list", { listTitle: day, newItems: items });
});

app.post("/", function (req, res) {

  let item = req.body.newItems;

  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect('/')
  }

  items.push(item);

  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItems: workItems });
});

app.post('/work', function (req, res) {
  let item = req.body.newItems

  workItems.push(item)

  res.redirect("/work")
})

app.get('/about', function (req, res) {
  res.render('about')
})

app.listen(3001, function () {
  console.log("Server started on port 3001.");
});

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static('public', { 'extensions': ['html', 'htm', 'css'] }));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

var example = "working";
var items = [];
app.get("/", function (req, res) {
    res.render("list", { ejes: items });
});

app.post("/", function (req, res) {
    var item = req.body.ele1;
    items.push(item);
    res.redirect("/");
});

app.listen(8000, function () {
    console.log("server started");
});

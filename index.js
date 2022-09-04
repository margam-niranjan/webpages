//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html"); 
});

app.post("/", function (req, res) {
    const name = req.body.firstName;
    console.log(req.body.password);
    req.body.password = Number(req.body.password);
    console.log(req.body.password);
    res.send("thanks! "+name);
});

app.listen(3000, function () {
    console.log("started 3000");
});
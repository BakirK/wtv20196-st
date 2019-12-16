var express = require("express");

var app = express();

app.get("/ispisi.html",function(req,res){
    res.sendFile(__dirname+"/ispisi.html");
})
app.get("/cetvrti.js", function(req,res) {
    res.sendFile(__dirname+"/cetvrti.js");
})
app.listen(8085);
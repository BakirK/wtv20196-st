var express = require("express");
var fs = require("fs");
const csvjson = require('csvjson');

var app = express();

app.get("/ispisi.html",function(req,res){
    res.sendFile(__dirname+"/ispisi.html");
})
app.get("/cetvrti.js", function(req,res) {
    res.sendFile(__dirname+"/cetvrti.js");
})
app.get("/", function(req,res) {
    fs.readFile('imenik.txt', (err, data) => {
    if(err) {
        console.log(err);
        throw err;
    }
    let jsonObj = csvjson.toObject(data.toString());
    //res.writeHead('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.writeHead(200, {'Content-Type': 'application/json'});
    //res.writeHead("Access-Control-Allow-Origin", "*");
    //res.writeHead("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.end(JSON.stringify(jsonObj));
    });
})
app.listen(8085);

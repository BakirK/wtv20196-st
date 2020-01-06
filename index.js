var express = require("express");
const url = require('url');
var fs = require("fs");
var app = express();
const bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'imenik'
});
connection.connect();
/*
connection.query('SELECT * from imenik', function (error, results, fields) {
      if (error) throw error;
      //console.log('The solution is: ', results[0].solution);
      console.log(results);
    });
connection.end();*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/imenik",function(req,res){
    res.sendFile(__dirname+"/tabela.html");
});

app.get("/tabela.js",function(req,res){
    res.sendFile(__dirname+"/tabela.js");
});

app.get("/podaci", function(req, res) {
    connection.query('SELECT * from imenik', function (error, results, fields) {
          if (error) throw error;
          //console.log('The id is: ', results[0].id);
          //console.log(results);
          res.json(results);
          res.end();
        });
        connection.end();
});

app.listen(3000);
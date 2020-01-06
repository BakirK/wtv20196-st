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

app.post("/", function(req, res) {
//TODO
}
    res.format({
        'text/html': function () {
          let tijelo = req.body;
          let novaLinija = '\n'+tijelo['ime']+','+tijelo['prezime']+
           ','+tijelo['adresa']+','+tijelo['broj_telefona'];
          fs.appendFile('imenik.txt',novaLinija,function(err){
          if(err) throw err;
          //res.json({message:'Uspješno dodan red',data:novaLinija});
        });
        fs.readFile('imenik.txt', (err, data) => {
          if(err) {
              console.log(err);
              throw err;
          }
          let jsonObj = csvjson.toObject(data.toString());
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write('<table ><tr><th>Ime</th>');
          res.write('<th>Prezime</th>');
          res.write('<th>Adresa</th>');
          res.write('<th>Broj telefona</th></tr>');

          for (var i = 0; i < jsonObj.length; i++) {
            res.write('<tr><td>'+jsonObj[i].Ime+'</td>');
            res.write('<td>'+jsonObj[i].prezime+'</td>');
            res.write('<td>'+jsonObj[i].adresa+'</td>');
            res.write('<td>'+jsonObj[i]['broj telefona']+'</td>');
            res.write('</tr>');
          }
          res.write('</table>');
          res.send();
        });
      },
        'default': function () {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable')
        }
      });

app.listen(3000);
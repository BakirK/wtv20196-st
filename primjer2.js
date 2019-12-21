const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const csvjson = require('csvjson');
const url = require('url');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/',function(req,res){
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
  })
});




app.post('\/:\w+', function(req,res){
  res.format({
    'text/html': function () {
    fs.readFile('imenik.txt', (err, data) => {
      if(err) {
          console.log(err);
          throw err;
      }
      let jsonObj = csvjson.toObject(data.toString());
      let ime = req.url.substr(2);
      //console.log(ime);
      var filtered = jsonObj.filter(function(data) {
        return data.Ime != ime;
      });
      var podaci='Ime,prezime,adresa,broj telefona\n';
      for (var i = 0; i < filtered.length; i++) {
         podaci += filtered[i].Ime+','+filtered[i].prezime+
       ','+filtered[i].adresa+','+filtered[i]['broj telefona']+'\n';
      }
      fs.writeFile('imenik.txt', podaci, function(){console.log('Uspjesno obrisano')});

      //citanje novih podataka
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
        res.write('<th>Broj telefona</th>');
        res.write('<th>Obrisi</th>');
        res.write('<th>Izmijeni</th></tr>');

        for (var i = 0; i < jsonObj.length; i++) {
          res.write('<tr><td>'+jsonObj[i].Ime+'</td>');
          res.write('<td>'+jsonObj[i].prezime+'</td>');
          res.write('<td>'+jsonObj[i].adresa+'</td>');
          res.write('<td>'+jsonObj[i]['broj telefona']+'</td>');
          res.write('<td><form target="_self" method="POST" action="http://localhost:8085/:' + jsonObj[i].Ime +
           '">' + '<input type="submit" value="Obrisi"/></form></td>');
          res.write('<td><form><input type="submit" value="Izmijeni"/></form></td>');
          res.write('</tr>');
        }
        res.write('</table>');
        res.send();
      });
    });
  },
    'default': function () {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable')
    }
  })
});










app.get('/unos',function(req,res){
    res.sendFile(__dirname+'/forma.html');
});

app.get('/',function(req,res){
    res.format({
    'text/html': function () {
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
      res.write('<th>Broj telefona</th>');
      res.write('<th>Obrisi</th>');
      res.write('<th>Izmijeni</th></tr>');

      for (var i = 0; i < jsonObj.length; i++) {
        res.write('<tr><td>'+jsonObj[i].Ime+'</td>');
        res.write('<td>'+jsonObj[i].prezime+'</td>');
        res.write('<td>'+jsonObj[i].adresa+'</td>');
        res.write('<td>'+jsonObj[i]['broj telefona']+'</td>');
        res.write('<td><form target="_self" method="POST" action="http://localhost:8085/:' + jsonObj[i].Ime +
           '">' + '<input type="submit" value="Obrisi"/></form></td>');
        res.write('<td><form><input type="submit" value="Izmijeni"/></form></td>');
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
  })
});

app.listen(8085);

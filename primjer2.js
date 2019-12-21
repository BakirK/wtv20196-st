const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const csvjson = require('csvjson');

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





app.post('/:',function(req,res){
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
        res.write('<td><form target="_self" method="POST" action="http://localhost:8085/:'+jsonObj[i].Ime'">'+
          '<input type="submit" value="Obrisi"/></form></td>');
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

var http = require('http');
const fs = require('fs');
const csvjson = require('csvjson');
const url = require('url');

http.createServer(function (req, res) {
    if (req.method =='GET') {
		if(req.url == '/') {
			console.log('got it');
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
		    //next();
	    	res.end(JSON.stringify(jsonObj));
	    });
	    } else if(req.url.substr(0, 3) == '/?q') {
	    	const myURL = new URL('https://example.org' + req.url);
	    	let ime = myURL.searchParams.get('q').toUpperCase();
			fs.readFile('imenik.txt', (err, data) => {
		    	if(err) {
		    		console.log(err);
		    		throw err;	
		    	} 
		    	let jsonObj = csvjson.toObject(data.toString());
		    	let url = req.url.substr(1);
		    	let temp = jsonObj.filter(function (entry) {
		    		return entry.Ime.toUpperCase() === ime;
		    	});
		    	res.writeHead(200, {'Content-Type': 'application/json'});
		    	res.end(JSON.stringify(temp));
		    });
	    }
    }
    else if(req.method=='POST' && req.url == '/json'){
        let tijeloZahtjeva = '';
       	req.on('data',(data) => { tijeloZahtjeva += data; });
       	req.on('end',() => {
           //primljen čitav zahtjev
           var parametri = JSON.parse(tijeloZahtjeva);
           let novaLinija = '\n' + parametri.Ime + "," + parametri.prezime + "," + parametri.adresa + "," 
           + parametri.broj_telefona;
           fs.appendFile('imenik.txt', novaLinija , (err) => {
               if(err) throw err;
               console.log("Novi red uspješno dodan!");
               res.writeHead(200,{});
               res.end(JSON.stringify(parametri));
           });
       });
    }
    else if(req.method=='POST'){
		console.log(req.url.substr(6));
        let tijeloZahtjeva = '';
        req.on('data',function(data){
        	tijeloZahtjeva+=data;
        });
        req.on('end',function(){
            //primljen čitav zahtjev
            let parametri = new url.URLSearchParams(tijeloZahtjeva);
            let novaLinija = '\n' + parametri.get('ime')+","+parametri.get('prezime')+
                ","+parametri.get('adresa')+","+parametri.get('broj_telefona');
            fs.appendFile('imenik.txt',novaLinija,function(err){
                if(err) throw err;
                console.log("Novi red uspješno dodan!");
                res.writeHead(200,{});
                res.end(parametri.toString());
            });
        });
	}
}).listen(8080);

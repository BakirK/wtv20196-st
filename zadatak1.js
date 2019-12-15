var http = require('http');
const fs = require('fs');
const csvjson = require('csvjson');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    //res.write('<h1>Putanja zahtjeva: '+req.url+'</h1>');
    if(req.url == '/') {
    	fs.readFile('imenik.txt', (err, data) => {
	    	if(err) {
	    		console.log(err);
	    		throw err;	
	    	} 
	    	let jsonObj = csvjson.toObject(data.toString());
	    	res.end(JSON.stringify(jsonObj));
	    });
    } else {
		fs.readFile('imenik.txt', (err, data) => {
	    	if(err) {
	    		console.log(err);
	    		throw err;	
	    	} 
	    	let jsonObj = csvjson.toObject(data.toString());
	    	let url = req.url.substr(1);
	    	let temp = jsonObj.filter(function (entry) {
	    		return entry.Ime === url;
	    	});
	    	res.end(JSON.stringify(temp));
	    });
    }
    
}).listen(8080);

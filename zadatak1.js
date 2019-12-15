var http = require('http');
const fs = require('fs');
const csvjson = require('csvjson');
const url = require('url');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    if(req.url === '/') {
    	fs.readFile('imenik.txt', (err, data) => {
	    	if(err) {
	    		console.log(err);
	    		throw err;	
	    	} 
	    	let jsonObj = csvjson.toObject(data.toString());
	    	res.end(JSON.stringify(jsonObj));
	    });
    } else {
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
	    	res.end(JSON.stringify(temp));
	    });
    }
    
}).listen(8080);

const express = require('express');
const app = express();
const path = require('path');
app.get('/index.html',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
app.use('/css', express.static(path.join(__dirname)));
app.use(express.static('stranice'));
app.listen(8085);
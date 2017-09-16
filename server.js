var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); // TRY DELETING THIS LATER

var app = express();

var port = 3000;

var indexRouter = require('./routes/index');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(port, function(){
    console.log('Listening on port', port);
})
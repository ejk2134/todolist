// modules
var express = require('express');
var bodyParser = require('body-parser');
// declare app and port variables
var app = express();
var port = 3000;
// routes
var indexRouter = require('./routes/index');
var tasks = require('./routes/tasks');
// implement modules
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
// implement routes
app.use('/', indexRouter);
app.use('/tasks', tasks);
// run server
app.listen(port, function(){
    console.log('Listening on port', port);
})
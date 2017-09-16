var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res){
    console.log('base url sent to client');
    var indexPath = path.join(__dirname, '../public/views/index.html');
    res.sendFile(indexPath);
})

module.exports = router;
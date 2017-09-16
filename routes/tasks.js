var router = require('express').Router();
var pool = require('../modules/pool.js');

router.get('/', function(req, res){
    console.log('querying database');
    res.sendStatus(201);
})

module.exports = router;
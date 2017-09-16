var router = require('express').Router();
var pool = require('../modules/pool.js');

router.get('/', function(req, res){
    console.log('querying database');
    pool.connect(function(error, client, done){
        if (error){
            console.log(error);
            res.sendStatus(500);
        }else{
            client.query('SELECT * FROM tasks_todo', function(queryError, resultObj){
                done();
                if (queryError){
                    console.log(queryError);
                    res.sendStatus(500);
                }else{
                    res.send(resultObj.rows);
                }
            })
        }
    })
})

module.exports = router;
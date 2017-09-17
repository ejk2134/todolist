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

router.post('/', function(req, res){
    console.log('recieved POST request from client');
    var insertObj = req.body;
    pool.connect(function(error, client, done){
        if (error){
            console.log(error);
            res.sendStatus(500);
        }else{
            var queryText = 'INSERT INTO tasks_todo (task, description, date_added, deadlinedate, deadlinetime) VALUES($1, $2, $3, $4, $5)';
            var values = [
                insertObj.task,
                insertObj.description,
                '1989-10-18',
                insertObj.deadlinedate,
                insertObj.deadlinetime
            ]
            client.query(queryText, values, function(queryError, resultObj){
                done();
                if (queryError){
                    console.log(queryError);
                    res.sendStatus(500);
                }else{
                    console.log('INSERT query complete... **DATE ADDED NOT DONE**');
                    res.sendStatus(201);
                }
            })
        }
    })
})

module.exports = router;
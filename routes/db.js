var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

pg.defaults.ssl = true;
var pool = new pg.Pool(connectionString);

router.get('/contacts', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
    res.send('Error fetching client from pool', err);
    }
    client.query('SELECT * FROM contacts',[], function(err, result){
      done();
      if(err) {
      res.send('error running query', err);
      }
      res.send(result);
    });
  });
});

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

module.exports = router;

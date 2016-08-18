var express = require('express');
var router = express.Router();
var path = require('path');
var Pool = require('pg').Pool;
//securely access heroku postgres configuration
var parseDbUrl = require('parse-database-url');
var config = parseDbUrl(process.env.DATABASE_URL);
config.max = 10; // max number of clients in the pool
config.idleTimeoutMillis = 30000; // how long a client is allowed to remain idle before being closed
config.ssl = true; //use encryption

var pool = new Pool(config);

router.get('/contacts', function(req, res)***REMOVED***
  pool.connect(function(err, client, done)***REMOVED***
    if(err) return res.send(err.code);
    client.query('SELECT * FROM contacts', [], function(err, queryRes)***REMOVED***
      done();
      if(err) return res.send(err);
      res.send(queryRes.rows);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***);

pool.on('error', function (err, client) ***REMOVED***
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
***REMOVED***)

module.exports = router;

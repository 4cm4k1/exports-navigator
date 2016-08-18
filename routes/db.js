var express = require('express');
var router = express.Router();
var path = require('path');
var Pool = require('pg').Pool;
//securely access heroku postgres configuration
require('dotenv').config();
var config = ***REMOVED***
  host: process.env.DATABASE_HOST, //env var
  user: process.env.DATABASE_USER, //env var
  database: process.env.DATABASE_DB, //env var
  password: process.env.DATABASE_PW, //env var
  port: process.env.DATABASE_PORT, //env var
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  ssl: true
***REMOVED***;
var pool = new Pool(config);

router.get('/contacts', function(req, res)***REMOVED***
  pool.connect(function(err, client, done)***REMOVED***
    if(err) return res.send(err.code);
    client.query('SELECT * FROM contacts', [], function(err, queryRes)***REMOVED***
      done();
      if(err) return res.send(err);
      res.send(queryRes);
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

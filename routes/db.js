var express = require('express');
var router = express.Router();
var path = require('path');
var Pool = require('pg').Pool;
//securely access heroku postgres configuration
require('dotenv').config();
var parseDbUrl = require('parse-database-url');
var config = parseDbUrl(process.env.DATABASE_URL);
config.max = 10; // max number of clients in the pool
config.idleTimeoutMillis = 30000; // how long a client is allowed to remain idle before being closed
config.ssl = true; //use encryption

var pool = new Pool(config);

//routes to return each table and related foreign key data KRQ
router.get('/contacts', function(req, res)***REMOVED***
  var query = 'SELECT * FROM contacts';
  queryDB(query, []);
***REMOVED***);
router.get('/countries', function(req, res)***REMOVED***
  var query = 'SELECT * FROM countries JOIN contacts ON' +
  'contacts.id = countries.contact_id';
  queryDB(query, []);
***REMOVED***);
router.get('/industries', function(req, res)***REMOVED***
  var query = 'SELECT * FROM industries JOIN contacts ON' +
  '(contacts.id = industries.contact_1 OR contacts.id = industries.contact_2 OR' +
  'contacts.id = industries.contact_3) JOIN websites ON' +
  '(websites.id = industries.website_1 OR websites.id = industries.website_2 OR' +
  'websites.id = industries.website_3)';
  queryDB(query, []);
***REMOVED***);
router.get('/topics', function(req, res)***REMOVED***
  var query = 'SELECT * FROM topics JOIN contacts ON' +
  '(contacts.id = topics.contact_1 OR contacts.id = topics.contact_2 OR contacts.id = topics.contact_3)' +
  'JOIN websites ON (websites.id = topics.website_1 OR websites.id = topics.website_2 OR websites.id = topics.website_3)';
  queryDB(query, []);
***REMOVED***);
//refactored routes to use one function for retrieving or sending data KRQ
function queryDB(queryStatement, vars)***REMOVED***
  pool.connect(function(err, client, done)***REMOVED***
    if(err) return res.send(err.code);
    client.query(queryStatement, vars, function(err, queryRes)***REMOVED***
      done();
      if(err) return res.send(err);
      res.send(queryRes);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***;

pool.on('error', function (err, client) ***REMOVED***
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
***REMOVED***);

module.exports = router;

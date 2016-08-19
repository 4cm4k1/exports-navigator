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
  var queryResponse = queryDB(query, []);
  res.send(queryResponse);
***REMOVED***);

router.post('/contacts/create', function(req, res)***REMOVED***
  var query = 'INSERT INTO contacts' +
  '(first_name, last_name, title, organization, email, phone) VALUES' +
  '($1, $2, $3, $4, $5, $6)';
  var params = [req.body.first_name, req.body.last_name, req.body.title, req.body.organization, req.body.email, req.body.phone];
  var queryResponse = queryDB(query, []);
  res.send(queryResponse);
***REMOVED***);

router.get('/countries', function(req, res)***REMOVED***
  var query = 'SELECT * FROM countries JOIN contacts ON' +
  'contacts.id = countries.contact_id';
  var queryResponse = queryDB(query, []);
  res.send(queryResponse);
***REMOVED***);
router.get('/industries', function(req, res)***REMOVED***
  var query = 'SELECT * FROM industries JOIN contacts ON' +
  '(contacts.id = industries.contact_1 OR contacts.id = industries.contact_2 OR' +
  'contacts.id = industries.contact_3) JOIN websites ON' +
  '(websites.id = industries.website_1 OR websites.id = industries.website_2 OR' +
  'websites.id = industries.website_3)';
  var queryResponse = queryDB(query, []);
  res.send(queryResponse);
***REMOVED***);
router.get('/topics', function(req, res)***REMOVED***
  var query = 'SELECT * FROM topics JOIN contacts ON' +
  '(contacts.id = topics.contact_1 OR contacts.id = topics.contact_2 OR contacts.id = topics.contact_3)' +
  'JOIN websites ON (websites.id = topics.website_1 OR websites.id = topics.website_2 OR websites.id = topics.website_3)';
  var queryResponse = queryDB(query, []);
  res.send(queryResponse);
***REMOVED***);
//refactored routes to use one function for retrieving or sending data KRQ
function queryDB(queryStatement, vars, req, res)***REMOVED***
  pool.connect(function(err, client, done)***REMOVED***
    if(err) return err.code;
    client.query(queryStatement, vars, function(err, queryRes)***REMOVED***
      done();
      if(err) return err;
      return queryRes;
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

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
router.get('/contacts', function(req, res){
  var query = 'SELECT * FROM contacts';
  queryDB(query, [], req, res);
});

router.post('/contacts/create', function(req, res){
  var query = 'INSERT INTO contacts' +
'(first_name, last_name, title, organization, email, phone) VALUES' +
'($1, $2, $3, $4, $5, $6)';

var params = [req.body.first_name, req.body.last_name, req.body.title, req.body.organization, req.body.email, req.body.phone];
  queryDB(query, params, req, res);
});

router.get('/countries', function(req, res){
  var query = 'SELECT * FROM countries JOIN contacts ON' +
  'contacts.id = countries.contact_id';
  queryDB(query, [], req, res);
});
router.get('/industries', function(req, res){
  var query = 'SELECT * FROM industries JOIN contacts ON' +
  '(contacts.id = industries.contact_1 OR contacts.id = industries.contact_2 OR' +
  'contacts.id = industries.contact_3) JOIN websites ON' +
  '(websites.id = industries.website_1 OR websites.id = industries.website_2 OR' +
  'websites.id = industries.website_3)';
  queryDB(query, [], req, res);
});
router.get('/topics', function(req, res){
  var query = 'SELECT * FROM topics JOIN contacts ON' +
  '(contacts.id = topics.contact_1 OR contacts.id = topics.contact_2 OR contacts.id = topics.contact_3)' +
  'JOIN websites ON (websites.id = topics.website_1 OR websites.id = topics.website_2 OR websites.id = topics.website_3)';
  queryDB(query, [], req, res);
});
//refactored routes to use one function for retrieving or sending data KRQ
function queryDB(queryStatement, vars, req, res){
  pool.connect(function(err, client, done){
    if(err) return res.send(err.code);
    client.query(queryStatement, vars, function(err, queryRes){
      done();
      if(err) return res.send(err);
      res.send(queryRes);
    });
  });
};

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
});

module.exports = router;

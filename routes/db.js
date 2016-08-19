var express = require('express');
var router = express.Router();
var path = require('path');
var Pool = require('pg').Pool;
//securely access heroku postgres configuration
require('dotenv').config();
var parseDbUrl = require('parse-database-url');
var config = parseDbUrl(process.env.DATABASE_URL);
config.idleTimeoutMillis = 30000; // how long a client is allowed to remain idle before being closed
config.ssl = true; //use encryption

var pool = new Pool(config);

//routes to return each table and related foreign key data KRQ
router.get('/contacts', function(req, res)***REMOVED***
  var query = 'SELECT * FROM contacts';
  queryDB(query, [], req, res);
***REMOVED***);

router.post('/contacts/create', function(req, res)***REMOVED***
  var query = 'INSERT INTO contacts' +
  '(first_name, last_name, title, organization, email, phone) VALUES' +
  '($1, $2, $3, $4, $5, $6)';
  var params = [req.body.first_name, req.body.last_name, req.body.title, req.body.organization, req.body.email, req.body.phone];
  queryDB(query, params, req, res);
***REMOVED***);

router.get('/countries', function(req, res)***REMOVED***
  var query = 'SELECT * FROM countries JOIN contacts ON' +
  'contacts.id = countries.contact_id';
  queryDB(query, [], req, res);
***REMOVED***);
router.get('/industries', function(req, res)***REMOVED***
  var query = 'SELECT industries.id,industry,note_1,note_2,note_3,' +
              'contacts_1.first_name AS first_name_1,contacts_1.last_name AS last_name_1,contacts_1.title AS title_1,contacts_1.organization AS organization_1,contacts_1.email AS email_1,contacts_1.phone AS phone_1,' +
              'contacts_2.first_name AS first_name_2,contacts_2.last_name AS last_name_2,contacts_2.title AS title_2,contacts_2.organization AS organization_2,contacts_2.email AS email_2,contacts_2.phone AS phone_2,' +
              'contacts_3.first_name AS first_name_3,contacts_3.last_name AS last_name_3,contacts_3.title AS title_3,contacts_3.organization AS organization_3,contacts_3.email AS email_3,contacts_3.phone AS phone_3,' +
              'websites_1.website AS website_1,' +
              'websites_2.website AS website_2,' +
              'websites_3.website AS website_3' +
              'FROM industries' +
              'LEFT OUTER JOIN contacts AS contacts_1 ON topics.contact_1=contacts_1.id' +
              'LEFT OUTER JOIN contacts AS contacts_2 ON topics.contact_2=contacts_2.id' +
              'LEFT OUTER JOIN contacts AS contacts_3 ON topics.contact_3=contacts_3.id' +
              'LEFT OUTER JOIN websites AS websites_1 ON topics.website_1=websites_1.id' +
              'LEFT OUTER JOIN websites AS websites_2 ON topics.website_2=websites_2.id' +
              'LEFT OUTER JOIN websites AS websites_3 ON topics.website_3=websites_3.id' +
              'ORDER BY industries.id;';

  queryDB(query, [], req, res);
***REMOVED***);
router.get('/topics', function(req, res)***REMOVED***
  var query = 'SELECT topics.id,topic,note_1,note_2,note_3,' +
		          'contacts_1.first_name AS first_name_1,contacts_1.last_name AS last_name_1,contacts_1.title AS title_1,contacts_1.organization AS organization_1,contacts_1.email AS email_1,contacts_1.phone AS phone_1,' +
		          'contacts_2.first_name AS first_name_2,contacts_2.last_name AS last_name_2,contacts_2.title AS title_2,contacts_2.organization AS organization_2,contacts_2.email AS email_2,contacts_2.phone AS phone_2,' +
		          'contacts_3.first_name AS first_name_3,contacts_3.last_name AS last_name_3,contacts_3.title AS title_3,contacts_3.organization AS organization_3,contacts_3.email AS email_3,contacts_3.phone AS phone_3,' +
		          'websites_1.website AS website_1,' +
		          'websites_2.website AS website_2,' +
		          'websites_3.website AS website_3' +
              'FROM topics' +
              'LEFT OUTER JOIN contacts AS contacts_1 ON topics.contact_1=contacts_1.id' +
              'LEFT OUTER JOIN contacts AS contacts_2 ON topics.contact_2=contacts_2.id' +
              'LEFT OUTER JOIN contacts AS contacts_3 ON topics.contact_3=contacts_3.id' +
              'LEFT OUTER JOIN websites AS websites_1 ON topics.website_1=websites_1.id' +
              'LEFT OUTER JOIN websites AS websites_2 ON topics.website_2=websites_2.id' +
              'LEFT OUTER JOIN websites AS websites_3 ON topics.website_3=websites_3.id' +
              'ORDER BY topics.id;';
  queryDB(query, [], req, res);
***REMOVED***);
//refactored routes to use one function for retrieving or sending data KRQ
function queryDB(queryStatement, vars, req, res)***REMOVED***
  pool.connect(function(err, client, done)***REMOVED***
    if(err) res.send(err.code);
    client.query(queryStatement, vars, function(err, queryRes)***REMOVED***
      done();
      if(err) res.send(err);
      res.send(queryRes);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

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

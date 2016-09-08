var express = require('express');
var router = express.Router();
var path = require('path');
var Pool = require('pg').Pool;
var json2csv = require('json2csv');
var Converter = require("csvtojson").Converter;
var fs = require('fs');
require('dotenv').config();
//user authentication on admin routes KRQ
var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: {
    "type": "service_account",
    "project_id": "exports-navigator",
    "private_key_id": process.env.FIREBASE_KEY_ID,
    "private_key": process.env.FIREBASE_KEY,
    "client_email": "exports-navigator@exports-navigator.iam.gserviceaccount.com",
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/exports-navigator%40exports-navigator.iam.gserviceaccount.com"
  }
});
//securely access heroku postgres configuration
var parseDbUrl = require('parse-database-url');
var config = parseDbUrl(process.env.DATABASE_URL);
config.idleTimeoutMillis = 30000; // how long a client is allowed to remain idle before being closed
config.ssl = true; //use encryption

var pool = new Pool(config);

//display all backups for a specific table KRQ
router.post('/backups', function(req, res){
  var table = req.body.table;
  fs.readdir('./backups/' + table +'/', function(err, files){
    if(err){
      res.sendStatus(500);
      console.log(err);
    }else{
      res.send(files);
    }
  });
});

//export a table to csv using json2csv KRQ
router.post('/backups/create', function(req, res){
  var table = req.body.table;
  var fields = req.body.fields;
  table2csv(table, fields, req, res);
});

//delete a backup of a table KRQ
router.delete('/backups/delete', function(req, res){
  var table = req.body.table;
  var name = req.body.name;
  fs.unlink('./backups/' + table +'/' + name, function(err, success){
    if(err){
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

//restore a table backup KRQ
router.post('/backups/restore', function(req, res){
  var table = req.body.table;
  var file = req.body.file;
  var converter = new Converter({});
  converter.fromFile('/backups/' + table + '/' + file,function(err,result){
    if(err) res.sendStatus(500);
    console.log(result);
    // var query = 'INSERT INTO ' + table + '';
    // queryDB(query, [], req, res);
  });
});

//clear contents in a table in preparation for restoring backup KRQ
router.post('/clearTable', function(req, res){
  var table = req.body.table;
  var query = 'DELETE FROM ' + table;
  queryDB(query, [], req, res);
});

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

router.put('/contacts/update', function(req, res){
  var query = 'UPDATE contacts SET (first_name, last_name, title, organization, email, phone) = ' +
  '($1, $2, $3, $4, $5, $6)' +
  'WHERE id =' + req.body.id;
  var params = [req.body.first_name, req.body.last_name, req.body.title, req.body.organization, req.body.email, req.body.phone];
  queryDB(query, params, req, res);
});

router.delete('/contacts/delete/:id', function(req, res){
  var query = 'DELETE FROM contacts WHERE id =' + req.params.id;
  queryDB(query, [], req, res);
});

router.get('/countries', function(req, res){
  var query = 'SELECT countries.id, countries.country, countries.note, ' +
  'contacts.id AS contact_id, contacts.first_name AS first_name, ' +
  'contacts.last_name AS last_name, contacts.title AS title, ' +
  'contacts.organization AS organization, contacts.email AS email, ' +
  'contacts.phone as phone FROM countries ' +
  'JOIN contacts ON countries.contact_id = contacts.id ORDER BY country';
  queryDB(query, [], req, res);
});

router.post('/countries/create', function(req, res){
  var query = 'INSERT INTO countries' +
'(country, contact_id, note) VALUES' +
'($1, $2, $3)';
var params = [req.body.country, req.body.contact_id, req.body.note];
  queryDB(query, params, req, res);
});

router.put('/countries/update', function(req, res){
  var query = 'UPDATE countries SET (contact_id, country, note) = ' +
  '($1, $2, $3)' +
  'WHERE id =' + req.body.id;
  var params = [req.body.contact_id, req.body.country, req.body.note];
  queryDB(query, params, req, res);
});

router.delete('/countries/delete/:id', function(req, res){
  var query = 'DELETE FROM countries WHERE id =' + req.params.id;
  queryDB(query, [], req, res);
});

router.get('/industries', function(req, res){
  var query = 'SELECT industries.id,industry,industries.note_1,industries.note_2,industries.note_3, ' +
              'contacts_1.id AS contact_id_1,contacts_1.first_name AS first_name_1,contacts_1.last_name AS last_name_1,contacts_1.title AS title_1,contacts_1.organization AS organization_1,contacts_1.email AS email_1,contacts_1.phone AS phone_1, ' +
              'contacts_2.id AS contact_id_2,contacts_2.first_name AS first_name_2,contacts_2.last_name AS last_name_2,contacts_2.title AS title_2,contacts_2.organization AS organization_2,contacts_2.email AS email_2,contacts_2.phone AS phone_2, ' +
              'contacts_3.id AS contact_id_3,contacts_3.first_name AS first_name_3,contacts_3.last_name AS last_name_3,contacts_3.title AS title_3,contacts_3.organization AS organization_3,contacts_3.email AS email_3,contacts_3.phone AS phone_3, ' +
              'websites_1.website AS website_1, ' +
              'websites_2.website AS website_2, ' +
              'websites_3.website AS website_3 ' +
              'FROM industries ' +
              'LEFT OUTER JOIN contacts AS contacts_1 ON industries.contact_1=contacts_1.id ' +
              'LEFT OUTER JOIN contacts AS contacts_2 ON industries.contact_2=contacts_2.id ' +
              'LEFT OUTER JOIN contacts AS contacts_3 ON industries.contact_3=contacts_3.id ' +
              'LEFT OUTER JOIN websites AS websites_1 ON industries.website_1=websites_1.id ' +
              'LEFT OUTER JOIN websites AS websites_2 ON industries.website_2=websites_2.id ' +
              'LEFT OUTER JOIN websites AS websites_3 ON industries.website_3=websites_3.id ' +
              'ORDER BY industries.id ';
  queryDB(query, [], req, res);
});


router.post('/industries/create', function(req, res){
  var query = 'INSERT INTO industries' +
'(industry, note_1, note_2, note_3, contact_1, contact_2, contact_3, website_1, website_2, website_3) VALUES' +
'($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
var params = [req.body.industry, req.body.note_1, req.body.note_2, req.body.note_3, req.body.contact_1, req.body.contact_2, req.body.contact_3, req.body.website_1, req.body.website_2, req.body.website_3];
  queryDB(query, params, req, res);
});

router.put('/industries/update', function(req, res){
  var query = 'UPDATE industries SET (industry, note_1, note_2, note_3, contact_1, contact_2, contact_3, website_1, website_2, website_3) = ' +
  '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)' +
  'WHERE id =' + req.body.id;
  var params = [req.body.industry, req.body.note_1, req.body.note_2, req.body.note_3, req.body.contact_1, req.body.contact_2, req.body.contact_3, req.body.website_1, req.body.website_2, req.body.website_3];
  queryDB(query, params, req, res);
});

router.delete('/industries/delete/:id', function(req, res){
  var query = 'DELETE FROM industries WHERE id =' + req.params.id;
  queryDB(query, [], req, res);
});

router.get('/topics', function(req, res){
  var query = 'SELECT topics.id,topic,note_1,note_2,note_3,' +
  'contacts_1.id AS contact_id_1,contacts_1.first_name AS first_name_1,contacts_1.last_name AS last_name_1,contacts_1.title AS title_1,contacts_1.organization AS organization_1,contacts_1.email AS email_1,contacts_1.phone AS phone_1, ' +
  'contacts_2.id AS contact_id_2,contacts_2.first_name AS first_name_2,contacts_2.last_name AS last_name_2,contacts_2.title AS title_2,contacts_2.organization AS organization_2,contacts_2.email AS email_2,contacts_2.phone AS phone_2, ' +
  'contacts_3.id AS contact_id_3,contacts_3.first_name AS first_name_3,contacts_3.last_name AS last_name_3,contacts_3.title AS title_3,contacts_3.organization AS organization_3,contacts_3.email AS email_3,contacts_3.phone AS phone_3, ' +
  'websites_1.website AS website_1, websites_1.id AS website_id_1, websites_2.website AS website_2, websites_2.id AS website_id_2, websites_3.website AS website_3, websites_3.id AS website_id_3 ' +
  'FROM topics ' +
  'LEFT OUTER JOIN contacts AS contacts_1 ON topics.contact_1=contacts_1.id ' +
  'LEFT OUTER JOIN contacts AS contacts_2 ON topics.contact_2=contacts_2.id ' +
  'LEFT OUTER JOIN contacts AS contacts_3 ON topics.contact_3=contacts_3.id ' +
  'LEFT OUTER JOIN websites AS websites_1 ON topics.website_1=websites_1.id ' +
  'LEFT OUTER JOIN websites AS websites_2 ON topics.website_2=websites_2.id ' +
  'LEFT OUTER JOIN websites AS websites_3 ON topics.website_3=websites_3.id ' +
  'ORDER BY topics.id ';
  queryDB(query, [], req, res);
});

router.post('/topics/create', function(req, res){
  var query = 'INSERT INTO topics' +
'(topic, note_1, note_2, note_3, contact_1, contact_2, contact_3, website_1, website_2, website_3) VALUES' +
'($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
var params = [req.body.topic, req.body.note_1, req.body.note_2, req.body.note_3, req.body.contact_1, req.body.contact_2, req.body.contact_3, req.body.website_1, req.body.website_2, req.body.website_3];
  queryDB(query, params, req, res);
});

router.put('/topics/update', function(req, res){
  console.log('request.body:', req.body);
  var query = 'UPDATE topics SET (topic, note_1, note_2, note_3, contact_1, contact_2, contact_3, website_1, website_2, website_3) = ' +
  '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)' +
  'WHERE id =' + req.body.id;
  var params = [req.body.topic, req.body.note_1, req.body.note_2, req.body.note_3, req.body.contact_1, req.body.contact_2, req.body.contact_3, req.body.website_1, req.body.website_2, req.body.website_3];
  queryDB(query, params, req, res);
});

router.delete('/topics/delete/:id', function(req, res){
  var query = 'DELETE FROM topics WHERE id = ' + req.params.id;
  queryDB(query, [], req, res);
});

//below is the route specifically for the function which updates the
//number of hits for a specific topic which exists in the DB
router.put('/topics/update/number_of_hits', function(req, res){
  var query = 'UPDATE topics SET number_of_hits = number_of_hits + 1' +
    'WHERE id =' + req.body.id;
  queryDB(query, [], req, res);
});

router.put('/topics/update/unmatched_number_of_hits', function(req, res){
  var query = 'UPDATE unmatched_topics SET unmatched_number_of_hits = unmatched_number_of_hits + 1 ' +
    'WHERE id =' + req.body.id;
  queryDB(query, [], req, res);
});


router.get('/websites', function(req, res){
  var query = 'SELECT * FROM websites';
  queryDB(query, [], req, res);
});

router.post('/websites/create', function(req, res){
  var query = 'INSERT INTO websites' +
  '(website) VALUES ' +
  '($1)';
  var params = [req.body.website];
  queryDB(query, params, req, res);
});

router.put('/websites/update', function(req, res){
  var query = 'UPDATE websites SET (website) = ' +
  '($1)' +
  'WHERE id =' + req.body.id;
  var params = [req.body.website];
  queryDB(query, params, req, res);
});

router.delete('/websites/delete/:id', function(req, res){
  var query = 'DELETE FROM websites WHERE id =' + req.params.id;
  queryDB(query, [], req, res);
});

//  ~ Admin Reports
//below are routes for ADMIN REPORTS PURPOSES
router.get('/unmatched', function(req, res){
  var query = 'SELECT * FROM unmatched_topics ORDER BY unmatched_number_of_hits DESC';
  queryDB(query, [], req, res);
});

router.post('/unmatched/create', function(req, res){
  var query = 'INSERT INTO unmatched_topics' +
'(unmatched_topic) VALUES' +
'($1)';
var params = [req.body.unmatched_topic];
  queryDB(query, params, req, res);
});

router.get('/topics/number_of_hits', function(req, res){
  var query = 'SELECT topics.id, topic, number_of_hits FROM topics ORDER BY number_of_hits DESC';
  queryDB(query, [], req, res);
});


router.get('/last_resort', function(req, res){
    var query = 'SELECT last_resort.id,topic,note_1,note_2,note_3,' +
    'contacts_1.id AS contact_id_1,contacts_1.first_name AS first_name_1,contacts_1.last_name AS last_name_1,contacts_1.title AS title_1,contacts_1.organization AS organization_1,contacts_1.email AS email_1,contacts_1.phone AS phone_1, ' +
    'contacts_2.id AS contact_id_2,contacts_2.first_name AS first_name_2,contacts_2.last_name AS last_name_2,contacts_2.title AS title_2,contacts_2.organization AS organization_2,contacts_2.email AS email_2,contacts_2.phone AS phone_2, ' +
    'contacts_3.id AS contact_id_3,contacts_3.first_name AS first_name_3,contacts_3.last_name AS last_name_3,contacts_3.title AS title_3,contacts_3.organization AS organization_3,contacts_3.email AS email_3,contacts_3.phone AS phone_3, ' +
    'websites_1.website AS website_1, websites_1.id AS website_id_1, websites_2.website AS website_2, websites_2.id AS website_id_2, websites_3.website AS website_3, websites_3.id AS website_id_3 ' +
    'FROM last_resort ' +
    'LEFT OUTER JOIN contacts AS contacts_1 ON last_resort.contact_1=contacts_1.id ' +
    'LEFT OUTER JOIN contacts AS contacts_2 ON last_resort.contact_2=contacts_2.id ' +
    'LEFT OUTER JOIN contacts AS contacts_3 ON last_resort.contact_3=contacts_3.id ' +
    'LEFT OUTER JOIN websites AS websites_1 ON last_resort.website_1=websites_1.id ' +
    'LEFT OUTER JOIN websites AS websites_2 ON last_resort.website_2=websites_2.id ' +
    'LEFT OUTER JOIN websites AS websites_3 ON last_resort.website_3=websites_3.id ' +
    'ORDER BY last_resort.id ';
    queryDB(query, [], req, res);
  });

//route to test firebase authentication KRQ
router.get('/testUserAuth', function(req, res){
  var authenticated = checkUserAuth();
  console.log(authenticated);
  if(authenticated.success){
    res.send('Authenticated: ' + authenticated.message);
  } else {
    res.send('Authenticated: ' + authenticated.message);
  }
});

//route to test json2csv
router.get('/testJson2Csv', function(req, res){
  var table = 'contacts';
  var fields = ['id', 'first_name', 'last_name', 'title', 'organization', 'email', 'phone'];
  table2csv(table, fields, req, res);
});

//refactored routes to use one function for retrieving or sending data KRQ
function queryDB(queryStatement, vars, req, res){
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Error in connecting to db');
      res.send(err.code);
    }
    client.query(queryStatement, vars, function(err, queryRes){
      done();
      if(err){
        console.log('Error from db.js, error:', err);
        res.send(err);
      }else{
        res.send(queryRes);
      }
    });
  });
}
//query function to return json to export KRQ
function table2csv(table, fields, req, res){
  pool.connect(function(err, client, done){
    if(err) res.send(err.code);
    client.query('SELECT * FROM ' + table, [], function(err, queryRes){
      done();
      if(err){
        res.sendStatus(500);
      }else{
        // try{
          var csv = json2csv({data: queryRes.rows, fields: fields});
        // } catch(err) {
        //   // Errors are thrown for bad options, or if the data is empty and no fields are provided.
        //   // Be sure to provide fields if it is possible that your data array will be empty.
        //   console.error('json2csv error: ',err);
        // }
        var d = new Date();
        var date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '-' + d.getHours() + ':' + d.getMinutes();
        fs.writeFile('./backups/' + table + '/' + date + '-' + table + '.csv', function(err) {
          if (err) throw err;
        });
        res.sendStatus(200);
      }
    });
  });
}
//function for protected routes KRQ
function checkUserAuth(){
    //check firebase authentication
}

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

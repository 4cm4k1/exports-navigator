var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

pg.defaults.ssl = true;

router.get('/contacts', function(req, res)***REMOVED***
  pg.connect(process.env.DATABASE_URL, function(err, client) ***REMOVED***
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');
    client
      .query('SELECT * FROM contacts')
      .on('row', function(row) ***REMOVED***
        console.log(JSON.stringify(row));
      ***REMOVED***);
  ***REMOVED***);
***REMOVED***);

module.exports = router;

var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

pg.defaults.ssl = true;

router.get('/contacts', function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');
    client
      .query('SELECT * FROM contacts')
      .on('row', function(row) {
        console.log(JSON.stringify(row));
      });
  });
});

module.exports = router;

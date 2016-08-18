var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var dbRoutes = require('./routes/db');

app.use(express.static('public'));
app.use(bodyParser.json());

//  routes specifically to server/DB go below here
//      app.get('/something', function(req, res)***REMOVED*** ... ***REMOVED***);
app.use('/', dbRoutes);

//  catch-all route (ie, our Angular SPA will handle it)
app.get('/*', function(req, res) ***REMOVED***
    res.sendFile(path.join(__dirname, './public/index.html'));
***REMOVED***);

var server = app.listen(process.env.PORT || 3000, initServer);

function initServer() ***REMOVED***
    var port = server.address().port;
    console.log('Listening on port', port, '\nCtrl-C to kill server');
***REMOVED***

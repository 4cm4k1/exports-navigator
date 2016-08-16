/**
 *  Firebase libraries for Node.js.
 *
 * Usage:
 *
 *   firebase = require('firebase');
 */
var firebase = require('./app-node');
var Storage = require('dom-storage');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

firebase.INTERNAL.extendNamespace(***REMOVED***
  'INTERNAL': ***REMOVED***
    'node': ***REMOVED***
      'localStorage': new Storage(null, ***REMOVED*** strict: true ***REMOVED***),
      'sessionStorage': new Storage(null, ***REMOVED*** strict: true ***REMOVED***),
      'XMLHttpRequest': XMLHttpRequest
    ***REMOVED***
  ***REMOVED***
***REMOVED***);

require('./auth-node');
require('./database-node');
module.exports = firebase;

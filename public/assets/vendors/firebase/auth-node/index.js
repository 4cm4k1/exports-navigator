/*! @license Firebase v3.3.0
    Build: 3.3.0-rc.7
    Terms: https://developers.google.com/terms */
'use strict';

var Auth = require('./auth.js');
var firebase = require('../app-node');

/**
 * Factory function that creates a new auth service.
 * @param ***REMOVED***Object***REMOVED*** app The app for this service
 * @param ***REMOVED***function(Object)***REMOVED*** extendApp An extend function to extend the app
 *                                     namespace
 * @return ***REMOVED***Auth***REMOVED*** The auth service for the specified app.
 */
var serviceFactory = function(app, extendApp) ***REMOVED***
  var auth = new Auth(app);
  extendApp(***REMOVED***
    'INTERNAL': ***REMOVED***
      'getToken': auth.INTERNAL.getToken.bind(auth),
      'addAuthTokenListener': auth.INTERNAL.addAuthTokenListener.bind(auth),
      'removeAuthTokenListener': auth.INTERNAL.removeAuthTokenListener.bind(auth)
    ***REMOVED***
  ***REMOVED***);
  return auth;
***REMOVED***;

/**
 * Create a hook to initialize auth so auth listeners and getToken
 * functions are available to other services immediately.
 * @param ***REMOVED***string***REMOVED*** event
 * @param ***REMOVED***Object***REMOVED*** app
 */
function appHook(event, app) ***REMOVED***
  if (event === 'create') ***REMOVED***
    app.auth();
  ***REMOVED***
***REMOVED***

module.exports = firebase.INTERNAL.registerService(
  'serverAuth',
  serviceFactory,
  ***REMOVED***'Auth': Auth***REMOVED***,
  appHook);

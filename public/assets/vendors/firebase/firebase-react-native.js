/**
 *  Firebase libraries for React Native.
 *
 * Usage:
 *
 *   firebase = require('firebase');
 */

var firebase = require('./app');
require('./database');
require('./auth');
require('./storage');
var AsyncStorage = require('react-native').AsyncStorage;
firebase.INTERNAL.extendNamespace(***REMOVED***
 'INTERNAL': ***REMOVED***
   'reactNative': ***REMOVED***
     'AsyncStorage': AsyncStorage
   ***REMOVED***
 ***REMOVED***
***REMOVED***);
module.exports = firebase;

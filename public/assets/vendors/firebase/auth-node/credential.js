/*! @license Firebase v3.3.0
    Build: 3.3.0-rc.7
    Terms: https://developers.google.com/terms */
'use strict';

var https = require('https');
var jwt = require('jsonwebtoken');
var firebase = require('../app-node');

var GOOGLE_TOKEN_AUDIENCE = 'https://accounts.google.com/o/oauth2/token';
var GOOGLE_AUTH_TOKEN_HOST = 'accounts.google.com';
var GOOGLE_AUTH_TOKEN_PATH = '/o/oauth2/token';
var GOOGLE_AUTH_TOKEN_PORT = 443;

var ONE_HOUR_IN_SECONDS = 60 * 60;
var JWT_ALGORITHM = 'RS256';

/**
 * Interface for things that generate access tokens.
 * Should possibly be moved to a Credential namespace before making public.
 * @interface
 */
var Credential = function() ***REMOVED******REMOVED***;

/**
 * A struct containing information needed to authenticate requests to Firebase.
 * It has the fields access_token (String) and expires_in (int)
 * @record
 */
// eslint-disable-next-line no-unused-vars
var AccessToken = function() ***REMOVED******REMOVED***;

/**
 * A struct containing the fields necessary to use service-account based authentication.
 * It has the fields project_id (String), client_key (String), and email (String)
 * @record
 */
// eslint-disable-next-line no-unused-vars
var ServiceAccount = function() ***REMOVED******REMOVED***;

/**
 * Get an access token. This method does not do any sort of caching.
 * @return ***REMOVED***Promise<?AccessToken>***REMOVED***
 */
Credential.prototype.getAccessToken = function() ***REMOVED******REMOVED***;

/**
 * Implementation of Credential that uses a service account certificate.
 *
 * @implements ***REMOVED***Credential***REMOVED***
 * @constructor
 * @param ***REMOVED***ServiceAccount***REMOVED*** serviceAccount
 */
var CertCredential = function(serviceAccount) ***REMOVED***
  this.serviceAccount_ = serviceAccount;
***REMOVED***;

/**
 * Fetches a new access token by making a HTTP request to the
 * specified OAuth endpoint
 * @return ***REMOVED***Promise<?AccessToken>***REMOVED***
 */
CertCredential.prototype.getAccessToken = function() ***REMOVED***
  var token = this.authJwt();
  return new firebase.Promise(function(resolve, reject) ***REMOVED***
    var postData = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3A' +
        'grant-type%3Ajwt-bearer&assertion=' +
        token;
    var options = ***REMOVED***
      method: 'POST',
      host: GOOGLE_AUTH_TOKEN_HOST,
      port: GOOGLE_AUTH_TOKEN_PORT,
      path: GOOGLE_AUTH_TOKEN_PATH,
      headers: ***REMOVED***
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      ***REMOVED***
    ***REMOVED***;
    var req = https.request(options, function(res) ***REMOVED***
      var buffers = [];
      res.on('data', function(buffer) ***REMOVED***
        buffers.push(buffer);
      ***REMOVED***);
      res.on('end', function() ***REMOVED***
        try ***REMOVED***
          var json = JSON.parse(Buffer.concat(buffers));
          if (json.error) ***REMOVED***
            var msg = 'Error refreshing access token: ' + json.error;
            if (json.error_description) ***REMOVED***
              msg += ' (' + json.error_description + ')';
            ***REMOVED***
            reject(new Error(msg));
          ***REMOVED*** else if (!json.access_token || !json.expires_in) ***REMOVED***
            reject(new Error('Unexpected response from OAuth server'));
          ***REMOVED*** else ***REMOVED***
            resolve(json);
          ***REMOVED***
        ***REMOVED*** catch (err) ***REMOVED***
          reject(err);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***);
    req.on('error', reject);
    req.write(postData);
    req.end();
  ***REMOVED***);
***REMOVED***;

/**
 * Generates a JWT that is used to retrieve an access token
 */
CertCredential.prototype.authJwt = function() ***REMOVED***
  var claims = ***REMOVED***
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/firebase.database',
    ].join(' ')
  ***REMOVED***;
  return jwt.sign(claims, this.serviceAccount_.private_key, ***REMOVED***
    audience: GOOGLE_TOKEN_AUDIENCE,
    expiresIn: ONE_HOUR_IN_SECONDS,
    issuer: this.serviceAccount_.client_email,
    algorithm: JWT_ALGORITHM
  ***REMOVED***);
***REMOVED***;

/**
 * UnauthenticatedCredential fufills the Credential contract by returning
 * null for getAccessToken
 * @implements ***REMOVED***Credential***REMOVED***
 * @constructor
 */
var UnauthenticatedCredential = function() ***REMOVED******REMOVED***;

/**
 * Noop implementation of Credential.getToken that returns a Promise of null.
 * @return ***REMOVED***Promise<?AccessToken>***REMOVED***
 */
UnauthenticatedCredential.prototype.getAccessToken = function() ***REMOVED***
  return firebase.Promise.resolve(null);
***REMOVED***;

module.exports.Credential = Credential;
module.exports.CertCredential = CertCredential;
module.exports.UnauthenticatedCredential = UnauthenticatedCredential;


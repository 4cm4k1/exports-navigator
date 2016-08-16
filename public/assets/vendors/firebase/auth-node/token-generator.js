/*! @license Firebase v3.3.0
    Build: 3.3.0-rc.7
    Terms: https://developers.google.com/terms */
'use strict';

var fs = require('fs');
var https = require('https');
var jwt = require('jsonwebtoken');
var firebase = require('../app-node');


var ALGORITHM = 'RS256';
var ONE_HOUR_IN_SECONDS = 60 * 60;

// List of blacklisted claims which cannot be provided when creating a custom token
var BLACKLISTED_CLAIMS = [
  'acr', 'amr', 'at_hash', 'aud', 'auth_time', 'azp', 'cnf', 'c_hash', 'exp', 'iat', 'iss', 'jti',
  'nbf', 'nonce'
];

// URL containing the public keys for the Google certs (whose private keys are used to sign Firebase
// Auth ID tokens)
var CLIENT_CERT_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

// Audience to use for Firebase Auth Custom tokens
var FIREBASE_AUDIENCE = 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit';


/**
 * Class for generating and verifying different types of Firebase Auth tokens (JWTs).
 *
 * @constructor
 * @param ***REMOVED***string|Object***REMOVED*** serviceAccount Either the path to a service account key or the service account key itself.
 */
var FirebaseTokenGenerator = function(serviceAccount) ***REMOVED***
  serviceAccount = serviceAccount || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (typeof serviceAccount === 'string') ***REMOVED***
    try ***REMOVED***
      this.serviceAccount = JSON.parse(fs.readFileSync(serviceAccount, 'utf8'));
    ***REMOVED*** catch (error) ***REMOVED***
      throw new Error('Failed to parse service account key file: ' + error);
    ***REMOVED***
  ***REMOVED*** else if (typeof serviceAccount === 'object' && serviceAccount !== null) ***REMOVED***
    this.serviceAccount = serviceAccount;
  ***REMOVED*** else ***REMOVED***
    throw new Error('Must provide a service account to use FirebaseTokenGenerator');
  ***REMOVED***

  if (typeof this.serviceAccount.private_key !== 'string' || this.serviceAccount.private_key === '') ***REMOVED***
    throw new Error('Service account key must contain a string "private_key" field');
  ***REMOVED*** else if (typeof this.serviceAccount.client_email !== 'string' || this.serviceAccount.client_email === '') ***REMOVED***
    throw new Error('Service account key must contain a string "client_email" field');
  ***REMOVED***
***REMOVED***;


/**
 * Creates a new Firebase Auth Custom token.
 *
 * @param ***REMOVED***string***REMOVED*** uid The user ID to use for the generated Firebase Auth Custom token.
 * @param ***REMOVED***Object***REMOVED*** [developerClaims] Optional developer claims to include in the generated Firebase
 *                 Auth Custom token.
 * @return ***REMOVED***string***REMOVED*** A Firebase Auth Custom token signed with a service account key and containing
 *                  the provided payload.
 */
FirebaseTokenGenerator.prototype.createCustomToken = function(uid, developerClaims) ***REMOVED***
  if (typeof uid !== 'string' || uid === '') ***REMOVED***
    throw new Error('First argument to createCustomToken() must be a non-empty string uid');
  ***REMOVED*** else if (uid.length > 128) ***REMOVED***
    throw new Error('First argument to createCustomToken() must a uid with less than or equal to 128 characters');
  ***REMOVED*** else if (typeof developerClaims !== 'undefined' && (typeof developerClaims !== 'object' || developerClaims === null || developerClaims instanceof Array)) ***REMOVED***
    throw new Error('Optional second argument to createCustomToken() must be an object containing the developer claims');
  ***REMOVED***

  var jwtPayload = ***REMOVED******REMOVED***;

  if (typeof developerClaims !== 'undefined') ***REMOVED***
    jwtPayload.claims = ***REMOVED******REMOVED***;

    for (var key in developerClaims) ***REMOVED***
      /* istanbul ignore else */
      if (developerClaims.hasOwnProperty(key)) ***REMOVED***
        if (BLACKLISTED_CLAIMS.indexOf(key) !== -1) ***REMOVED***
          throw new Error('Developer claim "' + key + '" is reserved and cannot be specified');
        ***REMOVED***

        jwtPayload.claims[key] = developerClaims[key];
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  jwtPayload.uid = uid;

  return jwt.sign(jwtPayload, this.serviceAccount.private_key, ***REMOVED***
    audience: FIREBASE_AUDIENCE,
    expiresIn: ONE_HOUR_IN_SECONDS,
    issuer: this.serviceAccount.client_email,
    subject: this.serviceAccount.client_email,
    algorithm: ALGORITHM
  ***REMOVED***);
***REMOVED***;


/**
 * Verifies the format and signature of a Firebase Auth ID token.
 *
 * @param ***REMOVED***string***REMOVED*** idToken The Firebase Auth ID token to verify.
 * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with the decoded claims of the Firebase Auth ID
 *                           token.
 */
FirebaseTokenGenerator.prototype.verifyIdToken = function(idToken) ***REMOVED***
  if (typeof idToken !== 'string') ***REMOVED***
    throw new Error('First argument to verifyIdToken() must be a Firebase ID token');
  ***REMOVED***

  if (typeof this.serviceAccount.project_id !== 'string' || this.serviceAccount.project_id === '') ***REMOVED***
    throw new Error('verifyIdToken() requires a service account with "project_id" set');
  ***REMOVED***

  var fullDecodedToken = jwt.decode(idToken, ***REMOVED***
    complete: true
  ***REMOVED***);

  var header = fullDecodedToken && fullDecodedToken.header;
  var payload = fullDecodedToken && fullDecodedToken.payload;

  var projectIdMatchMessage = ' Make sure the ID token comes from the same Firebase project as the ' +
    'service account used to authenticate this SDK.';
  var verifyIdTokenDocsMessage = ' See https://firebase.google.com/docs/auth/server/verify-id-tokens ' +
    'for details on how to retrieve an ID token.';

  var errorMessage;
  if (!fullDecodedToken) ***REMOVED***
    errorMessage = 'Decoding Firebase ID token failed. Make sure you passed the entire string JWT ' +
      'which represents an ID token.' + verifyIdTokenDocsMessage;
  ***REMOVED*** else if (typeof header.kid === 'undefined') ***REMOVED***
    var isCustomToken = (payload.aud === FIREBASE_AUDIENCE);
    var isLegacyCustomToken = (header.alg === 'HS256' && payload.v === 0 && 'd' in payload && 'uid' in payload.d);

    if (isCustomToken) ***REMOVED***
      errorMessage = 'verifyIdToken() expects an ID token, but was given a custom token.';
    ***REMOVED*** else if (isLegacyCustomToken) ***REMOVED***
      errorMessage = 'verifyIdToken() expects an ID token, but was given a legacy custom token.';
    ***REMOVED*** else ***REMOVED***
      errorMessage = 'Firebase ID token has no "kid" claim.';
    ***REMOVED***

    errorMessage += verifyIdTokenDocsMessage;
  ***REMOVED*** else if (header.alg !== ALGORITHM) ***REMOVED***
    errorMessage = 'Firebase ID token has incorrect algorithm. Expected "' + ALGORITHM + '" but got ' +
      '"' + header.alg + '".' + verifyIdTokenDocsMessage;
  ***REMOVED*** else if (payload.aud !== this.serviceAccount.project_id) ***REMOVED***
    errorMessage = 'Firebase ID token has incorrect "aud" (audience) claim. Expected "' + this.serviceAccount.project_id +
      '" but got "' + payload.aud + '".' + projectIdMatchMessage + verifyIdTokenDocsMessage;
  ***REMOVED*** else if (payload.iss !== 'https://securetoken.google.com/' + this.serviceAccount.project_id) ***REMOVED***
    errorMessage = 'Firebase ID token has incorrect "iss" (issuer) claim. Expected "https://securetoken.google.com/' +
      this.serviceAccount.project_id + '" but got "' + payload.iss + '".' + projectIdMatchMessage + verifyIdTokenDocsMessage;
  ***REMOVED*** else if (typeof payload.sub !== 'string') ***REMOVED***
    errorMessage = 'Firebase ID token has no "sub" (subject) claim.' + verifyIdTokenDocsMessage;
  ***REMOVED*** else if (payload.sub === '') ***REMOVED***
    errorMessage = 'Firebase ID token has an empty string "sub" (subject) claim.' + verifyIdTokenDocsMessage;
  ***REMOVED*** else if (payload.sub.length > 128) ***REMOVED***
    errorMessage = 'Firebase ID token has "sub" (subject) claim longer than 128 characters.' + verifyIdTokenDocsMessage;
  ***REMOVED***

  if (typeof errorMessage !== 'undefined') ***REMOVED***
    return firebase.Promise.reject(new Error(errorMessage));
  ***REMOVED***

  return this._fetchPublicKeys().then(function(publicKeys) ***REMOVED***
    if (!publicKeys.hasOwnProperty(header.kid)) ***REMOVED***
      return firebase.Promise.reject('Firebase ID token has "kid" claim which does not correspond to ' +
        'a known public key. Most likely the ID token is expired, so get a fresh token from your client ' +
        'app and try again.' + verifyIdTokenDocsMessage);
    ***REMOVED***

    return new firebase.Promise(function(resolve, reject) ***REMOVED***
      jwt.verify(idToken, publicKeys[header.kid], ***REMOVED***
        algorithms: [ALGORITHM]
      ***REMOVED***, function(error, decodedToken) ***REMOVED***
        if (error) ***REMOVED***
          if (error.name === 'TokenExpiredError') ***REMOVED***
            error = 'Firebase ID token has expired. Get a fresh token from your client app and try ' +
              'again.' + verifyIdTokenDocsMessage;
          ***REMOVED*** else if (error.name === 'JsonWebTokenError') ***REMOVED***
            error = 'Firebase ID token has invalid signature.' + verifyIdTokenDocsMessage;
          ***REMOVED***
          reject(error);
        ***REMOVED*** else ***REMOVED***
          decodedToken.uid = decodedToken.sub;
          resolve(decodedToken);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***;


/**
 * Fetches the public keys for the Google certs.
 *
 * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with public keys for the Google certs.
 */
FirebaseTokenGenerator.prototype._fetchPublicKeys = function() ***REMOVED***
  if (typeof this._publicKeys !== 'undefined' && typeof this._publicKeysExpireAt !== 'undefined' && Date.now() < this._publicKeysExpireAt) ***REMOVED***
    return firebase.Promise.resolve(this._publicKeys);
  ***REMOVED***

  var self = this;

  return new firebase.Promise(function(resolve, reject) ***REMOVED***
    https.get(CLIENT_CERT_URL, function(res) ***REMOVED***
      var buffers = [];

      res.on('data', function(buffer) ***REMOVED***
        buffers.push(buffer);
      ***REMOVED***);

      res.on('end', function() ***REMOVED***
        try ***REMOVED***
          var response = JSON.parse(Buffer.concat(buffers));

          if (response.error) ***REMOVED***
            var errorMessage = 'Error fetching public keys for Google certs: ' + response.error;
            /* istanbul ignore else */
            if (response.error_description) ***REMOVED***
              errorMessage += ' (' + response.error_description + ')';
            ***REMOVED***
            reject(new Error(errorMessage));
          ***REMOVED*** else ***REMOVED***
            /* istanbul ignore else */
            if (res.headers.hasOwnProperty('cache-control')) ***REMOVED***
              var cacheControlHeader = res.headers['cache-control'];
              var parts = cacheControlHeader.split(',');
              parts.forEach(function(part) ***REMOVED***
                var subParts = part.trim().split('=');
                if (subParts[0] === 'max-age') ***REMOVED***
                  var maxAge = subParts[1];
                  self._publicKeysExpireAt = Date.now() + (maxAge * 1000);
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***

            self._publicKeys = response;
            resolve(response);
          ***REMOVED***
        ***REMOVED*** catch (e) ***REMOVED***
          /* istanbul ignore next */
          reject(e);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***).on('error', reject);
  ***REMOVED***);
***REMOVED***;


module.exports = FirebaseTokenGenerator;


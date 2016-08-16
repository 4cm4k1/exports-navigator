/*! @license Firebase v3.3.0
    Build: 3.3.0-rc.7
    Terms: https://developers.google.com/terms */
'use strict';

// TODO(dimond): This can be an npm package include eventually
var FirebaseTokenGenerator = require('./token-generator');
var fs = require('fs');
var firebase = require('../app-node');
var credential = require('./credential.js');

/**
 * Gets a service account from app options.
 *
 * @return ***REMOVED******REMOVED***project_id: String, private_key: String, client_email: String***REMOVED******REMOVED***
 */
function getServiceAccount(app_) ***REMOVED***
  // We must be careful because '' is falsy. An opt || env test would coalesce '' || undefiend as undefined.
  var serviceAccountPathOrObject = typeof app_.options.serviceAccount === 'undefined' ?
    process.env.GOOGLE_APPLICATION_CREDENTIALS :
    app_.options.serviceAccount;
  var serviceAccount;
  if (typeof serviceAccountPathOrObject === 'undefined') ***REMOVED***
    return null;
  ***REMOVED*** else if (typeof serviceAccountPathOrObject === 'string') ***REMOVED***
    try ***REMOVED***
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPathOrObject, 'utf8'));
    ***REMOVED*** catch (error) ***REMOVED***
      throw new Error('Failed to parse service account key file: ' + error);
    ***REMOVED***
  ***REMOVED*** else if (typeof serviceAccountPathOrObject === 'object') ***REMOVED***
    // Allow both camel- and underscore-cased keys for the service account object
    serviceAccount = ***REMOVED******REMOVED***;

    var projectId = serviceAccountPathOrObject.project_id || serviceAccountPathOrObject.projectId;
    if (typeof projectId !== 'undefined') ***REMOVED***
      serviceAccount.project_id = projectId;
    ***REMOVED***

    var privateKey = serviceAccountPathOrObject.private_key || serviceAccountPathOrObject.privateKey;
    if (typeof privateKey !== 'undefined') ***REMOVED***
      serviceAccount.private_key = privateKey;
    ***REMOVED***

    var clientEmail = serviceAccountPathOrObject.client_email || serviceAccountPathOrObject.clientEmail;
    if (typeof clientEmail !== 'undefined') ***REMOVED***
      serviceAccount.client_email = clientEmail;
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    throw new Error('Invalid service account provided');
  ***REMOVED***

  if (typeof serviceAccount.private_key !== 'string' || !serviceAccount.private_key) ***REMOVED***
    throw new Error('Service account must contain a "private_key" field');
  ***REMOVED*** else if (typeof serviceAccount.client_email !== 'string' || !serviceAccount.client_email) ***REMOVED***
    throw new Error('Service account must contain a "client_email" field');
  ***REMOVED***

  return serviceAccount;
***REMOVED***

/**
 * Server auth service bound to the provided app.
 *
 * @param ***REMOVED***Object***REMOVED*** app The app for this auth service
 * @constructor
 */
var Auth = function(app_) ***REMOVED***
  if (!('options' in app_)) ***REMOVED***
    throw new Error('First parameter to Auth constructor must be an instance of firebase.App');
  ***REMOVED***

  var cachedToken_ = null;
  var tokenListeners_ = [];

  var credential_ = app_.options.credential;
  var serviceAccount_ = getServiceAccount(app_);
  var tokenGenerator_;

  if (credential_ && typeof credential_.getAccessToken !== 'function') ***REMOVED***
    throw new Error('Called firebase.initializeApp with an invalid credential parameter');
  ***REMOVED***
  if (serviceAccount_) ***REMOVED***
    credential_ = credential_ || new credential.CertCredential(serviceAccount_);
    tokenGenerator_ = new FirebaseTokenGenerator(serviceAccount_);
  ***REMOVED*** else ***REMOVED***
    credential_ = credential_ || new credential.UnauthenticatedCredential();
  ***REMOVED***

  /**
   * Defines the app property with a getter but no setter.
   */
  Object.defineProperty(this, 'app', ***REMOVED***
    get: function() ***REMOVED*** return app_; ***REMOVED***
  ***REMOVED***);

  /**
   * Creates a new custom token that can be sent back to a client to use with
   * signInWithCustomToken.
   *
   * @param ***REMOVED***string***REMOVED*** uid The uid to use as the subject
   * @param ***REMOVED***Object=***REMOVED*** developerClaims Optional additional claims to include
   *                                  in the payload of the JWT
   *
   * @return ***REMOVED***string***REMOVED*** The JWT for the provided payload.
   */
  this.createCustomToken = function(uid, developerClaims) ***REMOVED***
    if (typeof tokenGenerator_ === 'undefined') ***REMOVED***
      throw new Error('Must initialize FirebaseApp with a service account to call auth().createCustomToken()');
    ***REMOVED***
    return tokenGenerator_.createCustomToken(uid, developerClaims);
  ***REMOVED***;

  /**
   * Verifies a JWT auth token. Returns a Promise with the tokens claims. Rejects
   * the promise if the token could not be verified.
   *
   * @param ***REMOVED***string***REMOVED*** idToken The JWT to verify
   * @return ***REMOVED***Object***REMOVED*** The Promise that will be fulfilled after a successful
   *                  verification.
   */
  this.verifyIdToken = function(idToken) ***REMOVED***
    if (typeof tokenGenerator_ === 'undefined') ***REMOVED***
      throw new Error('Must initialize FirebaseApp with a service account to call auth().verifyIdToken()');
    ***REMOVED***
    return tokenGenerator_.verifyIdToken(idToken);
  ***REMOVED***;

  this.INTERNAL = ***REMOVED******REMOVED***;

  /**
   * Deletes the service and it's associated resources
   */
  this.INTERNAL.delete = function() ***REMOVED***
    // There are no resources to clean up
    return firebase.Promise.resolve();
  ***REMOVED***;

  /**
   * Internal method: Gets an auth token for the associated app.
   * @param ***REMOVED***boolean***REMOVED*** forceRefresh Forces a token refresh
   * @return ***REMOVED***Object***REMOVED*** The Promise that will be fulfilled with the current or new
   *                  token
   */
  this.INTERNAL.getToken = function(forceRefresh) ***REMOVED***
    var expired = cachedToken_ && cachedToken_.expirationTime < Date.now();
    if (cachedToken_ && !forceRefresh && !expired) ***REMOVED***
      return firebase.Promise.resolve(cachedToken_);
    ***REMOVED*** else ***REMOVED***
      // credential_ may be an external class; resolving it in a promise helps us
      // protect against exceptions and upgrades the result to a promise in all cases.
      return firebase.Promise.resolve().then(function() ***REMOVED***
        return credential_.getAccessToken();
      ***REMOVED***).then(function(result) ***REMOVED***
        if (result === null) ***REMOVED***
          return null;
        ***REMOVED***
        if (typeof result !== 'object' ||
            typeof result.expires_in !== 'number' ||
            typeof result.access_token !== 'string') ***REMOVED***
          throw new Error('firebase.initializeApp was called with a credential ' +
              'that creates invalid access tokens: ' + JSON.stringify(result));
        ***REMOVED***
        var token = ***REMOVED***
          accessToken: result.access_token,
          expirationTime: Date.now() + (result.expires_in * 1000)
        ***REMOVED***;

        var hasAccessTokenChanged = (cachedToken_ && cachedToken_.accessToken !== token.accessToken);
        var hasExpirationTimeChanged = (cachedToken_ && cachedToken_.expirationTime !== token.expirationTime);
        if (!cachedToken_ || hasAccessTokenChanged || hasExpirationTimeChanged) ***REMOVED***
          cachedToken_ = token;
          tokenListeners_.forEach(function(listener) ***REMOVED***
            listener(token.accessToken);
          ***REMOVED***);
        ***REMOVED***

        return token;
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;

  /**
   * Internal method: Adds a listener that is called each time a token changes.
   * @param ***REMOVED***function(string)***REMOVED*** listener The listener that will be called with
   *                                    each new token
   */
  this.INTERNAL.addAuthTokenListener = function(listener) ***REMOVED***
    tokenListeners_.push(listener);
    if (cachedToken_) ***REMOVED***
      listener(cachedToken_);
    ***REMOVED***
  ***REMOVED***;

  /**
   * Internal method: Removes a token listener.
   * @param ***REMOVED***function(string)***REMOVED*** listener The listener to remove.
   */
  this.INTERNAL.removeAuthTokenListener = function(listener) ***REMOVED***
    tokenListeners_ = tokenListeners_.filter(function(other) ***REMOVED***
      return other !== listener;
    ***REMOVED***);
  ***REMOVED***;
***REMOVED***;

module.exports = Auth;


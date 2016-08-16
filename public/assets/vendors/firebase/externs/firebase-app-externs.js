/**
 * @fileoverview Firebase namespace and Firebase App API.
 * Version: 3.3.0
 *
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @externs
 */

/**
 * <code>firebase</code> is a global namespace from which all the Firebase
 * services are accessed.
 *
 * @namespace
 */
var firebase = ***REMOVED******REMOVED***;

/**
 * Create (and intialize) a FirebaseApp.
 *
 * @param ***REMOVED***!Object***REMOVED*** options Options to configure the services use in the App.
 * @param ***REMOVED***string=***REMOVED*** name The optional name of the app to initialize ('[DEFAULT]'
 *     if none)
 * @return ***REMOVED***!firebase.app.App***REMOVED***
 */
firebase.initializeApp = function(options, name) ***REMOVED******REMOVED***;

/**
 * Retrieve an instance of a FirebaseApp.
 *
 * With no arguments, this returns the default App.  With a single
 * string argument, it returns the named App.
 *
 * This function throws an exception if the app you are trying to access
 * does not exist.
 *
 * Usage: firebase.app()
 *
 * @namespace
 * @param ***REMOVED***string***REMOVED*** name The optional name of the app to return ('[DEFAULT]' if
 *     none)
 * @return ***REMOVED***!firebase.app.App***REMOVED***
 */
firebase.app = function(name) ***REMOVED******REMOVED***;

/**
 * A (read-only) array of all the initialized Apps.
 * @type ***REMOVED***!Array<firebase.app.App>***REMOVED***
 */
firebase.apps;

/**
 * The current SDK version ('3.3.0').
 * @type ***REMOVED***string***REMOVED***
 */
firebase.SDK_VERSION;

/**
 * A Firebase App holds the initialization information for a collection of
 * services.
 *
 * DO NOT call this constuctor directly (use
 * <code>firebase.initializeApp()</code> to create an App).
 *
 * @interface
 */
firebase.app.App = function() ***REMOVED******REMOVED***;

/**
 * The (read-only) name (identifier) for this App. '[DEFAULT]' is the name of
 * the default App.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.app.App.prototype.name;

/**
 * The (read-only) configuration options (the original parameters given
 * in <code>firebase.initializeApp()</code>).
 * @type ***REMOVED***!Object***REMOVED***
 */
firebase.app.App.prototype.options;

/**
 * Make the given App unusable and free the resources of all associated
 * services.
 *
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.app.App.prototype.delete = function() ***REMOVED******REMOVED***;

/**
 * A Thenable is the standard interface returned by a Promise.
 *
 * @template T
 * @interface
 */
firebase.Thenable = function() ***REMOVED******REMOVED***;

/**
 * Assign callback functions called when the Thenable value either
 * resolves, or is rejected.
 *
 * @param ***REMOVED***(function(T): *)=***REMOVED*** onResolve Called when the Thenable resolves.
 * @param ***REMOVED***(function(!Error): *)=***REMOVED*** onReject Called when the Thenable is rejected
 *   (with an error).
 * @return ***REMOVED***!firebase.Thenable<*>***REMOVED***
 */
firebase.Thenable.prototype.then = function(onResolve, onReject) ***REMOVED******REMOVED***;

/**
 * Assign a callback when the Thenable rejects.
 *
 * @param ***REMOVED***(function(!Error): *)=***REMOVED*** onReject Called when the Thenable is rejected
 *   (with an error).
 * @return ***REMOVED***!firebase.Thenable<*>***REMOVED***
 */
firebase.Thenable.prototype.catch = function(onReject) ***REMOVED******REMOVED***;

/**
 * A Promise represents an eventual (asynchronous) value. A Promise should
 * (eventually) either resolve or reject. When it does, it will call all the
 * callback functions that have been assigned via the <code>.then()</code> or
 * <code>.catch()</code> methods.
 *
 * <code>firebase.Promise</code> is the same as the native Promise
 * implementation when available in the current environment, otherwise it is a
 * compatible implementation of the Promise/A+ spec.
 *
 * @template T
 * @constructor
 * @implements ***REMOVED***firebase.Thenable***REMOVED***
 * @param ***REMOVED***function((function(T): void)=,
 *                  (function(!Error): void)=)***REMOVED*** resolver
 */
firebase.Promise = function(resolver) ***REMOVED******REMOVED***;

/**
 * Assign callback functions called when the Promise either resolves, or is
 * rejected.
 *
 * @param ***REMOVED***(function(T): *)=***REMOVED*** onResolve Called when the Promise resolves.
 * @param ***REMOVED***(function(!Error): *)=***REMOVED*** onReject Called when the Promise is rejected
 *   (with an error).
 * @return ***REMOVED***!firebase.Promise<*>***REMOVED***
 */
firebase.Promise.prototype.then = function(onResolve, onReject) ***REMOVED******REMOVED***;

/**
 * Assign a callback when the Promise rejects.
 *
 * @param ***REMOVED***(function(!Error): *)=***REMOVED*** onReject Called when the Promise is rejected
 *   (with an error).
 */
firebase.Promise.prototype.catch = function(onReject) ***REMOVED******REMOVED***;

/**
 * Return a resolved Promise.
 *
 * @template T
 * @param ***REMOVED***T=***REMOVED*** value The value to be returned by the Promise.
 * @return ***REMOVED***!firebase.Promise<T>***REMOVED***
 */
firebase.Promise.resolve = function(value) ***REMOVED******REMOVED***;

/**
 * Return (an immediately) rejected Promise.
 *
 * @param ***REMOVED***!Error***REMOVED*** error The reason for the Promise being rejected.
 * @return ***REMOVED***!firebase.Promise<*>***REMOVED***
 */
firebase.Promise.reject = function(error) ***REMOVED******REMOVED***;

/**
 * Convert an array of Promises, to a single array of values.
 * <code>Promise.all()</code> resolves only after all the Promises in the array
 * have resolved.
 *
 * <code>Promise.all()</code> rejects when any of the promises in the Array have
 * rejected.
 *
 * @param ***REMOVED***!Array<!firebase.Promise<*>>***REMOVED*** values
 * @return ***REMOVED***!firebase.Promise<!Array<*>>***REMOVED***
 */
firebase.Promise.all = function(values) ***REMOVED******REMOVED***;



/**
 *
 * FirebaseError is a subclass of the standard JavaScript Error object. In
 * addition to a message string, it contains a string-valued code.
 *
 * @interface
 */
firebase.FirebaseError;

/**
 * Error codes are strings using the following format:
 *
 *   "service/string-code"
 *
 * While the message for a given error can change, the code will remain the same
 * between backward-compatible versions of the Firebase SDK.
 *
 * @type ***REMOVED***string***REMOVED***
 */
firebase.FirebaseError.prototype.code;

/**
 * An explanatory message for the error that just occurred.
 *
 * This message is designed to be helpful to you, the developer.  It
 * is not intended that you display it to the end user of your application
 * (as it will generally not convey meaningful information to them).
 *
 * @type ***REMOVED***string***REMOVED***
 */
firebase.FirebaseError.prototype.message;

/**
 * The name of the class of Errors.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.FirebaseError.prototype.name;

/**
 * A string value containing the execution backtrace when the error originally
 * occurred.
 *
 * This information can be useful to you and can be sent to Firebase support to
 * help explain the cause of an error.
 *
 * @type ***REMOVED***string***REMOVED***
 */
firebase.FirebaseError.prototype.stack;

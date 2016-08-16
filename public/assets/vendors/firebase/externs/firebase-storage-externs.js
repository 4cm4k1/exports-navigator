/**
 * @fileoverview Firebase Storage API.
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
 * The namespace for all Firebase Storage functionality.
 * The returned service is initialized with a particular app which contains the
 * project's storage location, or uses the default app if none is provided.
 *
 * Usage (either):
 *
 * ```
 * firebase.storage()
 * firebase.storage(app)
 * ```
 *
 * @namespace
 * @param ***REMOVED***!firebase.app.App=***REMOVED*** app The app to create a storage service for.
 *     If not passed, uses the default app.
 * @return ***REMOVED***!firebase.storage.Storage***REMOVED***
 */
firebase.storage = function(app) ***REMOVED******REMOVED***;

/**
 * Access the Storage service from an App instance.
 *
 * Usage:
 *
 *   app.storage()
 *
 * @return ***REMOVED***!firebase.storage.Storage***REMOVED***
 */
firebase.app.App.prototype.storage = function() ***REMOVED******REMOVED***;

/**
 * A service for uploading and downloading large objects to/from Google Cloud
 * Storage.
 * @interface
 */
firebase.storage.Storage = function() ***REMOVED******REMOVED***;

/**
 * The app associated with this service.
 * @type ***REMOVED***!firebase.app.App***REMOVED***
 */
firebase.storage.Storage.prototype.app;

/**
 * Returns a reference for the given path in the default bucket.
 * @param ***REMOVED***string=***REMOVED*** path A relative path to initialize the reference with,
 *     for example `path/to/image.jpg`. If not passed, the returned reference
 *     points to the bucket root.
 * @return ***REMOVED***!firebase.storage.Reference***REMOVED*** A reference for the given path.
 */
firebase.storage.Storage.prototype.ref = function(path) ***REMOVED******REMOVED***;

/**
 * Returns a reference for the given absolute URL.
 * @param ***REMOVED***string***REMOVED*** url A URL in the form: <br />
 *     1) a gs:// URL, for example `gs://bucket/files/image.png` <br />
 *     2) a download URL taken from object metadata. <br />
 *     @see ***REMOVED***@link firebase.storage.FullMetadata.prototype.downloadURLs***REMOVED***
 * @return ***REMOVED***!firebase.storage.Reference***REMOVED*** A reference for the given URL.
 */
firebase.storage.Storage.prototype.refFromURL = function(url) ***REMOVED******REMOVED***;

/**
 * The maximum time to retry operations other than uploads or downloads in
 * milliseconds.
 * @type ***REMOVED***number***REMOVED***
 */
firebase.storage.Storage.prototype.maxOperationRetryTime;

/**
 * @param ***REMOVED***number***REMOVED*** time The new maximum operation retry time in milliseconds.
 * @see ***REMOVED***@link firebase.storage.Storage.prototype.maxOperationRetryTime***REMOVED***
 */
firebase.storage.Storage.prototype.setMaxOperationRetryTime = function(time) ***REMOVED******REMOVED***;

/**
 * The maximum time to retry uploads in milliseconds.
 * @type ***REMOVED***number***REMOVED***
 */
firebase.storage.Storage.prototype.maxUploadRetryTime;

/**
 * @param ***REMOVED***number***REMOVED*** time The new maximum upload retry time in milliseconds.
 * @see ***REMOVED***@link firebase.storage.Storage.prototype.maxUploadRetryTime***REMOVED***
 */
firebase.storage.Storage.prototype.setMaxUploadRetryTime = function(time) ***REMOVED******REMOVED***;

/**
 * Represents a reference to a Google Cloud Storage object. Developers can
 * upload, download, and delete objects, as well as get/set object metadata.
 * @interface
 */
firebase.storage.Reference = function() ***REMOVED******REMOVED***;

/**
 * Returns a gs:// URL for this object in the form
 *   `gs://<bucket>/<path>/<to>/<object>`
 * @return ***REMOVED***string***REMOVED*** The gs:// URL.
 */
firebase.storage.Reference.prototype.toString = function() ***REMOVED******REMOVED***;

/**
 * Returns a reference to a relative path from this reference.
 * @param ***REMOVED***string***REMOVED*** path The relative path from this reference.
 *     Leading, trailing, and consecutive slashes are removed.
 * @return ***REMOVED***!firebase.storage.Reference***REMOVED*** The reference a the given path.
 */
firebase.storage.Reference.prototype.child = function(path) ***REMOVED******REMOVED***;

/**
 * Uploads data to this reference's location.
 * @param ***REMOVED***!Blob|!Uint8Array|!ArrayBuffer***REMOVED*** data The data to upload.
 * @param ***REMOVED***!firebase.storage.UploadMetadata=***REMOVED*** metadata Metadata for the newly
 *     uploaded object.
 * @return ***REMOVED***!firebase.storage.UploadTask***REMOVED*** An object that can be used to monitor
 *     and manage the upload.
 */
firebase.storage.Reference.prototype.put = function(data, metadata) ***REMOVED******REMOVED***;

/**
 * @enum ***REMOVED***string***REMOVED***
 * An enumeration of the possible string formats for upload.
 */
firebase.storage.StringFormat = ***REMOVED***
  /**
   * Indicates the string should be interpreted "raw", that is, as normal text.
   * The string will be interpreted as UTF-16, then uploaded as a UTF-8 byte
   * sequence.
   * Example: The string 'Hello! \ud83d\ude0a' becomes the byte sequence
   * 48 65 6c 6c 6f 21 20 f0 9f 98 8a
   */
  RAW: 'raw',
  /**
   * Indicates the string should be interpreted as base64-encoded data.
   * Padding characters (trailing '='s) are optional.
   * Example: The string 'rWmO++E6t7/rlw==' becomes the byte sequence
   * ad 69 8e fb e1 3a b7 bf eb 97
   */
  BASE64: 'base64',
  /**
   * Indicates the string should be interpreted as base64url-encoded data.
   * Padding characters (trailing '='s) are optional.
   * Example: The string 'rWmO--E6t7_rlw==' becomes the byte sequence
   * ad 69 8e fb e1 3a b7 bf eb 97
   */
  BASE64URL: 'base64url',
  /**
   * Indicates the string is a data URL, such as one obtained from
   * canvas.toDataURL().
   * Example: the string 'data:application/octet-stream;base64,aaaa'
   * becomes the byte sequence
   * 69 a6 9a
   * (the content-type "application/octet-stream" is also applied, but can
   * be overridden in the metadata object).
   */
  DATA_URL: 'data_url'
***REMOVED***;

/**
 * Uploads string data to this reference's location.
 * @param ***REMOVED***string***REMOVED*** data The string to upload.
 * @param ***REMOVED***!firebase.storage.StringFormat=***REMOVED*** format The format of the string to
 *     upload.
 * @param ***REMOVED***!firebase.storage.UploadMetadata=***REMOVED*** metadata Metadata for the newly
 *     uploaded object.
 * @return ***REMOVED***!firebase.storage.UploadTask***REMOVED***
 * @throws If the format is not an allowed format, or if the given string
 *     doesn't conform to the specified format.
 */
firebase.storage.Reference.prototype.putString = function(
    data, format, metadata) ***REMOVED******REMOVED***;


/**
 * Deletes the object at this reference's location.
 * @return ***REMOVED***!Promise<void>***REMOVED*** A promise that resolves if the deletion succeeded
 *     and rejects if it failed, including if the object didn't exist.
 */
firebase.storage.Reference.prototype.delete = function() ***REMOVED******REMOVED***;

/**
 * Fetches metadata for the object at this location, if one exists.
 * @return ***REMOVED***!Promise<firebase.storage.FullMetadata>***REMOVED*** A promise that resolves
 *     with the metadata, or rejects if the fetch failed, including if the
 *     object did not exist.
 */
firebase.storage.Reference.prototype.getMetadata = function() ***REMOVED******REMOVED***;

/**
 * Updates the metadata for the object at this location, if one exists.
 * @param ***REMOVED***!firebase.storage.SettableMetadata***REMOVED*** metadata The new metadata.
 *     Setting a property to 'null' removes it on the server, while leaving
 *     a property as 'undefined' has no effect.
 * @return ***REMOVED***!Promise<firebase.storage.FullMetadata>***REMOVED*** A promise that resolves
 *     with the full updated metadata or rejects if the updated failed,
 *     including if the object did not exist.
 */
firebase.storage.Reference.prototype.updateMetadata = function(metadata) ***REMOVED******REMOVED***;


/**
 * Fetches a long lived download URL for this object.
 * @return ***REMOVED***!Promise<string>***REMOVED*** A promise that resolves with the download URL or
 *     rejects if the fetch failed, including if the object did not exist.
 */
firebase.storage.Reference.prototype.getDownloadURL = function() ***REMOVED******REMOVED***;


/**
 * A reference pointing to the parent location of this reference, or null if
 * this reference is the root.
 * @type ***REMOVED***?firebase.storage.Reference***REMOVED***
 */
firebase.storage.Reference.prototype.parent;


/**
 * A reference to the root of this reference's bucket.
 * @type ***REMOVED***!firebase.storage.Reference***REMOVED***
 */
firebase.storage.Reference.prototype.root;

/**
 * The name of the bucket containing this reference's object.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.storage.Reference.prototype.bucket;

/**
 * The full path of this object.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.storage.Reference.prototype.fullPath;

/**
 * The short name of this object, which is the last component of the full path.
 * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.storage.Reference.prototype.name;

/**
 * The storage service associated with this reference.
 * @type ***REMOVED***!firebase.storage.Storage***REMOVED***
 */
firebase.storage.Reference.prototype.storage;


/**
 * Object metadata that can be set at any time.
 * @interface
 */
firebase.storage.SettableMetadata = function() ***REMOVED******REMOVED***;

/**
 * Served as the 'Cache-Control' header on object download.
 * @type ***REMOVED***?string|undefined***REMOVED***
 */
firebase.storage.SettableMetadata.prototype.cacheControl;

/**
 * Served as the 'Content-Disposition' header on object download.
 * @type ***REMOVED***?string|undefined***REMOVED***
 */
firebase.storage.SettableMetadata.prototype.contentDisposition;

/**
 * Served as the 'Content-Encoding' header on object download.
 * @type ***REMOVED***?string|undefined***REMOVED***
 */
firebase.storage.SettableMetadata.prototype.contentEncoding;

/**
 * Served as the 'Content-Language' header on object download.
 * @type ***REMOVED***?string|undefined***REMOVED***
 */
firebase.storage.SettableMetadata.prototype.contentLanguage;

/**
 * Served as the 'Content-Type' header on object download.
 * @type ***REMOVED***?string|undefined***REMOVED***
 */
firebase.storage.SettableMetadata.prototype.contentType;

/**
 * Additional user-defined custom metadata.
 * @type ***REMOVED***?Object<string>|undefined***REMOVED***
 */
firebase.storage.SettableMetadata.prototype.customMetadata;

/**
 * Object metadata that can be set at upload.
 * @interface
 * @extends ***REMOVED***firebase.storage.SettableMetadata***REMOVED***
 */
firebase.storage.UploadMetadata = function() ***REMOVED******REMOVED***;

/**
 * A Base64-encoded MD5 hash of the object being uploaded.
 * @type ***REMOVED***?string|undefined***REMOVED***
 */
firebase.storage.UploadMetadata.prototype.md5Hash;

/**
 * The full set of object metadata, including read-only properties.
 * @interface
 * @extends ***REMOVED***firebase.storage.UploadMetadata***REMOVED***
 */
firebase.storage.FullMetadata = function() ***REMOVED******REMOVED***;

/**
 * The bucket this object is contained in.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.storage.FullMetadata.prototype.bucket;

/**
 * The object's generation.
 * @type ***REMOVED***string***REMOVED***
 * @see ***REMOVED***@link https://cloud.google.com/storage/docs/generations-preconditions***REMOVED***
 */
firebase.storage.FullMetadata.prototype.generation;

/**
 * The object's metageneration.
 * @type ***REMOVED***string***REMOVED***
 * @see ***REMOVED***@link https://cloud.google.com/storage/docs/generations-preconditions***REMOVED***
 */
firebase.storage.FullMetadata.prototype.metageneration;

/**
 * The full path of this object.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.storage.FullMetadata.prototype.fullPath;

/**
 * The short name of this object, which is the last component of the full path.
 * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.storage.FullMetadata.prototype.name;

/**
 * The size of this object, in bytes.
 * @type ***REMOVED***number***REMOVED***
 */
firebase.storage.FullMetadata.prototype.size;

/**
 * A date string representing when this object was created.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.storage.FullMetadata.prototype.timeCreated;

/**
 * A date string representing when this object was last updated.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.storage.FullMetadata.prototype.updated;

/**
 * An array of long-lived download URLs. Always contains at least one URL.
 * @type ***REMOVED***!Array<string>***REMOVED***
 */
firebase.storage.FullMetadata.prototype.downloadURLs;

/**
 * An event that is triggered on a task.
 * @enum ***REMOVED***string***REMOVED***
 * @see ***REMOVED***@link firebase.storage.UploadTask.prototype.on***REMOVED***
 */
firebase.storage.TaskEvent = ***REMOVED***
  /**
   * For this event,
   * <ul>
   *   <li>The `next` function is triggered on progress updates and when the
   *       task is paused/resumed with a
   *       ***REMOVED***@link firebase.storage.UploadTaskSnapshot***REMOVED*** as the first
   *       argument.</li>
   *   <li>The `error` function is triggered if the upload is canceled or fails
   *       for another reason.</li>
   *   <li>The `complete` function is triggered if the upload completes
   *       successfully.</li>
   * </ul>
   */
  STATE_CHANGED: 'state_changed'
***REMOVED***;

/**
 * Represents the current state of a running upload.
 * @enum ***REMOVED***string***REMOVED***
 */
firebase.storage.TaskState = ***REMOVED***
  /** Indicates that the task is still running and making progress. */
  RUNNING: 'running',
  /** Indicates that the task is paused. */
  PAUSED: 'paused',
  /** Indicates that the task completed successfully. */
  SUCCESS: 'success',
  /** Indicates that the task was canceled. */
  CANCELED: 'canceled',
  /** Indicates that the task failed for a reason other than being canceled. */
  ERROR: 'error'
***REMOVED***;

/**
 * Represents the process of uploading an object. Allows you to monitor and
 * manage the upload.
 * @interface
 */
firebase.storage.UploadTask = function() ***REMOVED******REMOVED***;

/**
 * This object behaves like a Promise, and resolves with its snapshot data when
 * the upload completes.
 * @param ***REMOVED***(?function(!firebase.storage.UploadTaskSnapshot):*)=***REMOVED*** onFulfilled
 *     The fulfillment callback. Promise chaining works as normal.
 * @param ***REMOVED***(?function(!Error):*)=***REMOVED*** onRejected The rejection callback.
 * @return ***REMOVED***!Promise***REMOVED***
 */
firebase.storage.UploadTask.prototype.then = function(onFulfilled, onRejected) ***REMOVED***
***REMOVED***;

/**
 * Equivalent to calling `then(null, onRejected)`.
 * @param ***REMOVED***!function(!Error):****REMOVED*** onRejected
 * @return ***REMOVED***!Promise***REMOVED***
 */
firebase.storage.UploadTask.prototype.catch = function(onRejected) ***REMOVED******REMOVED***;

/**
 * Listens for events on this task.
 *
 * Events have three callback functions (referred to as `next`, `error`, and
 * `complete`).
 *
 * If only the event is passed, a function that can be used to register the
 * callbacks is returned. Otherwise, the callbacks are passed after the event.
 *
 * Callbacks can be passed either as three separate arguments <em>or</em> as the
 * `next`, `error`, and `complete` properties of an object. Any of the three
 * callbacks is optional, as long as at least one is specified. In addition,
 * when you add your callbacks, you get a function back. You can call this
 * function to unregister the associated callbacks.
 *
 * @example <caption>Pass callbacks separately or in an object.</caption>
 * var next = function(snapshot) ***REMOVED******REMOVED***;
 * var error = function(error) ***REMOVED******REMOVED***;
 * var complete = function() ***REMOVED******REMOVED***;
 *
 * // The first example.
 * uploadTask.on(
 *     firebase.storage.TaskEvent.STATE_CHANGED,
 *     next,
 *     error,
 *     complete);
 *
 * // This is equivalent to the first example.
 * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, ***REMOVED***
 *   'next': next,
 *   'error': error,
 *   'complete': complete
 * ***REMOVED***);
 *
 * // This is equivalent to the first example.
 * var subscribe = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
 * subscribe(next, error, complete);
 *
 * // This is equivalent to the first example.
 * var subscribe = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
 * subscribe(***REMOVED***
 *   'next': next,
 *   'error': error,
 *   'complete': complete
 * ***REMOVED***);
 *
 * @example <caption>Any callback is optional.</caption>
 * // Just listening for completion, this is legal.
 * uploadTask.on(
 *     firebase.storage.TaskEvent.STATE_CHANGED,
 *     null,
 *     null,
 *     function() ***REMOVED***
 *       console.log('upload complete!');
 *     ***REMOVED***);
 *
 * // Just listening for progress/state changes, this is legal.
 * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) ***REMOVED***
 *   var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
 *   console.log(percent + "% done");
 * ***REMOVED***);
 *
 * // This is also legal.
 * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, ***REMOVED***
 *   'complete': function() ***REMOVED***
 *     console.log('upload complete!');
 *   ***REMOVED***
 * ***REMOVED***);
 *
 * @example <caption>Use the returned function to remove callbacks.</caption>
 * var unsubscribe = uploadTask.on(
 *     firebase.storage.TaskEvent.STATE_CHANGED,
 *     function(snapshot) ***REMOVED***
 *       var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
 *       console.log(percent + "% done");
 *       // Stop after receiving one update.
 *       unsubscribe();
 *     ***REMOVED***);
 *
 * // This code is equivalent to the above.
 * var handle = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
 * unsubscribe = handle(function(snapshot) ***REMOVED***
 *   var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
 *   console.log(percent + "% done");
 *   // Stop after receiving one update.
 *   unsubscribe();
 * ***REMOVED***);
 *
 * @param ***REMOVED***!firebase.storage.TaskEvent***REMOVED*** event The event to listen for.
 * @param ***REMOVED***(?function(!Object)|!Object)=***REMOVED*** nextOrObserver The `next` function,
 *     which gets called for each item in the event stream, or an observer
 *     object with some or all of these three properties (`next`, `error`,
 *     `complete`).
 * @param ***REMOVED***?function(!Error)=***REMOVED*** error A function that gets called with an Error
 *     if the event stream ends due to an error.
 * @param ***REMOVED***?function()=***REMOVED*** complete A function that gets called if the
 *     event stream ends normally.
 * @return ***REMOVED***
 *     !function()|
 *     !function(?function(!Object),?function(!Error)=,?function()=)
 *       :!function()***REMOVED***
 *     If only the event argument is passed, returns a function you can use to
 *     add callbacks (see the examples above). If more than just the event
 *     argument is passed, returns a function you can call to unregister the
 *     callbacks.
 */
firebase.storage.UploadTask.prototype.on = function(
    event, nextOrObserver, error, complete) ***REMOVED******REMOVED***;

/**
 * Resumes a paused task. Has no effect on a running or failed task.
 * @return ***REMOVED***boolean***REMOVED*** True if the resume had an effect.
 */
firebase.storage.UploadTask.prototype.resume = function() ***REMOVED******REMOVED***;

/**
 * Pauses a running task. Has no effect on a paused or failed task.
 * @return ***REMOVED***boolean***REMOVED*** True if the pause had an effect.
 */
firebase.storage.UploadTask.prototype.pause = function() ***REMOVED******REMOVED***;

/**
 * Cancels a running task. Has no effect on a complete or failed task.
 * @return ***REMOVED***boolean***REMOVED*** True if the cancel had an effect.
 */
firebase.storage.UploadTask.prototype.cancel = function() ***REMOVED******REMOVED***;

/**
 * A snapshot of the current task state.
 * @type ***REMOVED***!firebase.storage.UploadTaskSnapshot***REMOVED***
 */
firebase.storage.UploadTask.prototype.snapshot;

/**
 * Holds data about the current state of the upload task.
 * @interface
 */
firebase.storage.UploadTaskSnapshot = function() ***REMOVED******REMOVED***;

/**
 * The number of bytes that have been successfully uploaded so far.
 * @type ***REMOVED***number***REMOVED***
 */
firebase.storage.UploadTaskSnapshot.prototype.bytesTransferred;

/**
 * The total number of bytes to be uploaded.
 * @type ***REMOVED***number***REMOVED***
 */
firebase.storage.UploadTaskSnapshot.prototype.totalBytes;

/**
 * The current state of the task.
 * @type ***REMOVED***firebase.storage.TaskState***REMOVED***
 */
firebase.storage.UploadTaskSnapshot.prototype.state;

/**
 * Before the upload completes, contains the metadata sent to the server.
 * After the upload completes, contains the metadata sent back from the server.
 * @type ***REMOVED***!firebase.storage.FullMetadata***REMOVED***
 */
firebase.storage.UploadTaskSnapshot.prototype.metadata;

/**
 * After the upload completes, contains a long-lived download URL for the
 * object. Also accessible in metadata.
 * @type ***REMOVED***?string***REMOVED***
 */
firebase.storage.UploadTaskSnapshot.prototype.downloadURL;

/**
 * The task of which this is a snapshot.
 * @type ***REMOVED***!firebase.storage.UploadTask***REMOVED***
 */
firebase.storage.UploadTaskSnapshot.prototype.task;

/**
 * The reference that spawned this snapshot's upload task.
 * @type ***REMOVED***!firebase.storage.Reference***REMOVED***
 */
firebase.storage.UploadTaskSnapshot.prototype.ref;

/*!
 * AngularFire is the officially supported AngularJS binding for Firebase. Firebase
 * is a full backend so you don't need servers to build your Angular app. AngularFire
 * provides you with the $firebase service which allows you to easily keep your $scope
 * variables in sync with your Firebase backend.
 *
 * AngularFire 2.0.1
 * https://github.com/firebase/angularfire/
 * Date: 06/02/2016
 * License: MIT
 */
(function(exports) ***REMOVED***
  "use strict";

// Define the `firebase` module under which all AngularFire
// services will live.
  angular.module("firebase", [])
    //todo use $window
    .value("Firebase", exports.Firebase);

***REMOVED***)(window);
(function() ***REMOVED***
  'use strict';
  /**
   * Creates and maintains a synchronized list of data. This is a pseudo-read-only array. One should
   * not call splice(), push(), pop(), et al directly on this array, but should instead use the
   * $remove and $add methods.
   *
   * It is acceptable to .sort() this array, but it is important to use this in conjunction with
   * $watch(), so that it will be re-sorted any time the server data changes. Examples of this are
   * included in the $watch documentation.
   *
   * Internally, the $firebase object depends on this class to provide several $$ (i.e. protected)
   * methods, which it invokes to notify the array whenever a change has been made at the server:
   *    $$added - called whenever a child_added event occurs
   *    $$updated - called whenever a child_changed event occurs
   *    $$moved - called whenever a child_moved event occurs
   *    $$removed - called whenever a child_removed event occurs
   *    $$error - called when listeners are canceled due to a security error
   *    $$process - called immediately after $$added/$$updated/$$moved/$$removed
   *                (assuming that these methods do not abort by returning false or null)
   *                to splice/manipulate the array and invoke $$notify
   *
   * Additionally, these methods may be of interest to devs extending this class:
   *    $$notify - triggers notifications to any $watch listeners, called by $$process
   *    $$getKey - determines how to look up a record's key (returns $id by default)
   *
   * Instead of directly modifying this class, one should generally use the $extend
   * method to add or change how methods behave. $extend modifies the prototype of
   * the array class by returning a clone of $firebaseArray.
   *
   * <pre><code>
   * var ExtendedArray = $firebaseArray.$extend(***REMOVED***
   *    // add a new method to the prototype
   *    foo: function() ***REMOVED*** return 'bar'; ***REMOVED***,
   *
   *    // change how records are created
   *    $$added: function(snap, prevChild) ***REMOVED***
   *       return new Widget(snap, prevChild);
   *    ***REMOVED***,
   *
   *    // change how records are updated
   *    $$updated: function(snap) ***REMOVED***
   *      return this.$getRecord(snap.key()).update(snap);
   *    ***REMOVED***
   * ***REMOVED***);
   *
   * var list = new ExtendedArray(ref);
   * </code></pre>
   */
  angular.module('firebase').factory('$firebaseArray', ["$log", "$firebaseUtils", "$q",
    function($log, $firebaseUtils, $q) ***REMOVED***
      /**
       * This constructor should probably never be called manually. It is used internally by
       * <code>$firebase.$asArray()</code>.
       *
       * @param ***REMOVED***Firebase***REMOVED*** ref
       * @returns ***REMOVED***Array***REMOVED***
       * @constructor
       */
      function FirebaseArray(ref) ***REMOVED***
        if( !(this instanceof FirebaseArray) ) ***REMOVED***
          return new FirebaseArray(ref);
        ***REMOVED***
        var self = this;
        this._observers = [];
        this.$list = [];
        this._ref = ref;
        this._sync = new ArraySyncManager(this);

        $firebaseUtils.assertValidRef(ref, 'Must pass a valid Firebase reference ' +
        'to $firebaseArray (not a string or URL)');

        // indexCache is a weak hashmap (a lazy list) of keys to array indices,
        // items are not guaranteed to stay up to date in this list (since the data
        // array can be manually edited without calling the $ methods) and it should
        // always be used with skepticism regarding whether it is accurate
        // (see $indexFor() below for proper usage)
        this._indexCache = ***REMOVED******REMOVED***;

        // Array.isArray will not work on objects which extend the Array class.
        // So instead of extending the Array class, we just return an actual array.
        // However, it's still possible to extend FirebaseArray and have the public methods
        // appear on the array object. We do this by iterating the prototype and binding
        // any method that is not prefixed with an underscore onto the final array.
        $firebaseUtils.getPublicMethods(self, function(fn, key) ***REMOVED***
          self.$list[key] = fn.bind(self);
        ***REMOVED***);

        this._sync.init(this.$list);

        return this.$list;
      ***REMOVED***

      FirebaseArray.prototype = ***REMOVED***
        /**
         * Create a new record with a unique ID and add it to the end of the array.
         * This should be used instead of Array.prototype.push, since those changes will not be
         * synchronized with the server.
         *
         * Any value, including a primitive, can be added in this way. Note that when the record
         * is created, the primitive value would be stored in $value (records are always objects
         * by default).
         *
         * Returns a future which is resolved when the data has successfully saved to the server.
         * The resolve callback will be passed a Firebase ref representing the new data element.
         *
         * @param data
         * @returns a promise resolved after data is added
         */
        $add: function(data) ***REMOVED***
          this._assertNotDestroyed('$add');
          var self = this;
          var def = $q.defer();
          var ref = this.$ref().ref.push();
          var dataJSON;

          try ***REMOVED***
            dataJSON = $firebaseUtils.toJSON(data);
          ***REMOVED*** catch (err) ***REMOVED***
            def.reject(err);
          ***REMOVED***

          if (typeof dataJSON !== 'undefined') ***REMOVED***
            $firebaseUtils.doSet(ref, dataJSON).then(function() ***REMOVED***
              self.$$notify('child_added', ref.key);
              def.resolve(ref);
            ***REMOVED***).catch(def.reject);
          ***REMOVED***

          return def.promise;
        ***REMOVED***,

        /**
         * Pass either an item in the array or the index of an item and it will be saved back
         * to Firebase. While the array is read-only and its structure should not be changed,
         * it is okay to modify properties on the objects it contains and then save those back
         * individually.
         *
         * Returns a future which is resolved when the data has successfully saved to the server.
         * The resolve callback will be passed a Firebase ref representing the saved element.
         * If passed an invalid index or an object which is not a record in this array,
         * the promise will be rejected.
         *
         * @param ***REMOVED***int|object***REMOVED*** indexOrItem
         * @returns a promise resolved after data is saved
         */
        $save: function(indexOrItem) ***REMOVED***
          this._assertNotDestroyed('$save');
          var self = this;
          var item = self._resolveItem(indexOrItem);
          var key = self.$keyAt(item);
          var def = $q.defer();

          if( key !== null ) ***REMOVED***
            var ref = self.$ref().ref.child(key);
            var dataJSON;

            try ***REMOVED***
              dataJSON = $firebaseUtils.toJSON(item);
            ***REMOVED*** catch (err) ***REMOVED***
              def.reject(err);
            ***REMOVED***

            if (typeof dataJSON !== 'undefined') ***REMOVED***
              $firebaseUtils.doSet(ref, dataJSON).then(function() ***REMOVED***
                self.$$notify('child_changed', key);
                def.resolve(ref);
              ***REMOVED***).catch(def.reject);
            ***REMOVED***
          ***REMOVED***
          else ***REMOVED***
            def.reject('Invalid record; could not determine key for '+indexOrItem);
          ***REMOVED***

          return def.promise;
        ***REMOVED***,

        /**
         * Pass either an existing item in this array or the index of that item and it will
         * be removed both locally and in Firebase. This should be used in place of
         * Array.prototype.splice for removing items out of the array, as calling splice
         * will not update the value on the server.
         *
         * Returns a future which is resolved when the data has successfully removed from the
         * server. The resolve callback will be passed a Firebase ref representing the deleted
         * element. If passed an invalid index or an object which is not a record in this array,
         * the promise will be rejected.
         *
         * @param ***REMOVED***int|object***REMOVED*** indexOrItem
         * @returns a promise which resolves after data is removed
         */
        $remove: function(indexOrItem) ***REMOVED***
          this._assertNotDestroyed('$remove');
          var key = this.$keyAt(indexOrItem);
          if( key !== null ) ***REMOVED***
            var ref = this.$ref().ref.child(key);
            return $firebaseUtils.doRemove(ref).then(function() ***REMOVED***
              return ref;
            ***REMOVED***);
          ***REMOVED***
          else ***REMOVED***
            return $q.reject('Invalid record; could not determine key for '+indexOrItem);
          ***REMOVED***
        ***REMOVED***,

        /**
         * Given an item in this array or the index of an item in the array, this returns the
         * Firebase key (record.$id) for that record. If passed an invalid key or an item which
         * does not exist in this array, it will return null.
         *
         * @param ***REMOVED***int|object***REMOVED*** indexOrItem
         * @returns ***REMOVED***null|string***REMOVED***
         */
        $keyAt: function(indexOrItem) ***REMOVED***
          var item = this._resolveItem(indexOrItem);
          return this.$$getKey(item);
        ***REMOVED***,

        /**
         * The inverse of $keyAt, this method takes a Firebase key (record.$id) and returns the
         * index in the array where that record is stored. If the record is not in the array,
         * this method returns -1.
         *
         * @param ***REMOVED***String***REMOVED*** key
         * @returns ***REMOVED***int***REMOVED*** -1 if not found
         */
        $indexFor: function(key) ***REMOVED***
          var self = this;
          var cache = self._indexCache;
          // evaluate whether our key is cached and, if so, whether it is up to date
          if( !cache.hasOwnProperty(key) || self.$keyAt(cache[key]) !== key ) ***REMOVED***
            // update the hashmap
            var pos = self.$list.findIndex(function(rec) ***REMOVED*** return self.$$getKey(rec) === key; ***REMOVED***);
            if( pos !== -1 ) ***REMOVED***
              cache[key] = pos;
            ***REMOVED***
          ***REMOVED***
          return cache.hasOwnProperty(key)? cache[key] : -1;
        ***REMOVED***,

        /**
         * The loaded method is invoked after the initial batch of data arrives from the server.
         * When this resolves, all data which existed prior to calling $asArray() is now cached
         * locally in the array.
         *
         * As a shortcut is also possible to pass resolve/reject methods directly into this
         * method just as they would be passed to .then()
         *
         * @param ***REMOVED***Function***REMOVED*** [resolve]
         * @param ***REMOVED***Function***REMOVED*** [reject]
         * @returns a promise
         */
        $loaded: function(resolve, reject) ***REMOVED***
          var promise = this._sync.ready();
          if( arguments.length ) ***REMOVED***
            // allow this method to be called just like .then
            // by passing any arguments on to .then
            promise = promise.then.call(promise, resolve, reject);
          ***REMOVED***
          return promise;
        ***REMOVED***,

        /**
         * @returns ***REMOVED***Firebase***REMOVED*** the original Firebase ref used to create this object.
         */
        $ref: function() ***REMOVED*** return this._ref; ***REMOVED***,

        /**
         * Listeners passed into this method are notified whenever a new change (add, updated,
         * move, remove) is received from the server. Each invocation is sent an object
         * containing <code>***REMOVED*** type: 'child_added|child_updated|child_moved|child_removed',
         * key: 'key_of_item_affected'***REMOVED***</code>
         *
         * Additionally, added and moved events receive a prevChild parameter, containing the
         * key of the item before this one in the array.
         *
         * This method returns a function which can be invoked to stop observing events.
         *
         * @param ***REMOVED***Function***REMOVED*** cb
         * @param ***REMOVED***Object***REMOVED*** [context]
         * @returns ***REMOVED***Function***REMOVED*** used to stop observing
         */
        $watch: function(cb, context) ***REMOVED***
          var list = this._observers;
          list.push([cb, context]);
          // an off function for cancelling the listener
          return function() ***REMOVED***
            var i = list.findIndex(function(parts) ***REMOVED***
              return parts[0] === cb && parts[1] === context;
            ***REMOVED***);
            if( i > -1 ) ***REMOVED***
              list.splice(i, 1);
            ***REMOVED***
          ***REMOVED***;
        ***REMOVED***,

        /**
         * Informs $firebase to stop sending events and clears memory being used
         * by this array (delete's its local content).
         */
        $destroy: function(err) ***REMOVED***
          if( !this._isDestroyed ) ***REMOVED***
            this._isDestroyed = true;
            this._sync.destroy(err);
            this.$list.length = 0;
          ***REMOVED***
        ***REMOVED***,

        /**
         * Returns the record for a given Firebase key (record.$id). If the record is not found
         * then returns null.
         *
         * @param ***REMOVED***string***REMOVED*** key
         * @returns ***REMOVED***Object|null***REMOVED*** a record in this array
         */
        $getRecord: function(key) ***REMOVED***
          var i = this.$indexFor(key);
          return i > -1? this.$list[i] : null;
        ***REMOVED***,

        /**
         * Called to inform the array when a new item has been added at the server.
         * This method should return the record (an object) that will be passed into $$process
         * along with the add event. Alternately, the record will be skipped if this method returns
         * a falsey value.
         *
         * @param ***REMOVED***object***REMOVED*** snap a Firebase snapshot
         * @param ***REMOVED***string***REMOVED*** prevChild
         * @return ***REMOVED***object***REMOVED*** the record to be inserted into the array
         * @protected
         */
        $$added: function(snap/*, prevChild*/) ***REMOVED***
          // check to make sure record does not exist
          var i = this.$indexFor(snap.key);
          if( i === -1 ) ***REMOVED***
            // parse data and create record
            var rec = snap.val();
            if( !angular.isObject(rec) ) ***REMOVED***
              rec = ***REMOVED*** $value: rec ***REMOVED***;
            ***REMOVED***
            rec.$id = snap.key;
            rec.$priority = snap.getPriority();
            $firebaseUtils.applyDefaults(rec, this.$$defaults);

            return rec;
          ***REMOVED***
          return false;
        ***REMOVED***,

        /**
         * Called whenever an item is removed at the server.
         * This method does not physically remove the objects, but instead
         * returns a boolean indicating whether it should be removed (and
         * taking any other desired actions before the remove completes).
         *
         * @param ***REMOVED***object***REMOVED*** snap a Firebase snapshot
         * @return ***REMOVED***boolean***REMOVED*** true if item should be removed
         * @protected
         */
        $$removed: function(snap) ***REMOVED***
          return this.$indexFor(snap.key) > -1;
        ***REMOVED***,

        /**
         * Called whenever an item is changed at the server.
         * This method should apply the changes, including changes to data
         * and to $priority, and then return true if any changes were made.
         *
         * If this method returns false, then $$process will not be invoked,
         * which means that $$notify will not take place and no $watch events
         * will be triggered.
         *
         * @param ***REMOVED***object***REMOVED*** snap a Firebase snapshot
         * @return ***REMOVED***boolean***REMOVED*** true if any data changed
         * @protected
         */
        $$updated: function(snap) ***REMOVED***
          var changed = false;
          var rec = this.$getRecord(snap.key);
          if( angular.isObject(rec) ) ***REMOVED***
            // apply changes to the record
            changed = $firebaseUtils.updateRec(rec, snap);
            $firebaseUtils.applyDefaults(rec, this.$$defaults);
          ***REMOVED***
          return changed;
        ***REMOVED***,

        /**
         * Called whenever an item changes order (moves) on the server.
         * This method should set $priority to the updated value and return true if
         * the record should actually be moved. It should not actually apply the move
         * operation.
         *
         * If this method returns false, then the record will not be moved in the array
         * and no $watch listeners will be notified. (When true, $$process is invoked
         * which invokes $$notify)
         *
         * @param ***REMOVED***object***REMOVED*** snap a Firebase snapshot
         * @param ***REMOVED***string***REMOVED*** prevChild
         * @protected
         */
        $$moved: function(snap/*, prevChild*/) ***REMOVED***
          var rec = this.$getRecord(snap.key);
          if( angular.isObject(rec) ) ***REMOVED***
            rec.$priority = snap.getPriority();
            return true;
          ***REMOVED***
          return false;
        ***REMOVED***,

        /**
         * Called whenever a security error or other problem causes the listeners to become
         * invalid. This is generally an unrecoverable error.
         *
         * @param ***REMOVED***Object***REMOVED*** err which will have a `code` property and possibly a `message`
         * @protected
         */
        $$error: function(err) ***REMOVED***
          $log.error(err);
          this.$destroy(err);
        ***REMOVED***,

        /**
         * Returns ID for a given record
         * @param ***REMOVED***object***REMOVED*** rec
         * @returns ***REMOVED***string||null***REMOVED***
         * @protected
         */
        $$getKey: function(rec) ***REMOVED***
          return angular.isObject(rec)? rec.$id : null;
        ***REMOVED***,

        /**
         * Handles placement of recs in the array, sending notifications,
         * and other internals. Called by the synchronization process
         * after $$added, $$updated, $$moved, and $$removed return a truthy value.
         *
         * @param ***REMOVED***string***REMOVED*** event one of child_added, child_removed, child_moved, or child_changed
         * @param ***REMOVED***object***REMOVED*** rec
         * @param ***REMOVED***string***REMOVED*** [prevChild]
         * @protected
         */
        $$process: function(event, rec, prevChild) ***REMOVED***
          var key = this.$$getKey(rec);
          var changed = false;
          var curPos;
          switch(event) ***REMOVED***
            case 'child_added':
              curPos = this.$indexFor(key);
              break;
            case 'child_moved':
              curPos = this.$indexFor(key);
              this._spliceOut(key);
              break;
            case 'child_removed':
              // remove record from the array
              changed = this._spliceOut(key) !== null;
              break;
            case 'child_changed':
              changed = true;
              break;
            default:
              throw new Error('Invalid event type: ' + event);
          ***REMOVED***
          if( angular.isDefined(curPos) ) ***REMOVED***
            // add it to the array
            changed = this._addAfter(rec, prevChild) !== curPos;
          ***REMOVED***
          if( changed ) ***REMOVED***
            // send notifications to anybody monitoring $watch
            this.$$notify(event, key, prevChild);
          ***REMOVED***
          return changed;
        ***REMOVED***,

        /**
         * Used to trigger notifications for listeners registered using $watch. This method is
         * typically invoked internally by the $$process method.
         *
         * @param ***REMOVED***string***REMOVED*** event
         * @param ***REMOVED***string***REMOVED*** key
         * @param ***REMOVED***string***REMOVED*** [prevChild]
         * @protected
         */
        $$notify: function(event, key, prevChild) ***REMOVED***
          var eventData = ***REMOVED***event: event, key: key***REMOVED***;
          if( angular.isDefined(prevChild) ) ***REMOVED***
            eventData.prevChild = prevChild;
          ***REMOVED***
          angular.forEach(this._observers, function(parts) ***REMOVED***
            parts[0].call(parts[1], eventData);
          ***REMOVED***);
        ***REMOVED***,

        /**
         * Used to insert a new record into the array at a specific position. If prevChild is
         * null, is inserted first, if prevChild is not found, it is inserted last, otherwise,
         * it goes immediately after prevChild.
         *
         * @param ***REMOVED***object***REMOVED*** rec
         * @param ***REMOVED***string|null***REMOVED*** prevChild
         * @private
         */
        _addAfter: function(rec, prevChild) ***REMOVED***
          var i;
          if( prevChild === null ) ***REMOVED***
            i = 0;
          ***REMOVED***
          else ***REMOVED***
            i = this.$indexFor(prevChild)+1;
            if( i === 0 ) ***REMOVED*** i = this.$list.length; ***REMOVED***
          ***REMOVED***
          this.$list.splice(i, 0, rec);
          this._indexCache[this.$$getKey(rec)] = i;
          return i;
        ***REMOVED***,

        /**
         * Removes a record from the array by calling splice. If the item is found
         * this method returns it. Otherwise, this method returns null.
         *
         * @param ***REMOVED***string***REMOVED*** key
         * @returns ***REMOVED***object|null***REMOVED***
         * @private
         */
        _spliceOut: function(key) ***REMOVED***
          var i = this.$indexFor(key);
          if( i > -1 ) ***REMOVED***
            delete this._indexCache[key];
            return this.$list.splice(i, 1)[0];
          ***REMOVED***
          return null;
        ***REMOVED***,

        /**
         * Resolves a variable which may contain an integer or an item that exists in this array.
         * Returns the item or null if it does not exist.
         *
         * @param indexOrItem
         * @returns ***REMOVED*******REMOVED***
         * @private
         */
        _resolveItem: function(indexOrItem) ***REMOVED***
          var list = this.$list;
          if( angular.isNumber(indexOrItem) && indexOrItem >= 0 && list.length >= indexOrItem ) ***REMOVED***
            return list[indexOrItem];
          ***REMOVED***
          else if( angular.isObject(indexOrItem) ) ***REMOVED***
            // it must be an item in this array; it's not sufficient for it just to have
            // a $id or even a $id that is in the array, it must be an actual record
            // the fastest way to determine this is to use $getRecord (to avoid iterating all recs)
            // and compare the two
            var key = this.$$getKey(indexOrItem);
            var rec = this.$getRecord(key);
            return rec === indexOrItem? rec : null;
          ***REMOVED***
          return null;
        ***REMOVED***,

        /**
         * Throws an error if $destroy has been called. Should be used for any function
         * which tries to write data back to $firebase.
         * @param ***REMOVED***string***REMOVED*** method
         * @private
         */
        _assertNotDestroyed: function(method) ***REMOVED***
          if( this._isDestroyed ) ***REMOVED***
            throw new Error('Cannot call ' + method + ' method on a destroyed $firebaseArray object');
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***;

      /**
       * This method allows FirebaseArray to be inherited by child classes. Methods passed into this
       * function will be added onto the array's prototype. They can override existing methods as
       * well.
       *
       * In addition to passing additional methods, it is also possible to pass in a class function.
       * The prototype on that class function will be preserved, and it will inherit from
       * FirebaseArray. It's also possible to do both, passing a class to inherit and additional
       * methods to add onto the prototype.
       *
       *  <pre><code>
       * var ExtendedArray = $firebaseArray.$extend(***REMOVED***
       *    // add a method onto the prototype that sums all items in the array
       *    getSum: function() ***REMOVED***
       *       var ct = 0;
       *       angular.forEach(this.$list, function(rec) ***REMOVED*** ct += rec.x; ***REMOVED***);
        *      return ct;
       *    ***REMOVED***
       * ***REMOVED***);
       *
       * // use our new factory in place of $firebaseArray
       * var list = new ExtendedArray(ref);
       * </code></pre>
       *
       * @param ***REMOVED***Function***REMOVED*** [ChildClass] a child class which should inherit FirebaseArray
       * @param ***REMOVED***Object***REMOVED*** [methods] a list of functions to add onto the prototype
       * @returns ***REMOVED***Function***REMOVED*** a child class suitable for use with $firebase (this will be ChildClass if provided)
       * @static
       */
      FirebaseArray.$extend = function(ChildClass, methods) ***REMOVED***
        if( arguments.length === 1 && angular.isObject(ChildClass) ) ***REMOVED***
          methods = ChildClass;
          ChildClass = function(ref) ***REMOVED***
            if( !(this instanceof ChildClass) ) ***REMOVED***
              return new ChildClass(ref);
            ***REMOVED***
            FirebaseArray.apply(this, arguments);
            return this.$list;
          ***REMOVED***;
        ***REMOVED***
        return $firebaseUtils.inherit(ChildClass, FirebaseArray, methods);
      ***REMOVED***;

      function ArraySyncManager(firebaseArray) ***REMOVED***
        function destroy(err) ***REMOVED***
          if( !sync.isDestroyed ) ***REMOVED***
            sync.isDestroyed = true;
            var ref = firebaseArray.$ref();
            ref.off('child_added', created);
            ref.off('child_moved', moved);
            ref.off('child_changed', updated);
            ref.off('child_removed', removed);
            firebaseArray = null;
            initComplete(err||'destroyed');
          ***REMOVED***
        ***REMOVED***

        function init($list) ***REMOVED***
          var ref = firebaseArray.$ref();

          // listen for changes at the Firebase instance
          ref.on('child_added', created, error);
          ref.on('child_moved', moved, error);
          ref.on('child_changed', updated, error);
          ref.on('child_removed', removed, error);

          // determine when initial load is completed
          ref.once('value', function(snap) ***REMOVED***
            if (angular.isArray(snap.val())) ***REMOVED***
              $log.warn('Storing data using array indices in Firebase can result in unexpected behavior. See https://firebase.google.com/docs/database/web/structure-data for more information.');
            ***REMOVED***

            initComplete(null, $list);
          ***REMOVED***, initComplete);
        ***REMOVED***

        // call initComplete(), do not call this directly
        function _initComplete(err, result) ***REMOVED***
          if( !isResolved ) ***REMOVED***
            isResolved = true;
            if( err ) ***REMOVED*** def.reject(err); ***REMOVED***
            else ***REMOVED*** def.resolve(result); ***REMOVED***
          ***REMOVED***
        ***REMOVED***

        var def = $q.defer();
        var created = function(snap, prevChild) ***REMOVED***
          if (!firebaseArray) ***REMOVED***
            return;
          ***REMOVED***
          waitForResolution(firebaseArray.$$added(snap, prevChild), function(rec) ***REMOVED***
            firebaseArray.$$process('child_added', rec, prevChild);
          ***REMOVED***);
        ***REMOVED***;
        var updated = function(snap) ***REMOVED***
          if (!firebaseArray) ***REMOVED***
            return;
          ***REMOVED***
          var rec = firebaseArray.$getRecord(snap.key);
          if( rec ) ***REMOVED***
            waitForResolution(firebaseArray.$$updated(snap), function() ***REMOVED***
              firebaseArray.$$process('child_changed', rec);
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***;
        var moved   = function(snap, prevChild) ***REMOVED***
          if (!firebaseArray) ***REMOVED***
            return;
          ***REMOVED***
          var rec = firebaseArray.$getRecord(snap.key);
          if( rec ) ***REMOVED***
            waitForResolution(firebaseArray.$$moved(snap, prevChild), function() ***REMOVED***
              firebaseArray.$$process('child_moved', rec, prevChild);
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***;
        var removed = function(snap) ***REMOVED***
          if (!firebaseArray) ***REMOVED***
            return;
          ***REMOVED***
          var rec = firebaseArray.$getRecord(snap.key);
          if( rec ) ***REMOVED***
            waitForResolution(firebaseArray.$$removed(snap), function() ***REMOVED***
               firebaseArray.$$process('child_removed', rec);
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***;

        function waitForResolution(maybePromise, callback) ***REMOVED***
          var promise = $q.when(maybePromise);
          promise.then(function(result)***REMOVED***
            if (result) ***REMOVED***
              callback(result);
            ***REMOVED***
          ***REMOVED***);
          if (!isResolved) ***REMOVED***
            resolutionPromises.push(promise);
          ***REMOVED***
        ***REMOVED***

        var resolutionPromises = [];
        var isResolved = false;
        var error   = $firebaseUtils.batch(function(err) ***REMOVED***
          _initComplete(err);
          if( firebaseArray ) ***REMOVED***
            firebaseArray.$$error(err);
          ***REMOVED***
        ***REMOVED***);
        var initComplete = $firebaseUtils.batch(_initComplete);

        var sync = ***REMOVED***
          destroy: destroy,
          isDestroyed: false,
          init: init,
          ready: function() ***REMOVED*** return def.promise.then(function(result)***REMOVED***
            return $q.all(resolutionPromises).then(function()***REMOVED***
              return result;
            ***REMOVED***);
          ***REMOVED***); ***REMOVED***
        ***REMOVED***;

        return sync;
      ***REMOVED***

      return FirebaseArray;
    ***REMOVED***
  ]);

  /** @deprecated */
  angular.module('firebase').factory('$FirebaseArray', ['$log', '$firebaseArray',
    function($log, $firebaseArray) ***REMOVED***
      return function() ***REMOVED***
        $log.warn('$FirebaseArray has been renamed. Use $firebaseArray instead.');
        return $firebaseArray.apply(null, arguments);
      ***REMOVED***;
    ***REMOVED***
  ]);
***REMOVED***)();

(function() ***REMOVED***
  'use strict';
  var FirebaseAuth;

  // Define a service which provides user authentication and management.
  angular.module('firebase').factory('$firebaseAuth', [
    '$q', '$firebaseUtils', function($q, $firebaseUtils) ***REMOVED***
      /**
       * This factory returns an object allowing you to manage the client's authentication state.
       *
       * @param ***REMOVED***Firebase.auth.Auth***REMOVED*** auth A Firebase auth instance to authenticate.
       * @return ***REMOVED***object***REMOVED*** An object containing methods for authenticating clients, retrieving
       * authentication state, and managing users.
       */
      return function(auth) ***REMOVED***
        auth = auth || firebase.auth();

        var firebaseAuth = new FirebaseAuth($q, $firebaseUtils, auth);
        return firebaseAuth.construct();
      ***REMOVED***;
    ***REMOVED***
  ]);

  FirebaseAuth = function($q, $firebaseUtils, auth) ***REMOVED***
    this._q = $q;
    this._utils = $firebaseUtils;

    if (typeof auth === 'string') ***REMOVED***
      throw new Error('The $firebaseAuth service accepts a Firebase auth instance (or nothing) instead of a URL.');
    ***REMOVED*** else if (typeof auth.ref !== 'undefined') ***REMOVED***
      throw new Error('The $firebaseAuth service accepts a Firebase auth instance (or nothing) instead of a Database reference.');
    ***REMOVED***

    this._auth = auth;
    this._initialAuthResolver = this._initAuthResolver();
  ***REMOVED***;

  FirebaseAuth.prototype = ***REMOVED***
    construct: function() ***REMOVED***
      this._object = ***REMOVED***
        // Authentication methods
        $signInWithCustomToken: this.signInWithCustomToken.bind(this),
        $signInAnonymously: this.signInAnonymously.bind(this),
        $signInWithEmailAndPassword: this.signInWithEmailAndPassword.bind(this),
        $signInWithPopup: this.signInWithPopup.bind(this),
        $signInWithRedirect: this.signInWithRedirect.bind(this),
        $signInWithCredential: this.signInWithCredential.bind(this),
        $signOut: this.signOut.bind(this),

        // Authentication state methods
        $onAuthStateChanged: this.onAuthStateChanged.bind(this),
        $getAuth: this.getAuth.bind(this),
        $requireSignIn: this.requireSignIn.bind(this),
        $waitForSignIn: this.waitForSignIn.bind(this),

        // User management methods
        $createUserWithEmailAndPassword: this.createUserWithEmailAndPassword.bind(this),
        $updatePassword: this.updatePassword.bind(this),
        $updateEmail: this.updateEmail.bind(this),
        $deleteUser: this.deleteUser.bind(this),
        $sendPasswordResetEmail: this.sendPasswordResetEmail.bind(this),

        // Hack: needed for tests
        _: this
      ***REMOVED***;

      return this._object;
    ***REMOVED***,


    /********************/
    /*  Authentication  */
    /********************/

    /**
     * Authenticates the Firebase reference with a custom authentication token.
     *
     * @param ***REMOVED***string***REMOVED*** authToken An authentication token or a Firebase Secret. A Firebase Secret
     * should only be used for authenticating a server process and provides full read / write
     * access to the entire Firebase.
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with an object containing authentication data.
     */
    signInWithCustomToken: function(authToken) ***REMOVED***
      return this._q.when(this._auth.signInWithCustomToken(authToken));
    ***REMOVED***,

    /**
     * Authenticates the Firebase reference anonymously.
     *
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with an object containing authentication data.
     */
    signInAnonymously: function() ***REMOVED***
      return this._q.when(this._auth.signInAnonymously());
    ***REMOVED***,

    /**
     * Authenticates the Firebase reference with an email/password user.
     *
     * @param ***REMOVED***String***REMOVED*** email An email address for the new user.
     * @param ***REMOVED***String***REMOVED*** password A password for the new email.
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with an object containing authentication data.
     */
    signInWithEmailAndPassword: function(email, password) ***REMOVED***
      return this._q.when(this._auth.signInWithEmailAndPassword(email, password));
    ***REMOVED***,

    /**
     * Authenticates the Firebase reference with the OAuth popup flow.
     *
     * @param ***REMOVED***object|string***REMOVED*** provider A firebase.auth.AuthProvider or a unique provider ID like 'facebook'.
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with an object containing authentication data.
     */
    signInWithPopup: function(provider) ***REMOVED***
      return this._q.when(this._auth.signInWithPopup(this._getProvider(provider)));
    ***REMOVED***,

    /**
     * Authenticates the Firebase reference with the OAuth redirect flow.
     *
     * @param ***REMOVED***object|string***REMOVED*** provider A firebase.auth.AuthProvider or a unique provider ID like 'facebook'.
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with an object containing authentication data.
     */
    signInWithRedirect: function(provider) ***REMOVED***
      return this._q.when(this._auth.signInWithRedirect(this._getProvider(provider)));
    ***REMOVED***,

    /**
     * Authenticates the Firebase reference with an OAuth token.
     *
     * @param ***REMOVED***firebase.auth.AuthCredential***REMOVED*** credential The Firebase credential.
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with an object containing authentication data.
     */
    signInWithCredential: function(credential) ***REMOVED***
      return this._q.when(this._auth.signInWithCredential(credential));
    ***REMOVED***,

    /**
     * Unauthenticates the Firebase reference.
     */
    signOut: function() ***REMOVED***
      if (this.getAuth() !== null) ***REMOVED***
        this._auth.signOut();
      ***REMOVED***
    ***REMOVED***,


    /**************************/
    /*  Authentication State  */
    /**************************/
    /**
     * Asynchronously fires the provided callback with the current authentication data every time
     * the authentication data changes. It also fires as soon as the authentication data is
     * retrieved from the server.
     *
     * @param ***REMOVED***function***REMOVED*** callback A callback that fires when the client's authenticate state
     * changes. If authenticated, the callback will be passed an object containing authentication
     * data according to the provider used to authenticate. Otherwise, it will be passed null.
     * @param ***REMOVED***string***REMOVED*** [context] If provided, this object will be used as this when calling your
     * callback.
     * @return ***REMOVED***Promise<Function>***REMOVED*** A promised fulfilled with a function which can be used to
     * deregister the provided callback.
     */
    onAuthStateChanged: function(callback, context) ***REMOVED***
      var fn = this._utils.debounce(callback, context, 0);
      var off = this._auth.onAuthStateChanged(fn);

      // Return a method to detach the `onAuthStateChanged()` callback.
      return off;
    ***REMOVED***,

    /**
     * Synchronously retrieves the current authentication data.
     *
     * @return ***REMOVED***Object***REMOVED*** The client's authentication data.
     */
    getAuth: function() ***REMOVED***
      return this._auth.currentUser;
    ***REMOVED***,

    /**
     * Helper onAuthStateChanged() callback method for the two router-related methods.
     *
     * @param ***REMOVED***boolean***REMOVED*** rejectIfAuthDataIsNull Determines if the returned promise should be
     * resolved or rejected upon an unauthenticated client.
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with the client's authentication state or
     * rejected if the client is unauthenticated and rejectIfAuthDataIsNull is true.
     */
    _routerMethodOnAuthPromise: function(rejectIfAuthDataIsNull) ***REMOVED***
      var self = this;

      // wait for the initial auth state to resolve; on page load we have to request auth state
      // asynchronously so we don't want to resolve router methods or flash the wrong state
      return this._initialAuthResolver.then(function() ***REMOVED***
        // auth state may change in the future so rather than depend on the initially resolved state
        // we also check the auth data (synchronously) if a new promise is requested, ensuring we resolve
        // to the current auth state and not a stale/initial state
        var authData = self.getAuth(), res = null;
        if (rejectIfAuthDataIsNull && authData === null) ***REMOVED***
          res = self._q.reject("AUTH_REQUIRED");
        ***REMOVED***
        else ***REMOVED***
          res = self._q.when(authData);
        ***REMOVED***
        return res;
      ***REMOVED***);
    ***REMOVED***,

    /**
     * Helper method to turn provider names into AuthProvider instances
     *
     * @param ***REMOVED***object***REMOVED*** stringOrProvider Provider ID string to AuthProvider instance
     * @return ***REMOVED***firebdase.auth.AuthProvider***REMOVED*** A valid AuthProvider instance
     */
    _getProvider: function (stringOrProvider) ***REMOVED***
      var provider;
      if (typeof stringOrProvider == "string") ***REMOVED***
        var providerID = stringOrProvider.slice(0, 1).toUpperCase() + stringOrProvider.slice(1);
        provider = new firebase.auth[providerID+"AuthProvider"]();
      ***REMOVED*** else ***REMOVED***
        provider = stringOrProvider;
      ***REMOVED***
      return provider;
    ***REMOVED***,

    /**
     * Helper that returns a promise which resolves when the initial auth state has been
     * fetched from the Firebase server. This never rejects and resolves to undefined.
     *
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled when the server returns initial auth state.
     */
    _initAuthResolver: function() ***REMOVED***
      var auth = this._auth;

      return this._q(function(resolve) ***REMOVED***
        var off;
        function callback() ***REMOVED***
          // Turn off this onAuthStateChanged() callback since we just needed to get the authentication data once.
          off();
          resolve();
        ***REMOVED***
        off = auth.onAuthStateChanged(callback);
      ***REMOVED***);
    ***REMOVED***,

    /**
     * Utility method which can be used in a route's resolve() method to require that a route has
     * a logged in client.
     *
     * @returns ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with the client's current authentication
     * state or rejected if the client is not authenticated.
     */
    requireSignIn: function() ***REMOVED***
      return this._routerMethodOnAuthPromise(true);
    ***REMOVED***,

    /**
     * Utility method which can be used in a route's resolve() method to grab the current
     * authentication data.
     *
     * @returns ***REMOVED***Promise<Object|null>***REMOVED*** A promise fulfilled with the client's current authentication
     * state, which will be null if the client is not authenticated.
     */
    waitForSignIn: function() ***REMOVED***
      return this._routerMethodOnAuthPromise(false);
    ***REMOVED***,


    /*********************/
    /*  User Management  */
    /*********************/
    /**
     * Creates a new email/password user. Note that this function only creates the user, if you
     * wish to log in as the newly created user, call $authWithPassword() after the promise for
     * this method has been resolved.
     *
     * @param ***REMOVED***string***REMOVED*** email An email for this user.
     * @param ***REMOVED***string***REMOVED*** password A password for this user.
     * @return ***REMOVED***Promise<Object>***REMOVED*** A promise fulfilled with the user object, which contains the
     * uid of the created user.
     */
    createUserWithEmailAndPassword: function(email, password) ***REMOVED***
      return this._q.when(this._auth.createUserWithEmailAndPassword(email, password));
    ***REMOVED***,

    /**
     * Changes the password for an email/password user.
     *
     * @param ***REMOVED***string***REMOVED*** password A new password for the current user.
     * @return ***REMOVED***Promise<>***REMOVED*** An empty promise fulfilled once the password change is complete.
     */
    updatePassword: function(password) ***REMOVED***
      var user = this.getAuth();
      if (user) ***REMOVED***
        return this._q.when(user.updatePassword(password));
      ***REMOVED*** else ***REMOVED***
        return this._q.reject("Cannot update password since there is no logged in user.");
      ***REMOVED***
    ***REMOVED***,

    /**
     * Changes the email for an email/password user.
     *
     * @param ***REMOVED***String***REMOVED*** email The new email for the currently logged in user.
     * @return ***REMOVED***Promise<>***REMOVED*** An empty promise fulfilled once the email change is complete.
     */
    updateEmail: function(email) ***REMOVED***
      var user = this.getAuth();
      if (user) ***REMOVED***
        return this._q.when(user.updateEmail(email));
      ***REMOVED*** else ***REMOVED***
        return this._q.reject("Cannot update email since there is no logged in user.");
      ***REMOVED***
    ***REMOVED***,

    /**
     * Deletes the currently logged in user.
     *
     * @return ***REMOVED***Promise<>***REMOVED*** An empty promise fulfilled once the user is removed.
     */
    deleteUser: function() ***REMOVED***
      var user = this.getAuth();
      if (user) ***REMOVED***
        return this._q.when(user.delete());
      ***REMOVED*** else ***REMOVED***
        return this._q.reject("Cannot delete user since there is no logged in user.");
      ***REMOVED***
    ***REMOVED***,


    /**
     * Sends a password reset email to an email/password user.
     *
     * @param ***REMOVED***string***REMOVED*** email An email address to send a password reset to.
     * @return ***REMOVED***Promise<>***REMOVED*** An empty promise fulfilled once the reset password email is sent.
     */
    sendPasswordResetEmail: function(email) ***REMOVED***
      return this._q.when(this._auth.sendPasswordResetEmail(email));
    ***REMOVED***
  ***REMOVED***;
***REMOVED***)();

(function() ***REMOVED***
  'use strict';
  /**
   * Creates and maintains a synchronized object, with 2-way bindings between Angular and Firebase.
   *
   * Implementations of this class are contracted to provide the following internal methods,
   * which are used by the synchronization process and 3-way bindings:
   *    $$updated - called whenever a change occurs (a value event from Firebase)
   *    $$error - called when listeners are canceled due to a security error
   *    $$notify - called to update $watch listeners and trigger updates to 3-way bindings
   *    $ref - called to obtain the underlying Firebase reference
   *
   * Instead of directly modifying this class, one should generally use the $extend
   * method to add or change how methods behave:
   *
   * <pre><code>
   * var ExtendedObject = $firebaseObject.$extend(***REMOVED***
   *    // add a new method to the prototype
   *    foo: function() ***REMOVED*** return 'bar'; ***REMOVED***,
   * ***REMOVED***);
   *
   * var obj = new ExtendedObject(ref);
   * </code></pre>
   */
  angular.module('firebase').factory('$firebaseObject', [
    '$parse', '$firebaseUtils', '$log', '$q',
    function($parse, $firebaseUtils, $log, $q) ***REMOVED***
      /**
       * Creates a synchronized object with 2-way bindings between Angular and Firebase.
       *
       * @param ***REMOVED***Firebase***REMOVED*** ref
       * @returns ***REMOVED***FirebaseObject***REMOVED***
       * @constructor
       */
      function FirebaseObject(ref) ***REMOVED***
        if( !(this instanceof FirebaseObject) ) ***REMOVED***
          return new FirebaseObject(ref);
        ***REMOVED***
        // These are private config props and functions used internally
        // they are collected here to reduce clutter in console.log and forEach
        this.$$conf = ***REMOVED***
          // synchronizes data to Firebase
          sync: new ObjectSyncManager(this, ref),
          // stores the Firebase ref
          ref: ref,
          // synchronizes $scope variables with this object
          binding: new ThreeWayBinding(this),
          // stores observers registered with $watch
          listeners: []
        ***REMOVED***;

        // this bit of magic makes $$conf non-enumerable and non-configurable
        // and non-writable (its properties are still writable but the ref cannot be replaced)
        // we redundantly assign it above so the IDE can relax
        Object.defineProperty(this, '$$conf', ***REMOVED***
          value: this.$$conf
        ***REMOVED***);

        this.$id = ref.ref.key;
        this.$priority = null;

        $firebaseUtils.applyDefaults(this, this.$$defaults);

        // start synchronizing data with Firebase
        this.$$conf.sync.init();
      ***REMOVED***

      FirebaseObject.prototype = ***REMOVED***
        /**
         * Saves all data on the FirebaseObject back to Firebase.
         * @returns a promise which will resolve after the save is completed.
         */
        $save: function () ***REMOVED***
          var self = this;
          var ref = self.$ref();
          var def = $q.defer();
          var dataJSON;

          try ***REMOVED***
            dataJSON = $firebaseUtils.toJSON(self);
          ***REMOVED*** catch (e) ***REMOVED***
            def.reject(e);
          ***REMOVED***

          if (typeof dataJSON !== 'undefined') ***REMOVED***
            $firebaseUtils.doSet(ref, dataJSON).then(function() ***REMOVED***
              self.$$notify();
              def.resolve(self.$ref());
            ***REMOVED***).catch(def.reject);
          ***REMOVED***

          return def.promise;
        ***REMOVED***,

        /**
         * Removes all keys from the FirebaseObject and also removes
         * the remote data from the server.
         *
         * @returns a promise which will resolve after the op completes
         */
        $remove: function() ***REMOVED***
          var self = this;
          $firebaseUtils.trimKeys(self, ***REMOVED******REMOVED***);
          self.$value = null;
          return $firebaseUtils.doRemove(self.$ref()).then(function() ***REMOVED***
            self.$$notify();
            return self.$ref();
          ***REMOVED***);
        ***REMOVED***,

        /**
         * The loaded method is invoked after the initial batch of data arrives from the server.
         * When this resolves, all data which existed prior to calling $asObject() is now cached
         * locally in the object.
         *
         * As a shortcut is also possible to pass resolve/reject methods directly into this
         * method just as they would be passed to .then()
         *
         * @param ***REMOVED***Function***REMOVED*** resolve
         * @param ***REMOVED***Function***REMOVED*** reject
         * @returns a promise which resolves after initial data is downloaded from Firebase
         */
        $loaded: function(resolve, reject) ***REMOVED***
          var promise = this.$$conf.sync.ready();
          if (arguments.length) ***REMOVED***
            // allow this method to be called just like .then
            // by passing any arguments on to .then
            promise = promise.then.call(promise, resolve, reject);
          ***REMOVED***
          return promise;
        ***REMOVED***,

        /**
         * @returns ***REMOVED***Firebase***REMOVED*** the original Firebase instance used to create this object.
         */
        $ref: function () ***REMOVED***
          return this.$$conf.ref;
        ***REMOVED***,

        /**
         * Creates a 3-way data sync between this object, the Firebase server, and a
         * scope variable. This means that any changes made to the scope variable are
         * pushed to Firebase, and vice versa.
         *
         * If scope emits a $destroy event, the binding is automatically severed. Otherwise,
         * it is possible to unbind the scope variable by using the `unbind` function
         * passed into the resolve method.
         *
         * Can only be bound to one scope variable at a time. If a second is attempted,
         * the promise will be rejected with an error.
         *
         * @param ***REMOVED***object***REMOVED*** scope
         * @param ***REMOVED***string***REMOVED*** varName
         * @returns a promise which resolves to an unbind method after data is set in scope
         */
        $bindTo: function (scope, varName) ***REMOVED***
          var self = this;
          return self.$loaded().then(function () ***REMOVED***
            return self.$$conf.binding.bindTo(scope, varName);
          ***REMOVED***);
        ***REMOVED***,

        /**
         * Listeners passed into this method are notified whenever a new change is received
         * from the server. Each invocation is sent an object containing
         * <code>***REMOVED*** type: 'value', key: 'my_firebase_id' ***REMOVED***</code>
         *
         * This method returns an unbind function that can be used to detach the listener.
         *
         * @param ***REMOVED***Function***REMOVED*** cb
         * @param ***REMOVED***Object***REMOVED*** [context]
         * @returns ***REMOVED***Function***REMOVED*** invoke to stop observing events
         */
        $watch: function (cb, context) ***REMOVED***
          var list = this.$$conf.listeners;
          list.push([cb, context]);
          // an off function for cancelling the listener
          return function () ***REMOVED***
            var i = list.findIndex(function (parts) ***REMOVED***
              return parts[0] === cb && parts[1] === context;
            ***REMOVED***);
            if (i > -1) ***REMOVED***
              list.splice(i, 1);
            ***REMOVED***
          ***REMOVED***;
        ***REMOVED***,

        /**
         * Informs $firebase to stop sending events and clears memory being used
         * by this object (delete's its local content).
         */
        $destroy: function(err) ***REMOVED***
          var self = this;
          if (!self.$isDestroyed) ***REMOVED***
            self.$isDestroyed = true;
            self.$$conf.sync.destroy(err);
            self.$$conf.binding.destroy();
            $firebaseUtils.each(self, function (v, k) ***REMOVED***
              delete self[k];
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***,

        /**
         * Called by $firebase whenever an item is changed at the server.
         * This method must exist on any objectFactory passed into $firebase.
         *
         * It should return true if any changes were made, otherwise `$$notify` will
         * not be invoked.
         *
         * @param ***REMOVED***object***REMOVED*** snap a Firebase snapshot
         * @return ***REMOVED***boolean***REMOVED*** true if any changes were made.
         */
        $$updated: function (snap) ***REMOVED***
          // applies new data to this object
          var changed = $firebaseUtils.updateRec(this, snap);
          // applies any defaults set using $$defaults
          $firebaseUtils.applyDefaults(this, this.$$defaults);
          // returning true here causes $$notify to be triggered
          return changed;
        ***REMOVED***,

        /**
         * Called whenever a security error or other problem causes the listeners to become
         * invalid. This is generally an unrecoverable error.
         * @param ***REMOVED***Object***REMOVED*** err which will have a `code` property and possibly a `message`
         */
        $$error: function (err) ***REMOVED***
          // prints an error to the console (via Angular's logger)
          $log.error(err);
          // frees memory and cancels any remaining listeners
          this.$destroy(err);
        ***REMOVED***,

        /**
         * Called internally by $bindTo when data is changed in $scope.
         * Should apply updates to this record but should not call
         * notify().
         */
        $$scopeUpdated: function(newData) ***REMOVED***
          // we use a one-directional loop to avoid feedback with 3-way bindings
          // since set() is applied locally anyway, this is still performant
          var def = $q.defer();
          this.$ref().set($firebaseUtils.toJSON(newData), $firebaseUtils.makeNodeResolver(def));
          return def.promise;
        ***REMOVED***,

        /**
         * Updates any bound scope variables and
         * notifies listeners registered with $watch
         */
        $$notify: function() ***REMOVED***
          var self = this, list = this.$$conf.listeners.slice();
          // be sure to do this after setting up data and init state
          angular.forEach(list, function (parts) ***REMOVED***
            parts[0].call(parts[1], ***REMOVED***event: 'value', key: self.$id***REMOVED***);
          ***REMOVED***);
        ***REMOVED***,

        /**
         * Overrides how Angular.forEach iterates records on this object so that only
         * fields stored in Firebase are part of the iteration. To include meta fields like
         * $id and $priority in the iteration, utilize for(key in obj) instead.
         */
        forEach: function(iterator, context) ***REMOVED***
          return $firebaseUtils.each(this, iterator, context);
        ***REMOVED***
      ***REMOVED***;

      /**
       * This method allows FirebaseObject to be copied into a new factory. Methods passed into this
       * function will be added onto the object's prototype. They can override existing methods as
       * well.
       *
       * In addition to passing additional methods, it is also possible to pass in a class function.
       * The prototype on that class function will be preserved, and it will inherit from
       * FirebaseObject. It's also possible to do both, passing a class to inherit and additional
       * methods to add onto the prototype.
       *
       * Once a factory is obtained by this method, it can be passed into $firebase as the
       * `objectFactory` parameter:
       *
       * <pre><code>
       * var MyFactory = $firebaseObject.$extend(***REMOVED***
       *    // add a method onto the prototype that prints a greeting
       *    getGreeting: function() ***REMOVED***
       *       return 'Hello ' + this.first_name + ' ' + this.last_name + '!';
       *    ***REMOVED***
       * ***REMOVED***);
       *
       * // use our new factory in place of $firebaseObject
       * var obj = $firebase(ref, ***REMOVED***objectFactory: MyFactory***REMOVED***).$asObject();
       * </code></pre>
       *
       * @param ***REMOVED***Function***REMOVED*** [ChildClass] a child class which should inherit FirebaseObject
       * @param ***REMOVED***Object***REMOVED*** [methods] a list of functions to add onto the prototype
       * @returns ***REMOVED***Function***REMOVED*** a new factory suitable for use with $firebase
       */
      FirebaseObject.$extend = function(ChildClass, methods) ***REMOVED***
        if( arguments.length === 1 && angular.isObject(ChildClass) ) ***REMOVED***
          methods = ChildClass;
          ChildClass = function(ref) ***REMOVED***
            if( !(this instanceof ChildClass) ) ***REMOVED***
              return new ChildClass(ref);
            ***REMOVED***
            FirebaseObject.apply(this, arguments);
          ***REMOVED***;
        ***REMOVED***
        return $firebaseUtils.inherit(ChildClass, FirebaseObject, methods);
      ***REMOVED***;

      /**
       * Creates a three-way data binding on a scope variable.
       *
       * @param ***REMOVED***FirebaseObject***REMOVED*** rec
       * @returns ***REMOVED*******REMOVED***
       * @constructor
       */
      function ThreeWayBinding(rec) ***REMOVED***
        this.subs = [];
        this.scope = null;
        this.key = null;
        this.rec = rec;
      ***REMOVED***

      ThreeWayBinding.prototype = ***REMOVED***
        assertNotBound: function(varName) ***REMOVED***
          if( this.scope ) ***REMOVED***
            var msg = 'Cannot bind to ' + varName + ' because this instance is already bound to ' +
              this.key + '; one binding per instance ' +
              '(call unbind method or create another FirebaseObject instance)';
            $log.error(msg);
            return $q.reject(msg);
          ***REMOVED***
        ***REMOVED***,

        bindTo: function(scope, varName) ***REMOVED***
          function _bind(self) ***REMOVED***
            var sending = false;
            var parsed = $parse(varName);
            var rec = self.rec;
            self.scope = scope;
            self.varName = varName;

            function equals(scopeValue) ***REMOVED***
              return angular.equals(scopeValue, rec) &&
                scopeValue.$priority === rec.$priority &&
                scopeValue.$value === rec.$value;
            ***REMOVED***

            function setScope(rec) ***REMOVED***
              parsed.assign(scope, $firebaseUtils.scopeData(rec));
            ***REMOVED***

            var send = $firebaseUtils.debounce(function(val) ***REMOVED***
              var scopeData = $firebaseUtils.scopeData(val);
              rec.$$scopeUpdated(scopeData)
                ['finally'](function() ***REMOVED***
                  sending = false;
                  if(!scopeData.hasOwnProperty('$value'))***REMOVED***
                    delete rec.$value;
                    delete parsed(scope).$value;
                  ***REMOVED***
                  setScope(rec);
                ***REMOVED***
              );
            ***REMOVED***, 50, 500);

            var scopeUpdated = function(newVal) ***REMOVED***
              newVal = newVal[0];
              if( !equals(newVal) ) ***REMOVED***
                sending = true;
                send(newVal);
              ***REMOVED***
            ***REMOVED***;

            var recUpdated = function() ***REMOVED***
              if( !sending && !equals(parsed(scope)) ) ***REMOVED***
                setScope(rec);
              ***REMOVED***
            ***REMOVED***;

            // $watch will not check any vars prefixed with $, so we
            // manually check $priority and $value using this method
            function watchExp()***REMOVED***
              var obj = parsed(scope);
              return [obj, obj.$priority, obj.$value];
            ***REMOVED***

            setScope(rec);
            self.subs.push(scope.$on('$destroy', self.unbind.bind(self)));

            // monitor scope for any changes
            self.subs.push(scope.$watch(watchExp, scopeUpdated, true));

            // monitor the object for changes
            self.subs.push(rec.$watch(recUpdated));

            return self.unbind.bind(self);
          ***REMOVED***

          return this.assertNotBound(varName) || _bind(this);
        ***REMOVED***,

        unbind: function() ***REMOVED***
          if( this.scope ) ***REMOVED***
            angular.forEach(this.subs, function(unbind) ***REMOVED***
              unbind();
            ***REMOVED***);
            this.subs = [];
            this.scope = null;
            this.key = null;
          ***REMOVED***
        ***REMOVED***,

        destroy: function() ***REMOVED***
          this.unbind();
          this.rec = null;
        ***REMOVED***
      ***REMOVED***;

      function ObjectSyncManager(firebaseObject, ref) ***REMOVED***
        function destroy(err) ***REMOVED***
          if( !sync.isDestroyed ) ***REMOVED***
            sync.isDestroyed = true;
            ref.off('value', applyUpdate);
            firebaseObject = null;
            initComplete(err||'destroyed');
          ***REMOVED***
        ***REMOVED***

        function init() ***REMOVED***
          ref.on('value', applyUpdate, error);
          ref.once('value', function(snap) ***REMOVED***
            if (angular.isArray(snap.val())) ***REMOVED***
              $log.warn('Storing data using array indices in Firebase can result in unexpected behavior. See https://firebase.google.com/docs/database/web/structure-data for more information. Also note that you probably wanted $firebaseArray and not $firebaseObject.');
            ***REMOVED***

            initComplete(null);
          ***REMOVED***, initComplete);
        ***REMOVED***

        // call initComplete(); do not call this directly
        function _initComplete(err) ***REMOVED***
          if( !isResolved ) ***REMOVED***
            isResolved = true;
            if( err ) ***REMOVED*** def.reject(err); ***REMOVED***
            else ***REMOVED*** def.resolve(firebaseObject); ***REMOVED***
          ***REMOVED***
        ***REMOVED***

        var isResolved = false;
        var def = $q.defer();
        var applyUpdate = $firebaseUtils.batch(function(snap) ***REMOVED***
          var changed = firebaseObject.$$updated(snap);
          if( changed ) ***REMOVED***
            // notifies $watch listeners and
            // updates $scope if bound to a variable
            firebaseObject.$$notify();
          ***REMOVED***
        ***REMOVED***);
        var error = $firebaseUtils.batch(function(err) ***REMOVED***
          _initComplete(err);
          if( firebaseObject ) ***REMOVED***
            firebaseObject.$$error(err);
          ***REMOVED***
        ***REMOVED***);
        var initComplete = $firebaseUtils.batch(_initComplete);

        var sync = ***REMOVED***
          isDestroyed: false,
          destroy: destroy,
          init: init,
          ready: function() ***REMOVED*** return def.promise; ***REMOVED***
        ***REMOVED***;
        return sync;
      ***REMOVED***

      return FirebaseObject;
    ***REMOVED***
  ]);

  /** @deprecated */
  angular.module('firebase').factory('$FirebaseObject', ['$log', '$firebaseObject',
    function($log, $firebaseObject) ***REMOVED***
      return function() ***REMOVED***
        $log.warn('$FirebaseObject has been renamed. Use $firebaseObject instead.');
        return $firebaseObject.apply(null, arguments);
      ***REMOVED***;
    ***REMOVED***
  ]);
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  angular.module("firebase")

    /** @deprecated */
    .factory("$firebase", function() ***REMOVED***
      return function() ***REMOVED***
        throw new Error('$firebase has been removed. You may instantiate $firebaseArray and $firebaseObject ' +
        'directly now. For simple write operations, just use the Firebase ref directly. ' +
        'See the AngularFire 1.0.0 changelog for details: https://github.com/firebase/angularfire/releases/tag/v1.0.0');
      ***REMOVED***;
    ***REMOVED***);

***REMOVED***)();

(function() ***REMOVED***
  "use strict";

  function FirebaseAuthService($firebaseAuth) ***REMOVED***
    return $firebaseAuth();
  ***REMOVED***
  FirebaseAuthService.$inject = ['$firebaseAuth', '$firebaseRef'];

  angular.module('firebase')
    .factory('$firebaseAuthService', FirebaseAuthService);

***REMOVED***)();

(function() ***REMOVED***
  "use strict";

  function FirebaseRef() ***REMOVED***
    this.urls = null;
    this.registerUrl = function registerUrl(urlOrConfig) ***REMOVED***

      if (typeof urlOrConfig === 'string') ***REMOVED***
        this.urls = ***REMOVED******REMOVED***;
        this.urls.default = urlOrConfig;
      ***REMOVED***

      if (angular.isObject(urlOrConfig)) ***REMOVED***
        this.urls = urlOrConfig;
      ***REMOVED***

    ***REMOVED***;

    this.$$checkUrls = function $$checkUrls(urlConfig) ***REMOVED***
      if (!urlConfig) ***REMOVED***
        return new Error('No Firebase URL registered. Use firebaseRefProvider.registerUrl() in the config phase. This is required if you are using $firebaseAuthService.');
      ***REMOVED***
      if (!urlConfig.default) ***REMOVED***
        return new Error('No default Firebase URL registered. Use firebaseRefProvider.registerUrl(***REMOVED*** default: "https://<my-firebase-app>.firebaseio.com/"***REMOVED***).');
      ***REMOVED***
    ***REMOVED***;

    this.$$createRefsFromUrlConfig = function $$createMultipleRefs(urlConfig) ***REMOVED***
      var refs = ***REMOVED******REMOVED***;
      var error = this.$$checkUrls(urlConfig);
      if (error) ***REMOVED*** throw error; ***REMOVED***
      angular.forEach(urlConfig, function(value, key) ***REMOVED***
        refs[key] = firebase.database().refFromURL(value);
      ***REMOVED***);
      return refs;
    ***REMOVED***;

    this.$get = function FirebaseRef_$get() ***REMOVED***
      return this.$$createRefsFromUrlConfig(this.urls);
    ***REMOVED***;
  ***REMOVED***

  angular.module('firebase')
    .provider('$firebaseRef', FirebaseRef);

***REMOVED***)();

'use strict';

// Shim Array.indexOf for IE compatibility.
if (!Array.prototype.indexOf) ***REMOVED***
  Array.prototype.indexOf = function (searchElement, fromIndex) ***REMOVED***
    if (this === undefined || this === null) ***REMOVED***
      throw new TypeError("'this' is null or not defined");
    ***REMOVED***
    // Hack to convert object.length to a UInt32
    // jshint -W016
    var length = this.length >>> 0;
    fromIndex = +fromIndex || 0;
    // jshint +W016

    if (Math.abs(fromIndex) === Infinity) ***REMOVED***
      fromIndex = 0;
    ***REMOVED***

    if (fromIndex < 0) ***REMOVED***
      fromIndex += length;
      if (fromIndex < 0) ***REMOVED***
        fromIndex = 0;
      ***REMOVED***
    ***REMOVED***

    for (;fromIndex < length; fromIndex++) ***REMOVED***
      if (this[fromIndex] === searchElement) ***REMOVED***
        return fromIndex;
      ***REMOVED***
    ***REMOVED***

    return -1;
  ***REMOVED***;
***REMOVED***

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) ***REMOVED***
  Function.prototype.bind = function (oThis) ***REMOVED***
    if (typeof this !== "function") ***REMOVED***
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    ***REMOVED***

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () ***REMOVED******REMOVED***,
      fBound = function () ***REMOVED***
        return fToBind.apply(this instanceof fNOP && oThis
            ? this
            : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      ***REMOVED***;

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  ***REMOVED***;
***REMOVED***

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
if (!Array.prototype.findIndex) ***REMOVED***
  Object.defineProperty(Array.prototype, 'findIndex', ***REMOVED***
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(predicate) ***REMOVED***
      if (this == null) ***REMOVED***
        throw new TypeError('Array.prototype.find called on null or undefined');
      ***REMOVED***
      if (typeof predicate !== 'function') ***REMOVED***
        throw new TypeError('predicate must be a function');
      ***REMOVED***
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) ***REMOVED***
        if (i in list) ***REMOVED***
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) ***REMOVED***
            return i;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      return -1;
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
if (typeof Object.create != 'function') ***REMOVED***
  (function () ***REMOVED***
    var F = function () ***REMOVED******REMOVED***;
    Object.create = function (o) ***REMOVED***
      if (arguments.length > 1) ***REMOVED***
        throw new Error('Second argument not supported');
      ***REMOVED***
      if (o === null) ***REMOVED***
        throw new Error('Cannot set a null [[Prototype]]');
      ***REMOVED***
      if (typeof o != 'object') ***REMOVED***
        throw new TypeError('Argument must be an object');
      ***REMOVED***
      F.prototype = o;
      return new F();
    ***REMOVED***;
  ***REMOVED***)();
***REMOVED***

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) ***REMOVED***
  Object.keys = (function () ***REMOVED***
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !(***REMOVED***toString: null***REMOVED***).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;

    return function (obj) ***REMOVED***
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) ***REMOVED***
        throw new TypeError('Object.keys called on non-object');
      ***REMOVED***

      var result = [], prop, i;

      for (prop in obj) ***REMOVED***
        if (hasOwnProperty.call(obj, prop)) ***REMOVED***
          result.push(prop);
        ***REMOVED***
      ***REMOVED***

      if (hasDontEnumBug) ***REMOVED***
        for (i = 0; i < dontEnumsLength; i++) ***REMOVED***
          if (hasOwnProperty.call(obj, dontEnums[i])) ***REMOVED***
            result.push(dontEnums[i]);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      return result;
    ***REMOVED***;
  ***REMOVED***());
***REMOVED***

// http://ejohn.org/blog/objectgetprototypeof/
if ( typeof Object.getPrototypeOf !== "function" ) ***REMOVED***
  if ( typeof "test".__proto__ === "object" ) ***REMOVED***
    Object.getPrototypeOf = function(object)***REMOVED***
      return object.__proto__;
    ***REMOVED***;
  ***REMOVED*** else ***REMOVED***
    Object.getPrototypeOf = function(object)***REMOVED***
      // May break if the constructor has been tampered with
      return object.constructor.prototype;
    ***REMOVED***;
  ***REMOVED***
***REMOVED***

(function() ***REMOVED***
  'use strict';

  angular.module('firebase')
    .factory('$firebaseConfig', ["$firebaseArray", "$firebaseObject", "$injector",
      function($firebaseArray, $firebaseObject, $injector) ***REMOVED***
        return function(configOpts) ***REMOVED***
          // make a copy we can modify
          var opts = angular.extend(***REMOVED******REMOVED***, configOpts);
          // look up factories if passed as string names
          if( typeof opts.objectFactory === 'string' ) ***REMOVED***
            opts.objectFactory = $injector.get(opts.objectFactory);
          ***REMOVED***
          if( typeof opts.arrayFactory === 'string' ) ***REMOVED***
            opts.arrayFactory = $injector.get(opts.arrayFactory);
          ***REMOVED***
          // extend defaults and return
          return angular.extend(***REMOVED***
            arrayFactory: $firebaseArray,
            objectFactory: $firebaseObject
          ***REMOVED***, opts);
        ***REMOVED***;
      ***REMOVED***
    ])

    .factory('$firebaseUtils', ["$q", "$timeout", "$rootScope",
      function($q, $timeout, $rootScope) ***REMOVED***
        var utils = ***REMOVED***
          /**
           * Returns a function which, each time it is invoked, will gather up the values until
           * the next "tick" in the Angular compiler process. Then they are all run at the same
           * time to avoid multiple cycles of the digest loop. Internally, this is done using $evalAsync()
           *
           * @param ***REMOVED***Function***REMOVED*** action
           * @param ***REMOVED***Object***REMOVED*** [context]
           * @returns ***REMOVED***Function***REMOVED***
           */
          batch: function(action, context) ***REMOVED***
            return function() ***REMOVED***
              var args = Array.prototype.slice.call(arguments, 0);
              utils.compile(function() ***REMOVED***
                action.apply(context, args);
              ***REMOVED***);
            ***REMOVED***;
          ***REMOVED***,

          /**
           * A rudimentary debounce method
           * @param ***REMOVED***function***REMOVED*** fn the function to debounce
           * @param ***REMOVED***object***REMOVED*** [ctx] the `this` context to set in fn
           * @param ***REMOVED***int***REMOVED*** wait number of milliseconds to pause before sending out after each invocation
           * @param ***REMOVED***int***REMOVED*** [maxWait] max milliseconds to wait before sending out, defaults to wait * 10 or 100
           */
          debounce: function(fn, ctx, wait, maxWait) ***REMOVED***
            var start, cancelTimer, args, runScheduledForNextTick;
            if( typeof(ctx) === 'number' ) ***REMOVED***
              maxWait = wait;
              wait = ctx;
              ctx = null;
            ***REMOVED***

            if( typeof wait !== 'number' ) ***REMOVED***
              throw new Error('Must provide a valid integer for wait. Try 0 for a default');
            ***REMOVED***
            if( typeof(fn) !== 'function' ) ***REMOVED***
              throw new Error('Must provide a valid function to debounce');
            ***REMOVED***
            if( !maxWait ) ***REMOVED*** maxWait = wait*10 || 100; ***REMOVED***

            // clears the current wait timer and creates a new one
            // however, if maxWait is exceeded, calls runNow() on the next tick.
            function resetTimer() ***REMOVED***
              if( cancelTimer ) ***REMOVED***
                cancelTimer();
                cancelTimer = null;
              ***REMOVED***
              if( start && Date.now() - start > maxWait ) ***REMOVED***
                if(!runScheduledForNextTick)***REMOVED***
                  runScheduledForNextTick = true;
                  utils.compile(runNow);
                ***REMOVED***
              ***REMOVED***
              else ***REMOVED***
                if( !start ) ***REMOVED*** start = Date.now(); ***REMOVED***
                cancelTimer = utils.wait(runNow, wait);
              ***REMOVED***
            ***REMOVED***

            // Clears the queue and invokes the debounced function with the most recent arguments
            function runNow() ***REMOVED***
              cancelTimer = null;
              start = null;
              runScheduledForNextTick = false;
              fn.apply(ctx, args);
            ***REMOVED***

            function debounced() ***REMOVED***
              args = Array.prototype.slice.call(arguments, 0);
              resetTimer();
            ***REMOVED***
            debounced.running = function() ***REMOVED***
              return start > 0;
            ***REMOVED***;

            return debounced;
          ***REMOVED***,

          assertValidRef: function(ref, msg) ***REMOVED***
            if( !angular.isObject(ref) ||
              typeof(ref.ref) !== 'object' ||
              typeof(ref.ref.transaction) !== 'function' ) ***REMOVED***
              throw new Error(msg || 'Invalid Firebase reference');
            ***REMOVED***
          ***REMOVED***,

          // http://stackoverflow.com/questions/7509831/alternative-for-the-deprecated-proto
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
          inherit: function(ChildClass, ParentClass, methods) ***REMOVED***
            var childMethods = ChildClass.prototype;
            ChildClass.prototype = Object.create(ParentClass.prototype);
            ChildClass.prototype.constructor = ChildClass; // restoring proper constructor for child class
            angular.forEach(Object.keys(childMethods), function(k) ***REMOVED***
              ChildClass.prototype[k] = childMethods[k];
            ***REMOVED***);
            if( angular.isObject(methods) ) ***REMOVED***
              angular.extend(ChildClass.prototype, methods);
            ***REMOVED***
            return ChildClass;
          ***REMOVED***,

          getPrototypeMethods: function(inst, iterator, context) ***REMOVED***
            var methods = ***REMOVED******REMOVED***;
            var objProto = Object.getPrototypeOf(***REMOVED******REMOVED***);
            var proto = angular.isFunction(inst) && angular.isObject(inst.prototype)?
              inst.prototype : Object.getPrototypeOf(inst);
            while(proto && proto !== objProto) ***REMOVED***
              for (var key in proto) ***REMOVED***
                // we only invoke each key once; if a super is overridden it's skipped here
                if (proto.hasOwnProperty(key) && !methods.hasOwnProperty(key)) ***REMOVED***
                  methods[key] = true;
                  iterator.call(context, proto[key], key, proto);
                ***REMOVED***
              ***REMOVED***
              proto = Object.getPrototypeOf(proto);
            ***REMOVED***
          ***REMOVED***,

          getPublicMethods: function(inst, iterator, context) ***REMOVED***
            utils.getPrototypeMethods(inst, function(m, k) ***REMOVED***
              if( typeof(m) === 'function' && k.charAt(0) !== '_' ) ***REMOVED***
                iterator.call(context, m, k);
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***,

          makeNodeResolver:function(deferred)***REMOVED***
            return function(err,result)***REMOVED***
              if(err === null)***REMOVED***
                if(arguments.length > 2)***REMOVED***
                  result = Array.prototype.slice.call(arguments,1);
                ***REMOVED***

                deferred.resolve(result);
              ***REMOVED***
              else ***REMOVED***
                deferred.reject(err);
              ***REMOVED***
            ***REMOVED***;
          ***REMOVED***,

          wait: function(fn, wait) ***REMOVED***
            var to = $timeout(fn, wait||0);
            return function() ***REMOVED***
              if( to ) ***REMOVED***
                $timeout.cancel(to);
                to = null;
              ***REMOVED***
            ***REMOVED***;
          ***REMOVED***,

          compile: function(fn) ***REMOVED***
            return $rootScope.$evalAsync(fn||function() ***REMOVED******REMOVED***);
          ***REMOVED***,

          deepCopy: function(obj) ***REMOVED***
            if( !angular.isObject(obj) ) ***REMOVED*** return obj; ***REMOVED***
            var newCopy = angular.isArray(obj) ? obj.slice() : angular.extend(***REMOVED******REMOVED***, obj);
            for (var key in newCopy) ***REMOVED***
              if (newCopy.hasOwnProperty(key)) ***REMOVED***
                if (angular.isObject(newCopy[key])) ***REMOVED***
                  newCopy[key] = utils.deepCopy(newCopy[key]);
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
            return newCopy;
          ***REMOVED***,

          trimKeys: function(dest, source) ***REMOVED***
            utils.each(dest, function(v,k) ***REMOVED***
              if( !source.hasOwnProperty(k) ) ***REMOVED***
                delete dest[k];
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***,

          scopeData: function(dataOrRec) ***REMOVED***
            var data = ***REMOVED***
              $id: dataOrRec.$id,
              $priority: dataOrRec.$priority
            ***REMOVED***;
            var hasPublicProp = false;
            utils.each(dataOrRec, function(v,k) ***REMOVED***
              hasPublicProp = true;
              data[k] = utils.deepCopy(v);
            ***REMOVED***);
            if(!hasPublicProp && dataOrRec.hasOwnProperty('$value'))***REMOVED***
              data.$value = dataOrRec.$value;
            ***REMOVED***
            return data;
          ***REMOVED***,

          updateRec: function(rec, snap) ***REMOVED***
            var data = snap.val();
            var oldData = angular.extend(***REMOVED******REMOVED***, rec);

            // deal with primitives
            if( !angular.isObject(data) ) ***REMOVED***
              rec.$value = data;
              data = ***REMOVED******REMOVED***;
            ***REMOVED***
            else ***REMOVED***
              delete rec.$value;
            ***REMOVED***

            // apply changes: remove old keys, insert new data, set priority
            utils.trimKeys(rec, data);
            angular.extend(rec, data);
            rec.$priority = snap.getPriority();

            return !angular.equals(oldData, rec) ||
              oldData.$value !== rec.$value ||
              oldData.$priority !== rec.$priority;
          ***REMOVED***,

          applyDefaults: function(rec, defaults) ***REMOVED***
            if( angular.isObject(defaults) ) ***REMOVED***
              angular.forEach(defaults, function(v,k) ***REMOVED***
                if( !rec.hasOwnProperty(k) ) ***REMOVED***
                  rec[k] = v;
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***
            return rec;
          ***REMOVED***,

          dataKeys: function(obj) ***REMOVED***
            var out = [];
            utils.each(obj, function(v,k) ***REMOVED***
              out.push(k);
            ***REMOVED***);
            return out;
          ***REMOVED***,

          each: function(obj, iterator, context) ***REMOVED***
            if(angular.isObject(obj)) ***REMOVED***
              for (var k in obj) ***REMOVED***
                if (obj.hasOwnProperty(k)) ***REMOVED***
                  var c = k.charAt(0);
                  if( c !== '_' && c !== '$' && c !== '.' ) ***REMOVED***
                    iterator.call(context, obj[k], k, obj);
                  ***REMOVED***
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
            else if(angular.isArray(obj)) ***REMOVED***
              for(var i = 0, len = obj.length; i < len; i++) ***REMOVED***
                iterator.call(context, obj[i], i, obj);
              ***REMOVED***
            ***REMOVED***
            return obj;
          ***REMOVED***,

          /**
           * A utility for converting records to JSON objects
           * which we can save into Firebase. It asserts valid
           * keys and strips off any items prefixed with $.
           *
           * If the rec passed into this method has a toJSON()
           * method, that will be used in place of the custom
           * functionality here.
           *
           * @param rec
           * @returns ***REMOVED*******REMOVED***
           */
          toJSON: function(rec) ***REMOVED***
            var dat;
            if( !angular.isObject(rec) ) ***REMOVED***
              rec = ***REMOVED***$value: rec***REMOVED***;
            ***REMOVED***
            if (angular.isFunction(rec.toJSON)) ***REMOVED***
              dat = rec.toJSON();
            ***REMOVED***
            else ***REMOVED***
              dat = ***REMOVED******REMOVED***;
              utils.each(rec, function (v, k) ***REMOVED***
                dat[k] = stripDollarPrefixedKeys(v);
              ***REMOVED***);
            ***REMOVED***
            if( angular.isDefined(rec.$value) && Object.keys(dat).length === 0 && rec.$value !== null ) ***REMOVED***
              dat['.value'] = rec.$value;
            ***REMOVED***
            if( angular.isDefined(rec.$priority) && Object.keys(dat).length > 0 && rec.$priority !== null ) ***REMOVED***
              dat['.priority'] = rec.$priority;
            ***REMOVED***
            angular.forEach(dat, function(v,k) ***REMOVED***
              if (k.match(/[.$\[\]#\/]/) && k !== '.value' && k !== '.priority' ) ***REMOVED***
                throw new Error('Invalid key ' + k + ' (cannot contain .$[]#/)');
              ***REMOVED***
              else if( angular.isUndefined(v) ) ***REMOVED***
                throw new Error('Key '+k+' was undefined. Cannot pass undefined in JSON. Use null instead.');
              ***REMOVED***
            ***REMOVED***);
            return dat;
          ***REMOVED***,

          doSet: function(ref, data) ***REMOVED***
            var def = $q.defer();
            if( angular.isFunction(ref.set) || !angular.isObject(data) ) ***REMOVED***
              // this is not a query, just do a flat set
              // Use try / catch to handle being passed data which is undefined or has invalid keys
              try ***REMOVED***
                ref.set(data, utils.makeNodeResolver(def));
              ***REMOVED*** catch (err) ***REMOVED***
                def.reject(err);
              ***REMOVED***
            ***REMOVED***
            else ***REMOVED***
              var dataCopy = angular.extend(***REMOVED******REMOVED***, data);
              // this is a query, so we will replace all the elements
              // of this query with the value provided, but not blow away
              // the entire Firebase path
              ref.once('value', function(snap) ***REMOVED***
                snap.forEach(function(ss) ***REMOVED***
                  if( !dataCopy.hasOwnProperty(ss.key) ) ***REMOVED***
                    dataCopy[ss.key] = null;
                  ***REMOVED***
                ***REMOVED***);
                ref.ref.update(dataCopy, utils.makeNodeResolver(def));
              ***REMOVED***, function(err) ***REMOVED***
                def.reject(err);
              ***REMOVED***);
            ***REMOVED***
            return def.promise;
          ***REMOVED***,

          doRemove: function(ref) ***REMOVED***
            var def = $q.defer();
            if( angular.isFunction(ref.remove) ) ***REMOVED***
              // ref is not a query, just do a flat remove
              ref.remove(utils.makeNodeResolver(def));
            ***REMOVED***
            else ***REMOVED***
              // ref is a query so let's only remove the
              // items in the query and not the entire path
              ref.once('value', function(snap) ***REMOVED***
                var promises = [];
                snap.forEach(function(ss) ***REMOVED***
                  promises.push(ss.ref.remove());
                ***REMOVED***);
                utils.allPromises(promises)
                  .then(function() ***REMOVED***
                    def.resolve(ref);
                  ***REMOVED***,
                  function(err)***REMOVED***
                    def.reject(err);
                  ***REMOVED***
                );
              ***REMOVED***, function(err) ***REMOVED***
                def.reject(err);
              ***REMOVED***);
            ***REMOVED***
            return def.promise;
          ***REMOVED***,

          /**
           * AngularFire version number.
           */
          VERSION: '2.0.1',

          allPromises: $q.all.bind($q)
        ***REMOVED***;

        return utils;
      ***REMOVED***
    ]);

    function stripDollarPrefixedKeys(data) ***REMOVED***
      if( !angular.isObject(data) ) ***REMOVED*** return data; ***REMOVED***
      var out = angular.isArray(data)? [] : ***REMOVED******REMOVED***;
      angular.forEach(data, function(v,k) ***REMOVED***
        if(typeof k !== 'string' || k.charAt(0) !== '$') ***REMOVED***
          out[k] = stripDollarPrefixedKeys(v);
        ***REMOVED***
      ***REMOVED***);
      return out;
    ***REMOVED***
***REMOVED***)();

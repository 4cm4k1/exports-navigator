/**
 * @fileoverview Firebase server Auth API.
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
 * Creates a new custom token (JWT) that can be sent back to a client to use
 * with signInWithCustomToken.
 *
 * @param ***REMOVED***string***REMOVED*** uid The uid to use as the subject
 * @param ***REMOVED***Object=***REMOVED*** developerClaims Optional additional claims to include
 *     in the payload of the custom token (JWT)
 *
 * @return ***REMOVED***string***REMOVED*** The custom token (JWT) for the provided payload.
 */
firebase.auth.Auth.prototype.createCustomToken =
    function(uid, developerClaims) ***REMOVED******REMOVED***;

/**
 * Verifies a ID token (JWT). Returns a Promise with the tokens claims. Rejects
 * the promise if the token could not be verified.
 *
 * @param ***REMOVED***string***REMOVED*** idToken The ID token (JWT) to verify
 * @return ***REMOVED***!firebase.Promise<Object>***REMOVED*** The Promise that will be fulfilled after
 *     a successful verification
 */
firebase.auth.Auth.prototype.verifyIdToken = function(idToken) ***REMOVED******REMOVED***;

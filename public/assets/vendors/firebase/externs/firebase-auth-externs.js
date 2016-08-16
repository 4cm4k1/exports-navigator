/**
 * @fileoverview Firebase Auth API.
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
 * Gets the Auth object for the default App or a given App.
 *
 * Usage:
 *
 *   firebase.auth()
 *   firebase.auth(app)
 *
 * @namespace
 * @param ***REMOVED***!firebase.app.App=***REMOVED*** app
 * @return ***REMOVED***!firebase.auth.Auth***REMOVED***
 */
firebase.auth = function(app) ***REMOVED******REMOVED***;

/**
 * Interface that represents the credentials returned by an auth provider.
 * Implementations specify the details about each auth provider's credential
 * requirements.
 *
 * @interface
 */
firebase.auth.AuthCredential = function() ***REMOVED******REMOVED***;

/**
 * The authentication provider ID for the credential.
 * For example, 'facebook.com', or 'google.com'.
  *
  * @type ***REMOVED***string***REMOVED***
  */
firebase.auth.AuthCredential.prototype.provider;


/**
 * Gets the Firebase Auth Service object for an App.
 *
 * Usage:
 *
 *   app.auth()
 *
 * @return ***REMOVED***!firebase.auth.Auth***REMOVED***
 */
firebase.app.App.prototype.auth = function() ***REMOVED******REMOVED***;


/**
 * User profile information, visible only to the Firebase project's
 * apps.
 *
 * @interface
 */
firebase.UserInfo = function() ***REMOVED******REMOVED***;

/**
 * The user's unique ID.
 *
 * @type ***REMOVED***string***REMOVED***
 */
firebase.UserInfo.prototype.uid;

/**
 * The authentication provider ID for the current user.
 * For example, 'facebook.com', or 'google.com'.
 *
 * @type ***REMOVED***string***REMOVED***
 */
firebase.UserInfo.prototype.providerId;

/**
 * The user's email address (if available).
 * @type ***REMOVED***?string***REMOVED***
 */
firebase.UserInfo.prototype.email;

/**
 * The user's display name (if available).
 *
 * @type ***REMOVED***?string***REMOVED***
 */
firebase.UserInfo.prototype.displayName;

/**
 * The URL of the user's profile picture (if available).
 *
 * @type ***REMOVED***?string***REMOVED***
 */
firebase.UserInfo.prototype.photoURL;

/**
 * A user account.
 *
 * @interface
 * @extends ***REMOVED***firebase.UserInfo***REMOVED***
 */
firebase.User;

/** @type ***REMOVED***boolean***REMOVED*** */
firebase.User.prototype.isAnonymous;

/**
 * True if the user's email address has been verified.
 * @type ***REMOVED***boolean***REMOVED***
 */
firebase.User.prototype.emailVerified;

/**
 * Additional provider-specific information about the user.
 * @type ***REMOVED***!Array<firebase.UserInfo>***REMOVED***
 */
firebase.User.prototype.providerData;

/**
 * A refresh token for the user account. Use only for advanced scenarios that
 * require explicitly refreshing tokens.
 * @type ***REMOVED***string***REMOVED***
 */
firebase.User.prototype.refreshToken;

/**
 * Returns a JWT token used to identify the user to a Firebase service.
 *
 * Returns the current token if it has not expired, otherwise this will
 * refresh the token and return a new one.
 *
 * @param ***REMOVED***boolean=***REMOVED*** opt_forceRefresh Force refresh regardless of token
 *     expiration.
 * @return ***REMOVED***!firebase.Promise<string>***REMOVED***
 */
firebase.User.prototype.getToken = function(opt_forceRefresh) ***REMOVED******REMOVED***;

/**
 * Refreshes the current user, if signed in.
 *
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.User.prototype.reload = function() ***REMOVED******REMOVED***;

/**
 * Sends a verification email to a user.
 *
 * The verification process is completed by calling
 * ***REMOVED***@link firebase.auth.Auth#applyActionCode***REMOVED***
 *
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.User.prototype.sendEmailVerification = function() ***REMOVED******REMOVED***;


/**
 * Links the user account with the given credentials.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/provider-already-linked</dt>
 * <dd>Thrown if the provider has already been linked to the user. This error is
 *     thrown even if this is not the same provider's account that is currently
 *     linked to the user.</dd>
 * <dt>auth/invalid-credential</dt>
 * <dd>Thrown if the provider's credential is not valid. This can happen if it
 *     has already expired when calling link, or if it used invalid token(s).
 *     Please refer to the Guide, under the provider's section you tried to
 *     link, and make sure you pass in the correct parameter to the credential
 *     method.</dd>
 * <dt>auth/credential-already-in-use</dt>
 * <dd>Thrown if the account corresponding to the credential given already
 *     exists among your users, or is already linked to a Firebase User.</dd>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if you have not enabled the provider in the Firebase Console. Go
 *     to the Firebase Console for your project, in the Auth section and the
 *     <strong>Sign in Method</strong> tab and configure the provider.</dd>
 * <dt>auth/invalid-email</dt>
 * <dd>Thrown if the email used in a
 *     ***REMOVED***@link firebase.auth.EmailAuthProvider#credential***REMOVED*** is invalid.</dd>
 * <dt>auth/wrong-password</dt>
 * <dd>Thrown if the password used in a
 *     ***REMOVED***@link firebase.auth.EmailAuthProvider#credential***REMOVED*** is not correct or when
 *     the user associated with the email does not have a password.</dd>
 * </dl>
 *
 * @param ***REMOVED***!firebase.auth.AuthCredential***REMOVED*** credential The auth credential.
 * @return ***REMOVED***!firebase.Promise<!firebase.User>***REMOVED***
 */
firebase.User.prototype.link = function(credential) ***REMOVED******REMOVED***;


/**
 * Unlinks a provider from a user account.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/no-such-provider</dt>
 * <dd>Thrown if the user does not have this provider linked or when the
 *     provider ID given does not exist.</dd>
 * </dt>
 *
 * @param ***REMOVED***string***REMOVED*** providerId
 * @return ***REMOVED***!firebase.Promise<!firebase.User>***REMOVED***
 */
firebase.User.prototype.unlink = function(providerId) ***REMOVED******REMOVED***;


/**
 * Re-authenticates a user using a fresh credential. Use before operations
 * such as ***REMOVED***@link firebase.User#updatePassword***REMOVED*** that require tokens from recent
 * sign-in attempts.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/user-mismatch</dt>
 * <dd>Thrown if the credential given does not correspond to the user.</dd>
 * <dt>auth/user-not-found</dt>
 * <dd>Thrown if the credential given does not correspond to any existing user.
 *     </dd>
 * <dt>auth/invalid-credential</dt>
 * <dd>Thrown if the provider's credential is not valid. This can happen if it
 *     has already expired when calling link, or if it used invalid token(s).
 *     Please refer to the Guide, under the provider's section you tried to
 *     link, and make sure you pass in the correct parameter to the credential
 *     method.</dd>
 * <dt>auth/invalid-email</dt>
 * <dd>Thrown if the email used in a
 *     ***REMOVED***@link firebase.auth.EmailAuthProvider#credential***REMOVED*** is invalid.</dd>
 * <dt>auth/wrong-password</dt>
 * <dd>Thrown if the password used in a
 *     ***REMOVED***@link firebase.auth.EmailAuthProvider#credential***REMOVED*** is not correct or when
 *     the user associated with the email does not have a password.</dd>
 * </dl>
 *
 * @param ***REMOVED***!firebase.auth.AuthCredential***REMOVED*** credential
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.User.prototype.reauthenticate = function(credential) ***REMOVED******REMOVED***;


/**
 * Updates the user's email address.
 *
 * An email will be sent to the original email address (if it was set) that
 * allows to revoke the email address change, in order to protect them from
 * account hijacking.
 *
 * <b>Important:</b> this is a security sensitive operation that requires the
 * user to have recently signed in. If this requirement isn't met, ask the user
 * to authenticate again and then call ***REMOVED***@link firebase.User#reauthenticate***REMOVED***.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/invalid-email</dt>
 * <dd>Thrown if the email used is invalid.</dd>
 * <dt>auth/email-already-in-use</dt>
 * <dd>Thrown if the email is already used by another user.</dd>
 * <dt>auth/requires-recent-login</dt>
 * <dd>Thrown if the user's last sign-in time does not meet the security
 *     threshold. Use ***REMOVED***@link firebase.User#reauthenticate***REMOVED*** to resolve. This does
 *     not apply if the user is anonymous.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** newEmail The new email address.
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.User.prototype.updateEmail = function(newEmail) ***REMOVED******REMOVED***;


/**
 * Updates the user's password.
 *
 * <b>Important:</b> this is a security sensitive operation that requires the
 * user to have recently signed in. If this requirement isn't met, ask the user
 * to authenticate again and then call ***REMOVED***@link firebase.User#reauthenticate***REMOVED***.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/weak-password</dt>
 * <dd>Thrown if the password is not strong enough.</dd>
 * <dt>auth/requires-recent-login</dt>
 * <dd>Thrown if the user's last sign-in time does not meet the security
 *     threshold. Use ***REMOVED***@link firebase.User#reauthenticate***REMOVED*** to resolve. This does
 *     not apply if the user is anonymous.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** newPassword
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.User.prototype.updatePassword = function(newPassword) ***REMOVED******REMOVED***;


/**
 * Updates a user's profile data.
 *
 * @example
 * // Updates the user attributes:
 * user.updateProfile(***REMOVED***
 *   displayName: "Jane Q. User",
 *   photoURL: "https://example.com/jane-q-user/profile.jpg"
 * ***REMOVED***).then(function() ***REMOVED***
 *   // Profile updated successfully!
 *   // "Jane Q. User"
 *   var displayName = user.displayName;
 *   // "https://example.com/jane-q-user/profile.jpg"
 *   var photoURL = user.photoURL;
 * ***REMOVED***, function(error) ***REMOVED***
 *   // An error happened.
 * ***REMOVED***);
 *
 * // Passing a null value will delete the current attribute's value, but not
 * // passing a property won't change the current attribute's value:
 * // Let's say we're using the same user than before, after the update.
 * user.updateProfile(***REMOVED***photoURL: null***REMOVED***).then(function() ***REMOVED***
 *   // Profile updated successfully!
 *   // "Jane Q. User", hasn't changed.
 *   var displayName = user.displayName;
 *   // Now, this is null.
 *   var photoURL = user.photoURL;
 * ***REMOVED***, function(error) ***REMOVED***
 *   // An error happened.
 * ***REMOVED***);
 *
 * @param ***REMOVED***!***REMOVED***displayName: ?string, photoURL: ?string***REMOVED******REMOVED*** profile The profile's
 *     displayName and photoURL to update.
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.User.prototype.updateProfile = function(profile) ***REMOVED******REMOVED***;


/**
 * Deletes and signs out the user.
 *
 * <b>Important:</b> this is a security sensitive operation that requires the
 * user to have recently signed in. If this requirement isn't met, ask the user
 * to authenticate again and then call ***REMOVED***@link firebase.User#reauthenticate***REMOVED***.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/requires-recent-login</dt>
 * <dd>Thrown if the user's last sign-in time does not meet the security
 *     threshold. Use ***REMOVED***@link firebase.User#reauthenticate***REMOVED*** to resolve. This does
 *     not apply if the user is anonymous.</dd>
 * </dl>
 *
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.User.prototype.delete = function() ***REMOVED******REMOVED***;


/**
 * Checks a password reset code sent to the user by email or other out-of-band
 * mechanism.
 *
 * Returns the user's email address if valid.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/expired-action-code</dt>
 * <dd>Thrown if the password reset code has expired.</dd>
 * <dt>auth/invalid-action-code</dt>
 * <dd>Thrown if the password reset code is invalid. This can happen if the code
 *     is malformed or has already been used.</dd>
 * <dt>auth/user-disabled</dt>
 * <dd>Thrown if the user corresponding to the given password reset code has
 *     been disabled.</dd>
 * <dt>auth/user-not-found</dt>
 * <dd>Thrown if there is no user corresponding to the password reset code. This
 *     may have happened if the user was deleted between when the code was
 *     issued and when this method was called.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** code A verification code sent to the user.
 * @return ***REMOVED***!firebase.Promise<string>***REMOVED***
 */
firebase.auth.Auth.prototype.verifyPasswordResetCode = function(code) ***REMOVED******REMOVED***;


/**
 * A response from ***REMOVED***@link firebase.auth.Auth#checkActionCode***REMOVED***.
 *
 * @interface
 */
firebase.auth.ActionCodeInfo = function() ***REMOVED******REMOVED***;


/**
 * The email address associated with the action code.
 *
 * @typedef ***REMOVED******REMOVED***
 *   email: string
 * ***REMOVED******REMOVED***
 */
firebase.auth.ActionCodeInfo.prototype.data;


/**
 * Checks a verification code sent to the user by email or other out-of-band
 * mechanism.
 *
 * Returns metadata about the code.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/expired-action-code</dt>
 * <dd>Thrown if the action code has expired.</dd>
 * <dt>auth/invalid-action-code</dt>
 * <dd>Thrown if the action code is invalid. This can happen if the code is
 *     malformed or has already been used.</dd>
 * <dt>auth/user-disabled</dt>
 * <dd>Thrown if the user corresponding to the given action code has been
 *     disabled.</dd>
 * <dt>auth/user-not-found</dt>
 * <dd>Thrown if there is no user corresponding to the action code. This may
 *     have happened if the user was deleted between when the action code was
 *     issued and when this method was called.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** code A verification code sent to the user.
 * @return ***REMOVED***!firebase.Promise<!firebase.auth.ActionCodeInfo>***REMOVED***
 */
firebase.auth.Auth.prototype.checkActionCode = function(code) ***REMOVED******REMOVED***;


/**
 * Applies a verification code sent to the user by email or other out-of-band
 * mechanism.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/expired-action-code</dt>
 * <dd>Thrown if the action code has expired.</dd>
 * <dt>auth/invalid-action-code</dt>
 * <dd>Thrown if the action code is invalid. This can happen if the code is
 *     malformed or has already been used.</dd>
 * <dt>auth/user-disabled</dt>
 * <dd>Thrown if the user corresponding to the given action code has been
 *     disabled.</dd>
 * <dt>auth/user-not-found</dt>
 * <dd>Thrown if there is no user corresponding to the action code. This may
 *     have happened if the user was deleted between when the action code was
 *     issued and when this method was called.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** code A verification code sent to the user.
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.auth.Auth.prototype.applyActionCode = function(code) ***REMOVED******REMOVED***;


/**
 * The Firebase Auth service interface.
 *
 * @interface
 */
firebase.auth.Auth = function() ***REMOVED******REMOVED***;

/**
 * The App associated with the Auth service instance.
 *
 * @type ***REMOVED***!firebase.app.App***REMOVED***
 */
firebase.auth.Auth.prototype.app;

/**
 * The currently signed-in user (or null).
 *
 * @type ***REMOVED***firebase.User|null***REMOVED***
 */
firebase.auth.Auth.prototype.currentUser;

/**
 * Creates a new user account associated with the specified email address and
 * password.
 *
 * On successful creation of the user account, this user will also be
 * signed in to your application.
 *
 * User account creation can fail if the account already exists or the password
 * is invalid.
 *
 * Note: The email address acts as a unique identifier for the user and
 * enables an email-based password reset.  This function will create
 * a new user account and set the initial user password.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/email-already-in-use</dt>
 * <dd>Thrown if there already exists an account with the given email
 *     address.</dd>
 * <dt>auth/invalid-email</dt>
 * <dd>Thrown if the email address is not valid.</dd>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if email/password accounts are not enabled. Enable email/password
 *     accounts in the Firebase Console, under the Auth tab.</dd>
 * <dt>auth/weak-password</dt>
 * <dd>Thrown if the password is not strong enough.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** email The user's email address.
 * @param ***REMOVED***string***REMOVED*** password The user's chosen password.
 * @return ***REMOVED***!firebase.Promise<!firebase.User>***REMOVED***
 */
firebase.auth.Auth.prototype.createUserWithEmailAndPassword =
    function(email, password) ***REMOVED******REMOVED***;


/**
 * Gets the list of provider IDs that can be used to sign in for the given email
 * address. Useful for an "identifier-first" sign-in flow.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/invalid-email</dt>
 * <dd>Thrown if the email address is not valid.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** email An email address.
 * @return ***REMOVED***!firebase.Promise<!Array<string>>***REMOVED***
 */
firebase.auth.Auth.prototype.fetchProvidersForEmail = function(email) ***REMOVED******REMOVED***;


/**
 * Adds an observer for auth state changes.
 *
 * @param ***REMOVED***!Object|function(?firebase.User)***REMOVED***
 *     nextOrObserver An observer object or a function triggered on change.
 * @param ***REMOVED***function(!firebase.auth.Error)=***REMOVED*** opt_error Optional A function
 *     triggered on auth error.
 * @param ***REMOVED***function()=***REMOVED*** opt_completed Optional A function triggered when the
 *     observer is removed.
 * @return ***REMOVED***!function()***REMOVED*** The unsubscribe function for the observer.
 */
firebase.auth.Auth.prototype.onAuthStateChanged = function(
    nextOrObserver, opt_error, opt_completed) ***REMOVED******REMOVED***;


/**
 * Sends a password reset email to the given email address.
 *
 * To complete the password reset, call
 * ***REMOVED***@link firebase.auth.Auth#confirmPasswordReset***REMOVED*** with the code supplied in the
 * email sent to the user, along with the new password specified by the user.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/invalid-email</dt>
 * <dd>Thrown if the email address is not valid.</dd>
 * <dt>auth/user-not-found</dt>
 * <dd>Thrown if there is no user corresponding to the email address.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** email The email address with the password to be reset.
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.auth.Auth.prototype.sendPasswordResetEmail = function(email) ***REMOVED******REMOVED***;


/**
 * Completes the password reset process, given a confirmation code and new
 * password.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/expired-action-code</dt>
 * <dd>Thrown if the password reset code has expired.</dd>
 * <dt>auth/invalid-action-code</dt>
 * <dd>Thrown if the password reset code is invalid. This can happen if the
 *     code is malformed or has already been used.</dd>
 * <dt>auth/user-disabled</dt>
 * <dd>Thrown if the user corresponding to the given password reset code has
 *     been disabled.</dd>
 * <dt>auth/user-not-found</dt>
 * <dd>Thrown if there is no user corresponding to the password reset code. This
 *     may have happened if the user was deleted between when the code was
 *     issued and when this method was called.</dd>
 * <dt>auth/weak-password</dt>
 * <dd>Thrown if the new password is not strong enough.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** code The confirmation code send via email to the user.
 * @param ***REMOVED***string***REMOVED*** newPassword The new password.
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.auth.Auth.prototype.confirmPasswordReset =
    function(code, newPassword) ***REMOVED******REMOVED***;

/**
 * Asynchronously signs in with the given credentials.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/account-exists-with-different-credential</dt>
 * <dd>Thrown if there already exists an account with the email address
 *     asserted by the credential. Resolve this by calling
 *     ***REMOVED***@link firebase.auth.Auth#fetchProvidersForEmail***REMOVED*** and then asking the
 *     user to sign in using one of the returned providers. Once the user is
 *     signed in, the original credential can be linked to the user with
 *     ***REMOVED***@link firebase.User#link***REMOVED***.</dd>
 * <dt>auth/invalid-credential</dt>
 * <dd>Thrown if the credential is malformed or has expired.</dd>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if the type of account corresponding to the credential
 *     is not enabled. Enable the account type in the Firebase Console, under
 *     the Auth tab.</dd>
 * <dt>auth/user-disabled</dt>
 * <dd>Thrown if the user corresponding to the given credential has been
 *     disabled.</dd>
 * <dt>auth/user-not-found</dt>
 * <dd>Thrown if signing in with a credential from
 *     ***REMOVED***@link firebase.auth.EmailAuthProvider#credential***REMOVED*** and there is no user
 *     corresponding to the given email. </dd>
 * <dt>auth/wrong-password</dt>
 * <dd>Thrown if signing in with a credential from
 *     ***REMOVED***@link firebase.auth.EmailAuthProvider#credential***REMOVED*** and the password is
 *     invalid for the given email, or if the account corresponding to the email
 *     does not have a password set.</dd>
 * </dl>
 *
 * @param ***REMOVED***!firebase.auth.AuthCredential***REMOVED*** credential The auth credential.
 * @return ***REMOVED***!firebase.Promise<!firebase.User>***REMOVED***
 */
firebase.auth.Auth.prototype.signInWithCredential = function(credential) ***REMOVED******REMOVED***;


/**
 * Asynchronously signs in using a custom token.
 *
 * Custom tokens are used to integrate Firebase Auth with existing auth systems,
 * and must be generated by the auth backend.
 *
 * Fails with an error if the token is invalid, expired, or not accepted by the
 * Firebase Auth service.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/custom-token-mismatch</dt>
 * <dd>Thrown if the custom token is for a different Firebase App.</dd>
 * <dt>auth/invalid-custom-token</dt>
 * <dd>Thrown if the custom token format is incorrect.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** token The custom token to sign in with.
 * @return ***REMOVED***!firebase.Promise<!firebase.User>***REMOVED***
 */
firebase.auth.Auth.prototype.signInWithCustomToken = function(token) ***REMOVED******REMOVED***;


/**
 * Asynchronously signs in using an email and password.
 *
 * Fails with an error if the email address and password do not match.
 *
 * Note: The user's password is NOT the password used to access the user's email
 * account. The email address serves as a unique identifier for the user, and
 * the password is used to access the user's account in your Firebase project.
 *
 * See also: ***REMOVED***@link firebase.auth.Auth#createUserWithEmailAndPassword***REMOVED***.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/invalid-email</dt>
 * <dd>Thrown if the email address is not valid.</dd>
 * <dt>auth/user-disabled</dt>
 * <dd>Thrown if the user corresponding to the given email has been
 *     disabled.</dd>
 * <dt>auth/user-not-found</dt>
 * <dd>Thrown if there is no user corresponding to the given email.</dd>
 * <dt>auth/wrong-password</dt>
 * <dd>Thrown if the password is invalid for the given email, or the account
 *     corresponding to the email does not have a password set.</dd>
 * </dl>
 *
 * @param ***REMOVED***string***REMOVED*** email The users email address.
 * @param ***REMOVED***string***REMOVED*** password The users password.
 * @return ***REMOVED***!firebase.Promise<!firebase.User>***REMOVED***
 */
firebase.auth.Auth.prototype.signInWithEmailAndPassword =
    function(email, password) ***REMOVED******REMOVED***;


/**
 * Asynchronously signs in as an anonymous user.
 *
 * If there is already an anonymous user signed in, that user will be returned;
 * otherwise, a new anonymous user identity will be created and returned.
 *
 * <h4>Error Codes</h4>
 * <dl>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if anonymous accounts are not enabled. Enable anonymous accounts
 *     in the Firebase Console, under the Auth tab.</dd>
 * </dl>
 *
 * @return ***REMOVED***!firebase.Promise<!firebase.User>***REMOVED***
 */
firebase.auth.Auth.prototype.signInAnonymously = function() ***REMOVED******REMOVED***;


/**
 * A structure containing a User and an AuthCredential.
 *
 * @typedef ***REMOVED******REMOVED***
 *   user: ?firebase.User,
 *   credential: ?firebase.auth.AuthCredential
 * ***REMOVED******REMOVED***
 */
firebase.auth.UserCredential;

/**
 * Signs out the current user.
 *
 * @return ***REMOVED***!firebase.Promise<void>***REMOVED***
 */
firebase.auth.Auth.prototype.signOut = function() ***REMOVED******REMOVED***;


/**
 * An authentication error.
 * For method-specific error codes, refer to the specific methods in the
 * documentation. For common error codes, check the reference below. Use ***REMOVED***@link
 * firebase.auth.Error#code***REMOVED*** to get the specific error code. For a detailed
 * message, use ***REMOVED***@link firebase.auth.Error#message***REMOVED***.
 * Errors with the code <strong>auth/account-exists-with-different-credential
 * </strong> will have the additional fields <strong>email</strong> and <strong>
 * credential</strong> which are needed to provide a way to resolve these
 * specific errors. Refer to ***REMOVED***@link firebase.auth.Auth#signInWithPopup***REMOVED*** for more
 * information.
 *
 * <h4>Common Error Codes</h4>
 * <dl>
 * <dt>auth/app-deleted</dt>
 * <dd>Thrown if the instance of FirebaseApp has been deleted.</dd>
 * <dt>auth/app-not-authorized</dt>
 * <dd>Thrown if the app identified by the domain where it's hosted, is not
 *     authorized to use Firebase Authentication with the provided API key.
 *     Review your key configuration in the Google API console.</dd>
 * <dt>auth/argument-error</dt>
 * <dd>Thrown if a method is called with incorrect arguments.</dd>
 * <dt>auth/invalid-api-key</dt>
 * <dd>Thrown if the provided API key is invalid. Please check that you have
 *     copied it correctly from the Firebase Console.</dd>
 * <dt>auth/invalid-user-token</dt>
 * <dd>Thrown if the user's credential is no longer valid. The user must sign in
 *     again.</dd>
 * <dt>auth/network-request-failed</dt>
 * <dd>Thrown if a network error (such as timeout, interrupted connection or
 *     unreachable host) has occurred.</dd>
 * <dt>auth/operation-not-allowed</dt>
 * <dd>Thrown if you have not enabled the provider in the Firebase Console. Go
 *     to the Firebase Console for your project, in the Auth section and the
 *     <strong>Sign in Method</strong> tab and configure the provider.</dd>
 * <dt>auth/requires-recent-login</dt>
 * <dd>Thrown if the user's last sign-in time does not meet the security
 *     threshold. Use ***REMOVED***@link firebase.User#reauthenticate***REMOVED*** to resolve. This does
 *     not apply if the user is anonymous.</dd>
 * <dt>auth/too-many-requests</dt>
 * <dd>Thrown if requests are blocked from a device due to unusual activity.
 *     Trying again after some delay would unblock.</dd>
 * <dt>auth/unauthorized-domain</dt>
 * <dd>Thrown if the app domain is not authorized for OAuth operations for your
 *     Firebase project. Edit the list of authorized domains from the Firebase
 *     console.</dd>
 * <dt>auth/user-disabled</dt>
 * <dd>Thrown if the user account has been disabled by an administrator.
 *     Accounts can be enabled or disabled in the Firebase Console, the Auth
 *     section and Users subsection.</dd>
 * <dt>auth/user-token-expired</dt>
 * <dd>Thrown if the user's credential has expired. This could also be thrown if
 *     a user has been deleted. Prompting the user to sign in again should
 *     resolve this for either case.</dd>
 * <dt>auth/web-storage-unsupported</dt>
 * <dd>Thrown if the browser does not support web storage or if the user
 *     disables them.</dd>
 * </dl>
 *
 * @interface
 */
firebase.auth.Error = function() ***REMOVED******REMOVED***;

/**
 * Unique error code.
 *
 * @type ***REMOVED***string***REMOVED***
 */
firebase.auth.Error.prototype.code;

/**
 * Complete error message.
 *
 * @type ***REMOVED***string***REMOVED***
 */
firebase.auth.Error.prototype.message;


//
// List of Auth Providers.
//


/**
 * Interface that represents an auth provider.
 *
 * @interface
 */
firebase.auth.AuthProvider = function() ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.AuthProvider.prototype.providerId;

/**
 * Facebook auth provider.
 * @constructor
 * @implements ***REMOVED***firebase.auth.AuthProvider***REMOVED***
 */
firebase.auth.FacebookAuthProvider = function() ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.FacebookAuthProvider.PROVIDER_ID;

/**
 * @param ***REMOVED***string***REMOVED*** token Facebook access token.
 * @return ***REMOVED***!firebase.auth.AuthCredential***REMOVED*** The auth provider credential.
 */
firebase.auth.FacebookAuthProvider.credential = function(token) ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.FacebookAuthProvider.prototype.providerId;

/**
 * @param ***REMOVED***string***REMOVED*** scope Facebook OAuth scope.
 */
firebase.auth.FacebookAuthProvider.prototype.addScope = function(scope) ***REMOVED******REMOVED***;


/**
 * Github auth provider.
 * @constructor
 * @implements ***REMOVED***firebase.auth.AuthProvider***REMOVED***
 */
firebase.auth.GithubAuthProvider = function() ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.GithubAuthProvider.PROVIDER_ID;

/**
 * @param ***REMOVED***string***REMOVED*** token Github access token.
 * @return ***REMOVED***!firebase.auth.AuthCredential***REMOVED*** The auth provider credential.
 */
firebase.auth.GithubAuthProvider.credential = function(token) ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.GithubAuthProvider.prototype.providerId;

/**
 * @param ***REMOVED***string***REMOVED*** scope Github OAuth scope.
 */
firebase.auth.GithubAuthProvider.prototype.addScope = function(scope) ***REMOVED******REMOVED***;

/**
 * Google auth provider.
 * @constructor
 * @implements ***REMOVED***firebase.auth.AuthProvider***REMOVED***
 */
firebase.auth.GoogleAuthProvider = function() ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.GoogleAuthProvider.PROVIDER_ID;

/**
 * Creates a credential for Google. At least one of ID token and access token
 * is required.
 * @param ***REMOVED***?string=***REMOVED*** idToken Google ID token.
 * @param ***REMOVED***?string=***REMOVED*** accessToken Google access token.
 * @return ***REMOVED***!firebase.auth.AuthCredential***REMOVED*** The auth provider credential.
 */
firebase.auth.GoogleAuthProvider.credential = function(idToken, accessToken) ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.GoogleAuthProvider.prototype.providerId;

/**
 * @param ***REMOVED***string***REMOVED*** scope Google OAuth scope.
 */
firebase.auth.GoogleAuthProvider.prototype.addScope = function(scope) ***REMOVED******REMOVED***;


/**
 * Twitter auth provider.
 * @constructor
 * @implements ***REMOVED***firebase.auth.AuthProvider***REMOVED***
 */
firebase.auth.TwitterAuthProvider = function() ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.TwitterAuthProvider.PROVIDER_ID;

/**
 * @param ***REMOVED***string***REMOVED*** token Twitter access token.
 * @param ***REMOVED***string***REMOVED*** secret Twitter secret.
 * @return ***REMOVED***!firebase.auth.AuthCredential***REMOVED*** The auth provider credential.
 */
firebase.auth.TwitterAuthProvider.credential = function(token, secret) ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.TwitterAuthProvider.prototype.providerId;


/**
 * Email and password auth provider implementation.
 * @constructor
 * @implements ***REMOVED***firebase.auth.AuthProvider***REMOVED***
 */
firebase.auth.EmailAuthProvider = function() ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.EmailAuthProvider.PROVIDER_ID;

/**
 * @param ***REMOVED***string***REMOVED*** email Email address.
 * @param ***REMOVED***string***REMOVED*** password User account password.
 * @return ***REMOVED***!firebase.auth.AuthCredential***REMOVED*** The auth provider credential.
 */
firebase.auth.EmailAuthProvider.credential = function(email, password) ***REMOVED******REMOVED***;

/** @type ***REMOVED***string***REMOVED*** */
firebase.auth.EmailAuthProvider.prototype.providerId;

/*! @license Firebase v3.3.0
    Build: 3.3.0-rc.7
    Terms: https://developers.google.com/terms */
declare namespace firebase ***REMOVED***
  interface FirebaseError ***REMOVED***
    code: string;
    message: string;
    name: string;
    stack: string;
  ***REMOVED***

  class Promise<T> extends Promise_Instance<T> ***REMOVED***
    static all(values: firebase.Promise<any>[]): firebase.Promise<any[]>;
    static reject(error: Error): firebase.Promise<any>;
    static resolve<T>(value?: T): firebase.Promise<T>;
  ***REMOVED***
  class Promise_Instance<T> implements firebase.Thenable<any> ***REMOVED***
    constructor(
        resolver:
            (a?: (a: T) => undefined, b?: (a: Error) => undefined) => any);
    catch (onReject?: (a: Error) => any): firebase.Thenable<any>;
    then(onResolve?: (a: T) => any, onReject?: (a: Error) => any):
        firebase.Promise<any>;
  ***REMOVED***

  var SDK_VERSION: string;

  interface Thenable<T> ***REMOVED***
    catch (onReject?: (a: Error) => any): any;
    then(onResolve?: (a: T) => any, onReject?: (a: Error) => any):
        firebase.Thenable<any>;
  ***REMOVED***

  interface User extends firebase.UserInfo ***REMOVED***
    delete (): firebase.Promise<any>;
    emailVerified: boolean;
    getToken(opt_forceRefresh?: boolean): firebase.Promise<any>;
    isAnonymous: boolean;
    link(credential: firebase.auth.AuthCredential): firebase.Promise<any>;
    linkWithPopup(provider: firebase.auth.AuthProvider): firebase.Promise<any>;
    linkWithRedirect(provider: firebase.auth.AuthProvider):
        firebase.Promise<any>;
    providerData: (firebase.UserInfo|null)[];
    reauthenticate(credential: firebase.auth.AuthCredential):
        firebase.Promise<any>;
    refreshToken: string;
    reload(): firebase.Promise<any>;
    sendEmailVerification(): firebase.Promise<any>;
    unlink(providerId: string): firebase.Promise<any>;
    updateEmail(newEmail: string): firebase.Promise<any>;
    updatePassword(newPassword: string): firebase.Promise<any>;
    updateProfile(profile: ***REMOVED***displayName: string | null, photoURL: string|null***REMOVED***):
        firebase.Promise<any>;
  ***REMOVED***

  interface UserInfo ***REMOVED***
    displayName: string|null;
    email: string|null;
    photoURL: string|null;
    providerId: string;
    uid: string;
  ***REMOVED***

  function app(name: string): firebase.app.App;

  var apps: (firebase.app.App|null)[];

  function auth(app?: firebase.app.App): firebase.auth.Auth;

  function database(app?: firebase.app.App): firebase.database.Database;

  function initializeApp(options: Object, name?: string): firebase.app.App;

  function storage(app?: firebase.app.App): firebase.storage.Storage;
***REMOVED***

declare namespace firebase.app ***REMOVED***
  interface App ***REMOVED***
    auth(): firebase.auth.Auth;
    database(): firebase.database.Database;
    delete (): firebase.Promise<any>;
    name: string;
    options: Object;
    storage(): firebase.storage.Storage;
  ***REMOVED***
***REMOVED***

declare namespace firebase.auth ***REMOVED***
  interface ActionCodeInfo ***REMOVED******REMOVED***

  interface Auth ***REMOVED***
    app: firebase.app.App;
    applyActionCode(code: string): firebase.Promise<any>;
    checkActionCode(code: string): firebase.Promise<any>;
    confirmPasswordReset(code: string, newPassword: string):
        firebase.Promise<any>;
    createCustomToken(uid: string, developerClaims?: Object|null): string;
    createUserWithEmailAndPassword(email: string, password: string):
        firebase.Promise<any>;
    currentUser: firebase.User|null;
    fetchProvidersForEmail(email: string): firebase.Promise<any>;
    getRedirectResult(): firebase.Promise<any>;
    onAuthStateChanged(
        nextOrObserver: Object, opt_error?: (a: firebase.auth.Error) => any,
        opt_completed?: () => any): () => any;
    sendPasswordResetEmail(email: string): firebase.Promise<any>;
    signInAnonymously(): firebase.Promise<any>;
    signInWithCredential(credential: firebase.auth.AuthCredential):
        firebase.Promise<any>;
    signInWithCustomToken(token: string): firebase.Promise<any>;
    signInWithEmailAndPassword(email: string, password: string):
        firebase.Promise<any>;
    signInWithPopup(provider: firebase.auth.AuthProvider):
        firebase.Promise<any>;
    signInWithRedirect(provider: firebase.auth.AuthProvider):
        firebase.Promise<any>;
    signOut(): firebase.Promise<any>;
    verifyIdToken(idToken: string): firebase.Promise<any>;
    verifyPasswordResetCode(code: string): firebase.Promise<any>;
  ***REMOVED***

  interface AuthCredential ***REMOVED***
    provider: string;
  ***REMOVED***

  interface AuthProvider ***REMOVED***
    providerId: string;
  ***REMOVED***

  class EmailAuthProvider extends EmailAuthProvider_Instance ***REMOVED***
    static PROVIDER_ID: string;
    static credential(email: string, password: string):
        firebase.auth.AuthCredential;
  ***REMOVED***
  class EmailAuthProvider_Instance implements firebase.auth.AuthProvider ***REMOVED***
    providerId: string;
  ***REMOVED***

  interface Error ***REMOVED***
    code: string;
    message: string;
  ***REMOVED***

  class FacebookAuthProvider extends FacebookAuthProvider_Instance ***REMOVED***
    static PROVIDER_ID: string;
    static credential(token: string): firebase.auth.AuthCredential;
  ***REMOVED***
  class FacebookAuthProvider_Instance implements firebase.auth.AuthProvider ***REMOVED***
    addScope(scope: string): any;
    providerId: string;
  ***REMOVED***

  class GithubAuthProvider extends GithubAuthProvider_Instance ***REMOVED***
    static PROVIDER_ID: string;
    static credential(token: string): firebase.auth.AuthCredential;
  ***REMOVED***
  class GithubAuthProvider_Instance implements firebase.auth.AuthProvider ***REMOVED***
    addScope(scope: string): any;
    providerId: string;
  ***REMOVED***

  class GoogleAuthProvider extends GoogleAuthProvider_Instance ***REMOVED***
    static PROVIDER_ID: string;
    static credential(idToken?: string|null, accessToken?: string|null):
        firebase.auth.AuthCredential;
  ***REMOVED***
  class GoogleAuthProvider_Instance implements firebase.auth.AuthProvider ***REMOVED***
    addScope(scope: string): any;
    providerId: string;
  ***REMOVED***

  class TwitterAuthProvider extends TwitterAuthProvider_Instance ***REMOVED***
    static PROVIDER_ID: string;
    static credential(token: string, secret: string):
        firebase.auth.AuthCredential;
  ***REMOVED***
  class TwitterAuthProvider_Instance implements firebase.auth.AuthProvider ***REMOVED***
    providerId: string;
  ***REMOVED***

  type UserCredential = ***REMOVED***
    credential: firebase.auth.AuthCredential | null,
    user: firebase.User | null
  ***REMOVED***;
***REMOVED***

declare namespace firebase.database ***REMOVED***
  interface DataSnapshot ***REMOVED***
    child(path: string): firebase.database.DataSnapshot;
    exists(): boolean;
    exportVal(): any;
    forEach(action: (a: firebase.database.DataSnapshot) => boolean): boolean;
    getPriority(): string|number|null;
    hasChild(path: string): boolean;
    hasChildren(): boolean;
    key: string|null;
    numChildren(): number;
    ref: firebase.database.Reference;
    val(): any;
  ***REMOVED***

  interface Database ***REMOVED***
    app: firebase.app.App;
    goOffline(): any;
    goOnline(): any;
    ref(path?: string): firebase.database.Reference;
    refFromURL(url: string): firebase.database.Reference;
  ***REMOVED***

  interface OnDisconnect ***REMOVED***
    cancel(onComplete?: (a: Error|null) => any): firebase.Promise<any>;
    remove(onComplete?: (a: Error|null) => any): firebase.Promise<any>;
    set(value: any, onComplete?: (a: Error|null) => any): firebase.Promise<any>;
    setWithPriority(
        value: any, priority: number|string|null,
        onComplete?: (a: Error|null) => any): firebase.Promise<any>;
    update(values: Object, onComplete?: (a: Error|null) => any):
        firebase.Promise<any>;
  ***REMOVED***

  interface Query ***REMOVED***
    endAt(value: number|string|boolean|null, key?: string):
        firebase.database.Query;
    equalTo(value: number|string|boolean|null, key?: string):
        firebase.database.Query;
    limitToFirst(limit: number): firebase.database.Query;
    limitToLast(limit: number): firebase.database.Query;
    off(eventType?: string,
        callback?: (a: firebase.database.DataSnapshot, b?: string|null) => any,
        context?: Object|null): any;
    on(eventType: string,
       callback: (a: firebase.database.DataSnapshot|null, b?: string) => any,
       cancelCallbackOrContext?: Object|null, context?: Object|
       null): (a: firebase.database.DataSnapshot|null, b?: string) => any;
    once(
        eventType: string,
        successCallback?:
            (a: firebase.database.DataSnapshot, b?: string) => any,
        failureCallbackOrContext?: Object|null,
        context?: Object|null): firebase.Promise<any>;
    orderByChild(path: string): firebase.database.Query;
    orderByKey(): firebase.database.Query;
    orderByPriority(): firebase.database.Query;
    orderByValue(): firebase.database.Query;
    ref: firebase.database.Reference;
    startAt(value: number|string|boolean|null, key?: string):
        firebase.database.Query;
    toString(): string;
  ***REMOVED***

  interface Reference extends firebase.database.Query ***REMOVED***
    child(path: string): firebase.database.Reference;
    key: string|null;
    onDisconnect(): firebase.database.OnDisconnect;
    parent: firebase.database.Reference|null;
    push(value?: any, onComplete?: (a: Error|null) => any):
        firebase.database.ThenableReference;
    remove(onComplete?: (a: Error|null) => any): firebase.Promise<any>;
    root: firebase.database.Reference;
    set(value: any, onComplete?: (a: Error|null) => any): firebase.Promise<any>;
    setPriority(
        priority: string|number|null,
        onComplete: (a: Error|null) => any): firebase.Promise<any>;
    setWithPriority(
        newVal: any, newPriority: string|number|null,
        onComplete?: (a: Error|null) => any): firebase.Promise<any>;
    transaction(
        transactionUpdate: (a: any) => any,
        onComplete?:
            (a: Error|null, b: boolean,
             c: firebase.database.DataSnapshot|null) => any,
        applyLocally?: boolean): firebase.Promise<any>;
    update(values: Object, onComplete?: (a: Error|null) => any):
        firebase.Promise<any>;
  ***REMOVED***

  interface ThenableReference extends firebase.database.Reference,
                                      firebase.Thenable<any> ***REMOVED******REMOVED***

  function enableLogging(logger?: any, persistent?: boolean): any;
***REMOVED***

declare namespace firebase.database.ServerValue ***REMOVED******REMOVED***

declare namespace firebase.storage ***REMOVED***
  interface FullMetadata extends firebase.storage.UploadMetadata ***REMOVED***
    bucket: string;
    downloadURLs: string[];
    fullPath: string;
    generation: string;
    metageneration: string;
    name: string;
    size: number;
    timeCreated: string;
    updated: string;
  ***REMOVED***

  interface Reference ***REMOVED***
    bucket: string;
    child(path: string): firebase.storage.Reference;
    delete (): Promise<any>;
    fullPath: string;
    getDownloadURL(): Promise<any>;
    getMetadata(): Promise<any>;
    name: string;
    parent: firebase.storage.Reference|null;
    put(data: any|Uint8Array|ArrayBuffer,
        metadata?: firebase.storage.UploadMetadata):
        firebase.storage.UploadTask;
    putString(
        data: string, format?: firebase.storage.StringFormat,
        metadata?: firebase.storage.UploadMetadata):
        firebase.storage.UploadTask;
    root: firebase.storage.Reference;
    storage: firebase.storage.Storage;
    toString(): string;
    updateMetadata(metadata: firebase.storage.SettableMetadata): Promise<any>;
  ***REMOVED***

  interface SettableMetadata ***REMOVED***
    cacheControl?: string|null;
    contentDisposition?: string|null;
    contentEncoding?: string|null;
    contentLanguage?: string|null;
    contentType?: string|null;
    customMetadata?: ***REMOVED***[/* warning: coerced from ? */ key: string]: string***REMOVED***|null;
  ***REMOVED***

  interface Storage ***REMOVED***
    app: firebase.app.App;
    maxOperationRetryTime: number;
    maxUploadRetryTime: number;
    ref(path?: string): firebase.storage.Reference;
    refFromURL(url: string): firebase.storage.Reference;
    setMaxOperationRetryTime(time: number): any;
    setMaxUploadRetryTime(time: number): any;
  ***REMOVED***

  type StringFormat = string;
  var StringFormat: ***REMOVED***
    BASE64: StringFormat,
    BASE64URL: StringFormat,
    DATA_URL: StringFormat,
    RAW: StringFormat,
  ***REMOVED***;

  type TaskEvent = string;
  var TaskEvent: ***REMOVED***
    STATE_CHANGED: TaskEvent,
  ***REMOVED***;

  type TaskState = string;
  var TaskState: ***REMOVED***
    CANCELED: TaskState,
    ERROR: TaskState,
    PAUSED: TaskState,
    RUNNING: TaskState,
    SUCCESS: TaskState,
  ***REMOVED***;

  interface UploadMetadata extends firebase.storage.SettableMetadata ***REMOVED***
    md5Hash?: string|null;
  ***REMOVED***

  interface UploadTask ***REMOVED***
    cancel(): boolean;
    catch (onRejected: (a: Error) => any): Promise<any>;
    on(event: firebase.storage.TaskEvent, nextOrObserver?: null|Object,
       error?: ((a: Error) => any)|null, complete?: (() => any)|null): Function;
    pause(): boolean;
    resume(): boolean;
    snapshot: firebase.storage.UploadTaskSnapshot;
    then(
        onFulfilled?: ((a: firebase.storage.UploadTaskSnapshot) => any)|null,
        onRejected?: ((a: Error) => any)|null): Promise<any>;
  ***REMOVED***

  interface UploadTaskSnapshot ***REMOVED***
    bytesTransferred: number;
    downloadURL: string|null;
    metadata: firebase.storage.FullMetadata;
    ref: firebase.storage.Reference;
    state: firebase.storage.TaskState;
    task: firebase.storage.UploadTask;
    totalBytes: number;
  ***REMOVED***
***REMOVED***

declare module 'firebase' ***REMOVED***
  export = firebase;
***REMOVED***

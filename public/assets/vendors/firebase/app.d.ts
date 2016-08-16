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

  function app(name: string): firebase.app.App;

  var apps: (firebase.app.App|null)[];

  function initializeApp(options: Object, name?: string): firebase.app.App;
***REMOVED***

declare namespace firebase.app ***REMOVED***
  interface App ***REMOVED***
    delete (): firebase.Promise<any>;
    name: string;
    options: Object;
  ***REMOVED***
***REMOVED***

declare module 'firebase' ***REMOVED***
  export = firebase;
***REMOVED***

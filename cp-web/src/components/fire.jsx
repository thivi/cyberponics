import * as admin from 'firebase';


  var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "",
    authDomain: "cyberponics-2017.firebaseapp.com",
    databaseURL: "https://cyberponics-2017.firebaseio.com",
    storageBucket: "cyberponics-2017.appspot.com",
    messagingSenderId: ""
  };
  export var fire = admin.initializeApp(config);

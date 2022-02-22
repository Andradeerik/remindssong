import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/functions";
import "firebase/storage";
let firebaseConfig = {
  apiKey: "AIzaSyBkfHJD1EI1C-DVsHPG3Z_uBSTfxwrHGB8",
  authDomain: "remindssong.firebaseapp.com",
  databaseURL: "https://remindssong-default-rtdb.firebaseio.com",
  projectId: "remindssong",
  storageBucket: "remindssong.appspot.com",
  messagingSenderId: "466301416028",
  appId: "1:466301416028:web:2134470645abbff104ec99",
  measurementId: "G-EX311ZYVC3",
};
if (location.hostname === "localhost") {
  firebaseConfig = {
    apiKey: "AIzaSyBkfHJD1EI1C-DVsHPG3Z_uBSTfxwrHGB8",
    authDomain: "remindssong.firebaseapp.com",
    databaseURL: "http://localhost:9000/?ns=remindssong",
    projectId: "remindssong",
    storageBucket: "remindssong.appspot.com",
    messagingSenderId: "466301416028",
    appId: "1:466301416028:web:2134470645abbff104ec99",
    measurementId: "G-EX311ZYVC3",
  };
}
let firebaseApp = firebase.initializeApp(firebaseConfig);
if (location.hostname === "localhost") {
  firebaseApp.auth().useEmulator("http://localhost:9099/");
  firebaseApp.functions().useEmulator("localhost", 5001);
}
let Auth = firebaseApp.auth();
let Funt = firebaseApp.functions();
let Db = firebaseApp.database();
let Storage = firebaseApp.storage();
let providerFace = new firebase.auth.FacebookAuthProvider();
let fireTime = firebase.database.ServerValue.TIMESTAMP;
export { Auth, Db, Funt, Storage, providerFace, fireTime };

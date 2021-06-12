import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDrLexqeIChxBMpGpKhutvH1XktxbdysVU",
  authDomain: "bingo-app-6a7cc.firebaseapp.com",
  projectId: "bingo-app-6a7cc",
  storageBucket: "bingo-app-6a7cc.appspot.com",
  messagingSenderId: "1074163690633",
  appId: "1:1074163690633:web:54bd8af05e560b16d86a58"
});

const db = firebaseApp.firestore();

export default db;
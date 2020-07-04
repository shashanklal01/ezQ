import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLKlYCcBKNcnadFtAXdk_19TJrFCw0eGo",
    authDomain: "ezq-ihacks.firebaseapp.com",
    databaseURL: "https://ezq-ihacks.firebaseio.com",
    projectId: "ezq-ihacks",
    storageBucket: "ezq-ihacks.appspot.com",
    messagingSenderId: "800555635067",
    appId: "1:800555635067:web:fc212698cc2cdb70c4edde",
    measurementId: "G-YF1VM56870"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
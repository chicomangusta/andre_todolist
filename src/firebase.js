import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBAy3w_AgaOYuBjJ1h0dkXCzC6nevdkqlU",
  authDomain: "andre-todolist.firebaseapp.com",
  databaseURL: "https://andre-todolist.firebaseio.com",
  projectId: "andre-todolist",
  storageBucket: "andre-todolist.appspot.com",
  messagingSenderId: "351150871112",
  appId: "1:351150871112:web:7a029eeb0a32b0c6753e7d",
});

export {  firebaseConfig as firebase }; 
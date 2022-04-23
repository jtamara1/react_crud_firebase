// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmIXvaqGAfXr8yEgWel15ftmOUrqGEyYY",
  authDomain: "crud-react-firebase-95779.firebaseapp.com",
  projectId: "crud-react-firebase-95779",
  storageBucket: "crud-react-firebase-95779.appspot.com",
  messagingSenderId: "246048754076",
  appId: "1:246048754076:web:6bc9ad1ff21cf33efb2059"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}
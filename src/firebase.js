// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVRbtMG4oG1480fdJ8n9PfayoRuCjfc-s",
  authDomain: "crud-basico-react-bp.firebaseapp.com",
  projectId: "crud-basico-react-bp",
  storageBucket: "crud-basico-react-bp.appspot.com",
  messagingSenderId: "930698563031",
  appId: "1:930698563031:web:e2a7cf09ae5d1b1e470f92"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}
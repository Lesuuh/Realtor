// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBghbKbX-6oyyvOKOgz8rL4oiY2czffFYY",
  authDomain: "realtor-app-ea069.firebaseapp.com",
  projectId: "realtor-app-ea069",
  storageBucket: "realtor-app-ea069.appspot.com",
  messagingSenderId: "854489798351",
  appId: "1:854489798351:web:7d1287445f1bedfd0d49ba"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
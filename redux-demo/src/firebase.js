// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2lYQjUvivCDDoQvRdCydFBRsFuQgHOjs",
  authDomain: "apartments-app-6a66f.firebaseapp.com",
  databaseURL: "https://apartments-app-6a66f-default-rtdb.firebaseio.com",
  projectId: "apartments-app-6a66f",
  storageBucket: "apartments-app-6a66f.appspot.com",
  messagingSenderId: "509085035362",
  appId: "1:509085035362:web:58af5c25545ccf8a23da3b",
  measurementId: "G-EJ6KJHWZPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
const analytics = getAnalytics(app);
export const db = getFirestore(app)
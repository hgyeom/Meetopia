// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUKuP2-LpqfAIVExuDQiVIjZ3WUqU71XA",
  authDomain: "meetopia-5eb69.firebaseapp.com",
  projectId: "meetopia-5eb69",
  storageBucket: "meetopia-5eb69.appspot.com",
  messagingSenderId: "53770758276",
  appId: "1:53770758276:web:4bbd277fe9d96888273ad1",
  measurementId: "G-EKF5PLVJXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

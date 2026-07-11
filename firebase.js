
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_XTXGaUTLoLCOIyzcgB9jhRNf10ICN2I",
  authDomain: "administrative-dms.firebaseapp.com",
  projectId: "administrative-dms",
  storageBucket: "administrative-dms.firebasestorage.app",
  messagingSenderId: "242529202138",
  appId: "1:242529202138:web:d449e0965ac0aa2f5adae3",
  measurementId: "G-EWG9388MQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth }  from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK2hCaIii9xQ4RO6KP-TbhVJvDjeoLQv4",
  authDomain: "qrwebsite-58a64.firebaseapp.com",
  databaseURL: "https://qrwebsite-58a64-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qrwebsite-58a64",
  storageBucket: "qrwebsite-58a64.appspot.com",
  messagingSenderId: "140203517720",
  appId: "1:140203517720:web:0b62b1c926208d4799606d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getDatabase(app);
export default app;
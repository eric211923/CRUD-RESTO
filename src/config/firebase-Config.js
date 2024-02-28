import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBeFBPbwxMP-uoFH1H2xs1RteA-5jejSTo",
  authDomain: "crud-resto-e4aa3.firebaseapp.com",
  databaseURL:
    "https://crud-resto-e4aa3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crud-resto-e4aa3",
  storageBucket: "crud-resto-e4aa3.appspot.com",
  messagingSenderId: "703623885288",
  appId: "1:703623885288:web:8947cba954b128f01db45d",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database;

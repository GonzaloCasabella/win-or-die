/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMX-OfUmyy1zuR8TuxNJ4SGXKS79uz2bQ",
    authDomain: "win-or-die-fe793.firebaseapp.com",
    projectId: "win-or-die-fe793",
    storageBucket: "win-or-die-fe793.appspot.com",
    messagingSenderId: "1087779551065",
    appId: "1:1087779551065:web:4f697f63c3efdd41ffbe48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line import/prefer-default-export
export const db = getFirestore(app);
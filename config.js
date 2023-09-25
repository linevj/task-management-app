import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDO4GhWgc0npa8ISNsOk_1Sv5ScvrNE82w",
  authDomain: "taskmanagement-3247b.firebaseapp.com",
  projectId: "taskmanagement-3247b",
  storageBucket: "taskmanagement-3247b.appspot.com",
  messagingSenderId: "967565807950",
  appId: "1:967565807950:web:3b4f2f3389f7d082b28e1f",
  measurementId: "G-71JR6JCPGS",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export { firebase };

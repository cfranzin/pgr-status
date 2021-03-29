import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCo07ogjWaiE0McznvnvNgoG40pMUgCH0o",
    authDomain: "pgr-status.firebaseapp.com",
    projectId: "pgr-status",
    storageBucket: "pgr-status.appspot.com",
    messagingSenderId: "726461325535",
    appId: "1:726461325535:web:32aa06fcfed95567e4496a",
    measurementId: "G-8R49GJKL6Z"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const f = firebase;
export const database = firebase.database;
export const auth = firebase.auth();
export const storage = firebase.storage();
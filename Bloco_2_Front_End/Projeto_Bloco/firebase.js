import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB62EdkjLkPpaAHYsEdEeIGw2ACWYQEu-c",
  authDomain: "projeto-de-bloco---bloco-2.firebaseapp.com",
  projectId: "projeto-de-bloco---bloco-2",
  storageBucket: "projeto-de-bloco---bloco-2.appspot.com",
  messagingSenderId: "377428993297",
  appId: "1:377428993297:web:be646a66f80fb09b3f18b0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth};
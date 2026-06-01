import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBU-v2-M8o6fpw9OsMFWobD-0_rZyw9aYE",

  authDomain: "greenstone-ngo.firebaseapp.com",

  projectId: "greenstone-ngo",

  storageBucket: "greenstone-ngo.firebasestorage.app",

  messagingSenderId: "473029290108",

  appId: "1:473029290108:web:e95b3d1727a8ec922a81f9",

  measurementId: "G-F5KSGX9KYG"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
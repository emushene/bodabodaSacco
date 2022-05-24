
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXQr0ad_CopuPagL8TpduD2Tic6ZgBfSI",
  authDomain: "dev-test-a7189.firebaseapp.com",
  projectId: "dev-test-a7189",
  storageBucket: "dev-test-a7189.appspot.com",
  messagingSenderId: "97623607541",
  appId: "1:97623607541:web:303a4fc12629a07c2e1dbc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_APIKEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT,
  storageBucket: import.meta.env.FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.FIREBASE_SENDER,
  appId: import.meta.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app, "gs://arcticlense.appspot.com");

export default app;

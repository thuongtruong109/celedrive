import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4L27n9mGVRkAzdB8CXfYZoLnbobooLUA",
  authDomain: "drive-clone-ab4c6.firebaseapp.com",
  projectId: "drive-clone-ab4c6",
  storageBucket: "drive-clone-ab4c6.appspot.com",
  messagingSenderId: "841798489358",
  appId: "1:841798489358:web:541aa5cc0367a3689a335f",
  measurementId: "G-6JZWYJPKEZ",

  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
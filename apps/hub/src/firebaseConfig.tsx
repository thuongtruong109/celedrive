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

  // apiKey: "AIzaSyCp-4IyCjTmawLcp3f27hKzJwzMn750jlQ",
  // authDomain: "instagram-e5a90.firebaseapp.com",
  // projectId: "instagram-e5a90",
  // storageBucket: "instagram-e5a90.appspot.com",
  // messagingSenderId: "725617962228",
  // appId: "1:725617962228:web:5dcb03dfa2f4c2b6d302a1",
  // measurementId: "G-58LSP3SNHL",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
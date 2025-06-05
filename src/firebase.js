// firebase.js o firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsS_AMlypdHcoultQ8HbDMK5PBQtuBheo",
  authDomain: "queprecio.firebaseapp.com",
  projectId: "queprecio",
  storageBucket: "queprecio.firebasestorage.app",
  messagingSenderId: "144456283402",
  appId: "1:144456283402:web:03caceb4725e29503fb6f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

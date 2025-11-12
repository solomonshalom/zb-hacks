import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkDOvHaElAxVVm9ceRKDPOyGrbsl9nh6s",
  authDomain: "hackathon-cb43a.firebaseapp.com",
  projectId: "hackathon-cb43a",
  storageBucket: "hackathon-cb43a.firebasestorage.app",
  messagingSenderId: "32470144988",
  appId: "1:32470144988:web:d29635b83816a1504b6119",
};

let app: any;
let auth: Auth;
let db: Firestore;

if (typeof window !== "undefined") {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };

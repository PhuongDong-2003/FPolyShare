import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvBjU_CPBRIP3DTqy6EATtR2H4n_xe1KM",
  authDomain: "fvideos-3163f.firebaseapp.com",
  projectId: "fvideos-3163f",
  storageBucket: "fvideos-3163f.appspot.com",
  messagingSenderId: "167963607363",
  appId: "1:167963607363:web:65f988815bb0cb0d63eff6",
  measurementId: "G-QZZ9KXFMS1"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

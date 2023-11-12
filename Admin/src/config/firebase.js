// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// by email 
import { getAuth,GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyAaMB-7VhVXKnA8YvXFP2ejFSjVMgyYz6M",
    authDomain: "codesharepoly-4453e.firebaseapp.com",
    databaseURL: "https://codesharepoly-4453e-default-rtdb.firebaseio.com",
    projectId: "codesharepoly-4453e",
    storageBucket: "codesharepoly-4453e.appspot.com",
    messagingSenderId: "922902498380",
    appId: "1:922902498380:web:ab37d29c548cf4e0e9b8e9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
import firebase from "firebase/app";

const firebaseConfig = {
  // Your web app's Firebase configuration
  apiKey: "AIzaSyBDPQOcOekZpuUpW9euxUK4pkX_TjjTYmo",
  authDomain: "tenedores-4dfc1.firebaseapp.com",
  projectId: "tenedores-4dfc1",
  storageBucket: "tenedores-4dfc1.appspot.com",
  messagingSenderId: "788304847122",
  appId: "1:788304847122:web:2a1fec4fe6dc5287f353cb",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

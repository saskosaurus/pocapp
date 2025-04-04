import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsPCLXl1M0hrpfZfOR1dpoib_2iNYKbI0",
  authDomain: "pocapp-bd45b.firebaseapp.com",
  projectId: "pocapp-bd45b",
  storageBucket: "pocapp-bd45b.firebasestorage.app",
  messagingSenderId: "496695565574",
  appId: "1:496695565574:web:4c683ff781105fb7c59287"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export {firebase, auth};
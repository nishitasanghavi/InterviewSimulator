import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQIn74Bo0RYx4b_6ZIqDmljbkooZ7g8nU",
  authDomain: "interviewsimulator-3866e.firebaseapp.com",
  projectId: "interviewsimulator-3866e",
  storageBucket: "interviewsimulator-3866e.appspot.com",
  messagingSenderId: "653452835360",
  appId: "1:653452835360:web:82670444a8d05ee60e9a45",
  measurementId: "G-WWCVV9ZDS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

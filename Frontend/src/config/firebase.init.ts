import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwYyxY3Nqz8SKI4y-EhRbvBGsU-G_dT0Q",
  authDomain: "book-catalog-app-ca987.firebaseapp.com",
  projectId: "book-catalog-app-ca987",
  storageBucket: "book-catalog-app-ca987.appspot.com",
  messagingSenderId: "25070881495",
  appId: "1:25070881495:web:b1a1e1bacdcb86b8ee7e92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export auth
export const auth = getAuth(app);
export default app;
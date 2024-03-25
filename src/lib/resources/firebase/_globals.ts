import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBPNCOqaqgIHo85oeEEf4fOH9RBNjhDuMA",
    authDomain: "cyclotic-fc537.firebaseapp.com",
    databaseURL: "https://cyclotic-fc537-default-rtdb.firebaseio.com",
    projectId: "cyclotic-fc537",
    storageBucket: "cyclotic-fc537.appspot.com",
    messagingSenderId: "497525688527",
    appId: "1:497525688527:web:ae73e8ecd0bf9e3681cfba",
    measurementId: "G-B6VP1G8FHY"
};

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
googleProvider.setCustomParameters({
    'login_hint': 'user@example.com'
});
export const providers = {
    google: googleProvider,
};

export const app = initializeApp(firebaseConfig);
const appAuth = getAuth(app);
appAuth.languageCode = 'it';
export const auth = appAuth;
export const db = getFirestore(app);

export default {
    app,
    auth,
    db,
    providers,
};

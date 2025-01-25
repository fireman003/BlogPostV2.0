'use client'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useContext, useState, createContext, useEffect } from "react";


const firebaseConfig = initializeApp({
    apiKey: "AIzaSyAkHxez5JfJCGXgtx20en1AJR6Q-l7orxU",

    authDomain: "blogpostserver.firebaseapp.com",
  
    projectId: "blogpostserver",
  
    storageBucket: "blogpostserver.appspot.com",
  
    messagingSenderId: "789738462608",
  
    appId: "1:789738462608:web:04c54c5fbb89135858e715",
  
    measurementId: "G-M69MQMT8XF"  
});

export const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);

export const loginEmailPassword = async () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

export const logout = async () => {
    signOut(auth).then(() => {
        console.log("User signed out");
    }).catch((error) => {
        console.log(error);
    });
}

export const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
    });
}

const AuthConterxt = createContext();

export const useAuth = () => {
    return useContext(AuthConterxt);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    async function initializeUser(user){
        if(user){
            setUser({...user});
            setUserLoggedIn(true);
        } else {
            setUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        user,
        userLoggedIn,      
        loading
    }

    return (
        <AuthConterxt.Provider value={value}>
            {!loading && children}
        </AuthConterxt.Provider>
    )
}
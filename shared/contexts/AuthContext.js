import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../configs/firebase";

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }) {
  // States
  const [loggedUser, setLoggedUser] = useState(null);
  // End States

  //   Functions

  const loginViaEmail = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log("data is: ", data);
          resolve(data);
        })
        .catch((err) => {
          console.log("err is: ", err);
          reject(err);
        });
    });
  };

  const logout = async () => {
    setLoggedUser(null);
    await signOut(auth);
  };

  //  End Functions

  // Effects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user);
      } else {
        setLoggedUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const payload = {
    loggedUser,
    loginViaEmail,
    logout,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

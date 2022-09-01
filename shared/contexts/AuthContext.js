import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../configs/firebase";
import Layout from "../../layouts/Layout";

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }) {
  // States
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // End States

  // Effects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user);
        setLoading(false);
      } else {
        setLoggedUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  // End Effects

  // Conditions
  if (loading) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    )
  }
  // End Conditions

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

  const registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
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

  const payload = {
    loggedUser,
    loginViaEmail,
    logout,
    registerUser,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

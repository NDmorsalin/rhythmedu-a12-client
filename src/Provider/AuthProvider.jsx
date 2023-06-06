/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   register with email and password
  const register = async (email, password, name, photoUrl) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      console.log("update profile", name, photoUrl);
      await updateProfile(auth.currentUser, {
        displayName: name || null,
        photoURL: photoUrl || null,
      });

      console.error("register function try", error);
    } catch (error) {
      setError(error.message);
      console.error("register function cathc", error);

      setLoading(false);
       throw new Error(error.message);
    }
    setLoading(false);

    return auth.currentUser;
  };

  // login with email and password
  const login = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // forget password
  const forgetPassword = async (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // login with google
  const googleProvider = new GoogleAuthProvider();
  const loginWithGoogle = async () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // logout
  const logout = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // set user on auth state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        //set jwt as email
        const res = await axios.post(
          "https://khelagorbackend.vercel.app/api/token",
          {
            email: user?.email,
          }
        );
        console.log(res.data.token);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    login,
    logout,
    loginWithGoogle,
    error,
    setLoading,
    setError,
    forgetPassword,
  };
  // console.log(error);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

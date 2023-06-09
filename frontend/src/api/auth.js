import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase
} from "firebase/auth";

import { firebaseAuth } from ".";

export const auth = {
  /**
   * Takes an email and password and returns an authenticated user,
   * throws an error otherwise
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<User>}
   */
  signUp: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user
  },

  /**
   * Takes an email and password and returns an authenticated user,
   * throws an error otherwise
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<User>}
   */
  signIn: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
    return userCredential.user;
  },

  /**
   * Signs out current user
   * 
   * @returns {Promise<void>}
   */
  signOut: async () => {
    return await signOutFirebase(firebaseAuth);
  }
}

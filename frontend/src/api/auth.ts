import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, firebaseAuth } from ".";

export const auth = {
  /**
   * Takes an email and password and returns an authenticated user,
   * throws an error otherwise
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<User>}
   */
  signUp: async (email: string, password: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      admin: false,
    });
    return user;
  },

  /**
   * Takes an email and password and returns an authenticated user,
   * throws an error otherwise
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<User>}
   */
  signIn: async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;
  },

  /**
   * Signs out current user
   * 
   * @returns {Promise<void>}
   */
  signOut: async (): Promise<void> => {
    return await signOutFirebase(firebaseAuth);
  },

  /**
   * Gets the current user
   * 
   * @returns {User}
   */
  currentUser: (): User | null => firebaseAuth.currentUser,
}

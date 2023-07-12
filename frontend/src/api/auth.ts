import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail as sendPasswordResetEmailFirebase,
  signInWithEmailAndPassword,
  signOut as signOutFirebase
} from "firebase/auth";
import * as Realm from "realm-web";
import { firebaseAuth, realmApp } from ".";

// https://levelup.gitconnected.com/how-to-use-firebase-authentication-with-mongodb-realm-the-easy-way-5b85c8532000

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
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await realmApp.logIn(Realm.Credentials.jwt(await userCredential.user.getIdToken()));
    return userCredential.user;
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
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await realmApp.logIn(Realm.Credentials.jwt(await userCredential.user.getIdToken()));
    console.log(userCredential.user, realmApp.currentUser);
    return userCredential.user;
  },

  /**
   * Signs out current user
   *
   * @returns {Promise<void>}
   */
  signOut: async (): Promise<void> => {
    await Promise.all([signOutFirebase(firebaseAuth), realmApp.currentUser?.logOut()]);
  },

  /**
   * Gets the current user
   *
   * @returns {User}
   */
  currentUser: (): User | null => firebaseAuth.currentUser,

  /**
   * Sends a password reset email to the specified email address
   *
   * @param {string} email
   * @returns {Promise<void>}
   */
  sendPasswordResetEmail: async (email: string): Promise<void> => {
    await sendPasswordResetEmailFirebase(firebaseAuth, email);
  },
};

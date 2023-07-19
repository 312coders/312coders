import {
  User as FirebaseUser,
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
   * @returns {Promise<FirebaseUser>}
   */
  signUp: async (email: string, password: string): Promise<FirebaseUser> => {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await auth.signOutAnonymous()
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
  signIn: async (email: string, password: string): Promise<FirebaseUser> => {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await auth.signOutAnonymous();
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
    await Promise.all([auth.signOutAnonymous(), signOutFirebase(firebaseAuth), realmApp.currentUser?.logOut()]);
  },

  /**
   * Signs into an anonymous session for Realm
   * 
   * @returns {Promise<Realm.User>}
   */
  signInAnonymous: async (): Promise<Realm.User> => {
    if (realmApp.currentUser?.providerType === 'custom-token') {
      console.log('using firebase user session');
      return realmApp.currentUser;
    }
    if (realmApp.currentUser?.providerType === 'anon-user') {
      console.log('using existing anonymous session');
      return realmApp.currentUser;
    }
    const user = await realmApp.logIn(Realm.Credentials.anonymous());
    console.log('logged in anonymously');
    return user;
  },

  /**
   * Signs out of anonymous session for Realm
   * 
   * @returns {Promise<void>}
   */
  signOutAnonymous: async (): Promise<void> => {
    if (realmApp.currentUser?.providerType === 'anon-user') {
      await realmApp.removeUser(realmApp.currentUser);
      console.log('signed out anonymous user');
    }
  },

  /**
   * Gets the current user
   *
   * @returns {FirebaseUser}
   */
  currentUser: (): FirebaseUser | null => firebaseAuth.currentUser,

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

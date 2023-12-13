import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCTHGhA9muvPCe2nE_2sJxWG9ZNi0hRyDM',
  authDomain: 'playuniverse-c40bb.firebaseapp.com',
  projectId: 'playuniverse-c40bb',
  storageBucket: 'playuniverse-c40bb.appspot.com',
  messagingSenderId: '1059494774519',
  appId: '1:1059494774519:web:d31e55b73c7e59230ef5f2',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.useDeviceLanguage();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    throw error;
  }
};

const signInWithFaceBook = async () => {
  try {
    const result = await signInWithPopup(auth, FacebookAuthProvider);
    return result;
  } catch (error) {
    throw error;
  }
};

// export const handleUserProfile = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   const { uid } = userAuth;

//   const userRef = doc(firestore, `users/${uid}`);

//   const snapShot = await getDoc(userRef);

//   if (!snapShot.exists()) {
//     const { displayName, email } = userAuth;
//     const timestamp = new Date();

//     try {
//       await setDoc(userRef, {
//         displayName,
//         email,
//         createdDate: timestamp,
//         ...additionalData,
//       });
//     } catch (e) {
//       console.log("Error Creating User", e);
//     }
//   }
//   return userRef;
// };
const currentUser = auth.currentUser || {};
export { auth, firestore, currentUser, signInWithGoogle, signInWithFaceBook };

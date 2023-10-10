//Needs to Fix google login button

import { initializeApp } from 'firebase/app';
import { getAuth,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, query, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmRlc5E6W80IRZIgEPdjOVKW5rT5tNsJg",
  authDomain: "play-universe-a3e54.firebaseapp.com",
  projectId: "play-universe-a3e54",
  storageBucket: "play-universe-a3e54.appspot.com",
  messagingSenderId: "12280594533",
  appId: "1:12280594533:web:15602515bd2bdf052a468c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' }); 

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.useDeviceLanguage();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Access the user info from `result.user` if needed.
    return result;
  } catch (error) {
    throw error;
  }
};

export { auth, firestore,signInWithGoogle };

// export const handleUserProfile = async (userAuth, additionalData) => {
//   if (!userAuth) {
//     return;
//   }
//   const { uid } = userAuth;

//   const userRef = doc(firestore, `users/${uid}`);
//   const userQuery = query(userRef); // Create a query using the doc reference

//   const snap = await getDoc(userRef);

//   if (!snap.exists()) {
//     const { displayName, email } = userAuth;
//     const timestamp = new Date();
//     try {
//       await setDoc(userRef, {
//         displayName,
//         email,
//         createDate: timestamp,
//         ...additionalData,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   // Now, set up a listener to handle real-time updates using the query
//   const unsubscribe = onSnapshot(userQuery, (snapshot) => {
//     // Handle updates here if needed
//     // snapshot contains the latest data
//   });

//   return userRef;
// };
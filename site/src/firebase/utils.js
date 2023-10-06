//Needs to Fix google login button

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


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

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(GoogleProvider);
    return result;
  } catch (error) {
    throw error;
  }
};

export const handleUserProfile = async(userAuth,additionalData) =>{
  if(!userAuth){
    return;
  }
  const {uid} = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snaps = await userRef.get();

  if(!snaps.exists){
    const { displayName,email} = userAuth;
    const timestamp = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createDate: timestamp,
        ...additionalData
      });
    }catch(e){
      console.log(e);
    }
  }
  return userRef;
};

export { auth, firestore };

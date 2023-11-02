import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmRlc5E6W80IRZIgEPdjOVKW5rT5tNsJg",
  authDomain: "play-universe-a3e54.firebaseapp.com",
  projectId: "play-universe-a3e54",
  storageBucket: "play-universe-a3e54.appspot.com",
  messagingSenderId: "12280594533",
  appId: "1:12280594533:web:15602515bd2bdf052a468c"
};

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
    return result;
  } catch (error) {
    throw error;
  }
};

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const { uid } = userAuth;

  const userRef = doc(firestore, `users/${uid}`);

  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData
      });
    } catch (e) {
      console.log('Error Creating User', e);
    }
  }
  return userRef;
};

export { auth, firestore, signInWithGoogle };

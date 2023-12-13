import {
  firestore,
  auth,
  signInWithGoogle,
  signInWithFaceBook,
} from '../../src/firebase/utils';
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from 'antd';

export const getGamesListApi = (setGames) => {
  const q = query(collection(firestore, 'games'));
  onSnapshot(q, (querySnapshot) => {
    let gamesArray = [];
    querySnapshot.forEach((doc) => {
      gamesArray.push({ ...doc.data(), id: doc.id });
    });
    setGames(gamesArray);
  });
};

const getRating = (game) => {
  let totalRatings = game.ratings.reduce(
    (accumulator, item) => accumulator + item.rating,
    0
  );
  let totalNumberOfUsers = game.ratings.length || 1;
  return totalRatings / totalNumberOfUsers;
};

export const getGamesListApi0 = (setGames) => {
  const q = query(collection(firestore, 'games'));
  onSnapshot(q, (querySnapshot) => {
    let gamesArray = [];
    querySnapshot.forEach((doc) => {
      gamesArray.push({
        ...doc.data(),
        rate: getRating(doc.data()),
        id: doc.id,
      });
    });
    setGames(gamesArray.sort((a, b) => b.rate - a.rate).splice(0, 3));
  });
};

export const handleLogin = async (values, navigate, callback) => {
  const { username, password } = values;
  try {
    let user = await signInWithEmailAndPassword(auth, username, password);
    localStorage.setItem('userData', JSON.stringify(user.user));
    navigate('/');
  } catch (error) {
    console.error('Login error:', error);
    callback();
  }
};

export const handleGoogleLogin = async () => {
  try {
    const userCredential = await signInWithGoogle();
    const { user } = userCredential;

    // Access user information
    const { uid, displayName, email, photoURL } = user;

    // Access Firestore
    const usersCollection = collection(firestore, 'users');

    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(usersCollection, uid), {
        username: displayName,
        email: email,
        firstName: displayName,
        lastName: '',
        photoURL,
        birthdate: '',
        isAdmin: false,
        is_blocked: false,
        pointsEarned: 0,
      });
    }

    console.log('User data stored successfully in Firebase');
  } catch (error) {
    console.error('Error handling Google login:', error.message);
  }
};

export const handleFacebookLogin = async () => {
  const provider = new FacebookAuthProvider(); // Import FacebookAuthProvider from Firebase
  try {
    await signInWithPopup(auth, provider);
    console.log('Facebook login successful:', auth.currentUser);
  } catch (error) {
    console.error('Facebook login error:', error);
  }
};

export const getUserData = async (setUser, id = '') => {
  let userId = id || JSON.parse(localStorage.getItem('userData'))?.uid;
  try {
    const q = query(collection(firestore, 'users'));
    if (userId) {
      onSnapshot(q, async (querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          if (doc.data().user_id == String(userId)) {
            setUser(doc.data());
          }
        });
      });
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const addComment = async (user, gameId, callback) => {
  try {
    const docRef = doc(firestore, 'games', gameId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = Array.from(docSnap.data());
      let commentsData = Array.from(docSnap.data().comments);

      await updateDoc(docRef, {
        ...data,
        comments: [
          ...commentsData,
          {
            name: user.name || '',
            photo_url: user.profile_url || '',
            comment: user.comment || '',
            id: uuidv4(),
            user_id: user.user_id,
          },
        ],
      });
      callback();
    }
  } catch (error) {
    console.error('Error getting game:', error);
  }
};

export const updateUserData = async (userId, usersData) => {
  try {
    const docRef = doc(firestore, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = Array.from(docSnap.data());
      await updateDoc(docRef, usersData);
    }
  } catch (error) {
    console.error('Error getting game:', error);
  }
};

export const updateGameData = async (gameId, gamesData) => {
  try {
    const docRef = doc(firestore, 'games', gameId); // Assuming gameId is the document ID
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      await updateDoc(docRef, gamesData);

      console.log('Document successfully updated!');
    } else {
      console.log('Document does not exist');
    }
  } catch (error) {
    console.error('Error updating game:', error);
  }
};

export const getGameData = async (setGameData, id) => {
  const q = query(collection(firestore, 'games'));
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().game_id === id) {
        setGameData(doc.data());
      }
    });
  });
};

export const addRating = async (user, gameId, callback) => {
  try {
    const docRef = doc(firestore, 'games', gameId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = Array.from(docSnap.data());
      let ratingsData = Array.from(docSnap.data().ratings);
      await updateDoc(docRef, {
        ...data,
        ratings: [
          ...ratingsData,
          {
            name: user.name,
            photo_url: user.profile_url,
            rating: user.rating,
            id: uuidv4(),
          },
        ],
      });
      callback();
    }
  } catch (error) {
    console.error('Error getting game:', error);
  }
};

export const addPointsEarned = async (userId, playtimeInSeconds) => {
  try {
    const docRef = doc(firestore, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const currentPoints = data.pointsEarned || 0; // Default to 0 if pointsEarned doesn't exist

      await updateDoc(docRef, {
        pointsEarned: currentPoints + playtimeInSeconds,
      });
    }
  } catch (error) {
    console.error('Error updating pointsEarned:', error);
  }
};

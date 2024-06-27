import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { setPersistence, browserLocalPersistence } from 'firebase/auth'; // Import other necessary auth functions

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_PROJECT_ID + '.firebaseapp.com',
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_PROJECT_ID + ".appspot.com",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

// Export the auth functions
export { createUserWithEmailAndPassword, setPersistence, browserLocalPersistence };

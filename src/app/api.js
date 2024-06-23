// api.js
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "./firebase";
import { storage } from "./firebase"; // Import storage from firebase.js

const collectionName = 'usersEventos';

// CREATE
export const createItem = async (obj) => {
    const colRef = collection(db, collectionName);
    const data = await addDoc(colRef, obj);
    return data.id;
}

export const createEvent = async (userId, mensaje, fecha, checkedUsersIds) => {
    const colRef = collection(db, 'events');

    for (const destinatarioId of checkedUsersIds) {
        await addDoc(colRef, { destinatarioId, msg: mensaje, date: fecha, remitenteId: userId });
    }
}

// UPDATE
export const updateItem = async (id, obj) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj);
}

// READ
export const getItems = async () => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

// READ WITH WHERE
export const getItemsByCondition = async (value) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where('age', '==', value)));
    return getArrayFromCollection(result);
}

export const getItemById = async (id) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data();
}

// DELETE
export const deleteItem = async (id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

// Upload Profile Photo
export const uploadProfilePhoto = async (userId, file) => {
    const storageRef = ref(storage, `profile_photos/${userId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

// Set User Residence
export const setUserResidence = async (userId, residence) => {
    const userRef = doc(db, collectionName, userId);
    await setDoc(userRef, { residence }, { merge: true }); // Merge ensures it doesn't overwrite other fields
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
        if (auth.uid) {
            return result.user.uid;
        } else {
            const docRef = doc(db, 'usersEventos', result.user.uid);
            setDoc(docRef, { name: result.user.displayName });
            return result.user.uid;
        }
    });
}

export { auth, createUserWithEmailAndPassword };

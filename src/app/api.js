import { auth, db, storage } from "./firebase"; // Import `auth`, `db`, and `storage` from `firebase.js`
import { collection, addDoc, doc, getDoc, getDocs, query, where, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const collectionName = 'usersEventos';

// Function to set user's residence
export const setUserResidence = async (userId, residence) => {
    const docRef = doc(db, collectionName, userId);
    await updateDoc(docRef, {
        residence: residence
    });
};

// CREATE
export const createItem = async (obj) => {
    const colRef = collection(db, collectionName);
    const data = await addDoc(colRef, obj);
    return data.id;
};

export const createEvent = async (userId, mensaje, fecha, checkedUsersIds) => {
    const colRef = collection(db, 'events');

    for (const destinatarioId of checkedUsersIds) {
        await addDoc(colRef, { destinatarioId, msg: mensaje, date: fecha, remitenteId: userId });
    }
};

// UPDATE
export const updateItem = async (id, obj) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj);
};

// READ
export const getItems = async () => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
};

// READ WITH WHERE
export const getItemsByCondition = async (value) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where('age', '==', value)));
    return getArrayFromCollection(result);
};

export const getItemById = async (id) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data();
};

// DELETE
export const deleteItem = async (id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
};

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
};

export const uploadProfilePhoto = async (userId, file) => {
    try {
        // Create a storage reference
        const storageRef = ref(storage, `profilePhotos/${userId}/${file.name}`);

        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL; // Return the download URL of the uploaded photo
    } catch (error) {
        console.error("Error uploading profile photo: ", error);
        throw error; // Throw the error for handling in the component
    }
};

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
};

// New function to get users by an array of user IDs
export const getUsersByUserId = async (userIds) => {
    const users = [];
    for (const userId of userIds) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            users.push({ id: userId, ...userDoc.data() });
        }
    }
    return users;
};
}
export { auth, createUserWithEmailAndPassword, };

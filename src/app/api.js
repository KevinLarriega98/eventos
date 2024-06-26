import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot, documentId } from "./firebase";

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
    await updateDoc(docRef, obj)
}

// READ
export const getItems = async (collectName) => {
    const colRef = collection(db, collectName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}


// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
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

export const getUsersByUserId = async (ids) => {
    const result = await getDocs(query(collection(db, 'usersEventos'), where(documentId(), 'in', ids)));
    const res = getArrayFromCollection(result);

    return res
}

// DELETE
export const deleteItem = async (id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
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
            return result.user.uid
        } else {
            const docRef = doc(db, 'usersEventos', result.user.uid);
            setDoc(docRef, { name: result.user.displayName });
            return result.user.uid;
        }
    });
}
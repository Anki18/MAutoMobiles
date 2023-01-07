import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebaseConfig';
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore';

export const getSuperUsers = () => {
    initializeApp(firebaseConfig);
    const db = getFirestore();
    const colRef = collection(db, 'superusers');
    let susers = [];
    getDocs(colRef)
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                susers.push({ ...doc.data(), id: doc.id })
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    console.log(susers);
    return susers;
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
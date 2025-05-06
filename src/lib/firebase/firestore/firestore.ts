import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../config";

export const firestore = {
    add: async (collectionName: string, data: any) => {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef;
    },
    get: async (collectionName: string, id: string) => {
        const docRef = doc(collection(db, collectionName), id);
        return docRef;
    },
    getAll: async (collectionName: string) => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map((doc) => doc.data());
    },
};

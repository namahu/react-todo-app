import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
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
    getAll: async (collectionName: string, userId: string) => {
        const q = query(collection(db, collectionName), where("user.id", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => doc.data());
    },
};

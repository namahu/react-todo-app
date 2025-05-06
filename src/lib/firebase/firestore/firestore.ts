import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

export const firestore = {
    add: async (collectionName: string, data: any) => {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef;
    },
};

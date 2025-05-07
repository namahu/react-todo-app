import { firestore } from "@/lib/firebase/firestore/firestore";
import { DocumentData, DocumentReference } from "firebase/firestore";

export const useCreateTask = (
    data: Task
): Promise<DocumentReference<any, DocumentData>> => {
    return firestore.add("tasks", data);
};

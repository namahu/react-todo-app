import { firestore } from "@/lib/firebase/firestore/firestore";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { nanoid } from "nanoid";

export const useCreateTask = (
    data: Task
): Promise<DocumentReference<any, DocumentData>> => {
    const id = "td-" + nanoid();
    const newTaskWithId = { ...data, id };
    return firestore.add("tasks", newTaskWithId);
};

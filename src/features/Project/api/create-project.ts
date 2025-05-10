import { DocumentData, DocumentReference } from "firebase/firestore";
import { Project } from "../context/project-context";
import { firestore } from "@/lib/firebase/firestore/firestore";

export const useCreateProject = (
    data: Project
): Promise<DocumentReference<any, DocumentData>> => {
    return firestore.add("projects", data);
}

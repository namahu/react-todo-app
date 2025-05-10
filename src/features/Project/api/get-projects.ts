import { useEffect, useReducer, Reducer } from "react";
import { Project, ProjectDispathAction } from "../context/project-context";
import { firestore } from "@/lib/firebase/firestore/firestore";
import { useFirebase } from "@/lib/firebase/context/firebsae-context";

export const useAllProjects = (projectReducer: Reducer<Project[], ProjectDispathAction>) => {
    const [ projects, dispatch ] = useReducer(projectReducer, []);
    const { state } = useFirebase();

    useEffect(() => {
        let unmounted = false;

        const getProjects = async () => {
            const response = await firestore.getAll("projects", state.user?.uid ?? "");
            dispatch({ type: "FETCH_PROJECTS", payload: response as Project[] });
        };

        if (!unmounted) {
            getProjects();
        }

        return () => {
            unmounted = true;
        };

    }, []);

    return {projects, dispatch};
    
};

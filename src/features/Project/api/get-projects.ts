import { api } from "@/lib/api-client";
import { useEffect, useReducer, Reducer } from "react";
import { Project, ProjectDispathAction } from "../context/project-context";

export const useAllProjects = (projectReducer: Reducer<Project[], ProjectDispathAction>) => {
    const [ projects, dispatch ] = useReducer(projectReducer, []);

    useEffect(() => {
        let unmounted = false;

        const getProjects = async () => {
            const response = await api.get("projects");
            dispatch({ type: "FETCH_PROJECTS", payload: response });
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

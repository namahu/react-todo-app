import React, { createContext, Reducer } from "react";

import { useAllProjects } from "../api/get-projects";

export type Project = {
    id?: string;
    name: string;
    description: string;
    deleted: boolean;
    createdAt: number | null;
    updatedAt: number | null;
    deletedAt: number | null;
    user: {
        id: string | null;
    }
};

export type ProjectDispathAction =
    | { type: "ADD_PROJECT"; payload: Project }
    | { type: "UPDATE_PROJECT"; payload: Project }
    | { type: "DELETE_PROJECT"; payload: Project }
    | { type: "FETCH_PROJECTS"; payload: Project[] };

export type ProjectFormState = boolean;

export type ProjectFormDispatchAction =
    | { type: "FORM_TOGGLE" };

const projectReducer: Reducer<Project[], ProjectDispathAction> = (
    state: Project[], action: ProjectDispathAction
): Project[] => {
    switch (action.type) {
        case "FETCH_PROJECTS":
            return action.payload;
        case "ADD_PROJECT":
            return [...state, action.payload];
        case "UPDATE_PROJECT":
            return state.map(project => {
                if (project.id === action.payload.id) {
                    return action.payload;
                }
                return project;
            });
        case "DELETE_PROJECT":
            return state.filter(project => project.id !== action.payload.id);
        default:
            throw new Error("Invalid action type: " + (action as ProjectDispathAction).type);
    }
}

const projectFormReducer: Reducer<ProjectFormState, ProjectFormDispatchAction> = (
    state: ProjectFormState, action: ProjectFormDispatchAction
): ProjectFormState => {
    switch (action.type) {
        case "FORM_TOGGLE":
            return !state;
        default:
            throw new Error("Invalid action type: " + (action as ProjectFormDispatchAction).type);
    }
};

const ProjectContext = createContext<Project[] | null>(null);
const ProjectDispatchContext = createContext<React.Dispatch<ProjectDispathAction>>(() => { });

const ProjectFormContext = createContext<ProjectFormState | null>(null);
const ProjectFormDispatchContext = createContext<React.Dispatch<ProjectFormDispatchAction>>(() => { });

export const ProjectContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { projects, dispatch } = useAllProjects(projectReducer);
    const [projectFormState, projectFormDispatch] = React.useReducer(projectFormReducer, false);

    return (
        <ProjectContext.Provider value={projects}>
            <ProjectDispatchContext.Provider value={dispatch}>
                <ProjectFormContext.Provider value={projectFormState}>
                    <ProjectFormDispatchContext.Provider value={projectFormDispatch}>
                        {children}
                    </ProjectFormDispatchContext.Provider>
                </ProjectFormContext.Provider>
            </ProjectDispatchContext.Provider>
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    const projects = React.useContext(ProjectContext);
    const projectDispatch = React.useContext(ProjectDispatchContext);

    if (projects === null || projectDispatch === null) {
        throw new Error("useProjectContext must be used within a ProjectContextProvider");
    }

    return { projects, projectDispatch };
};

export const useProjectFormContext = () => {
    const projectFormState = React.useContext(ProjectFormContext);
    const projectFormDispatch = React.useContext(ProjectFormDispatchContext);

    if (projectFormState === null || projectFormDispatch === null) {
        throw new Error("useProjectFormContext must be used within a ProjectContextProvider");
    }

    return { projectFormState, projectFormDispatch };
};

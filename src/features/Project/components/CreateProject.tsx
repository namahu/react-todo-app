import React, { useState } from "react";

import { useCreateProject } from "../api/create-project";
import { Project, useProjectContext, useProjectFormContext } from "../context/project-context";

import styles from "../styles/CreateProject.module.css";
import { Button } from "@/components/ui/button/button";
import { useFirebase } from "@/lib/firebase/context/firebsae-context";

const initialProject: Project = {
    name: "",
    description: "",
    deleted: false,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    user: {
        id: null,
    }
};

export const CreateProject: React.FC = () => {
    const { projectDispatch } = useProjectContext();
    const { projectFormState, projectFormDispatch } = useProjectFormContext();

    const { state } = useFirebase();

    const [project, setProject] = useState<Project>(initialProject);

    const handleOnSubmit = useCreateProject;

    if (!projectFormState) {
        return null;
    }

    return (
        <div className={styles["modal-background"]}>
            <div className={styles["projectCreate-container"]}>
                <h2>Create a new project</h2>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        const newProject: Project = {
                            ...project,
                            createdAt: new Date().getTime(),
                            user: {
                                id: state.user?.uid ?? null,
                            },
                        };
                        const response = await handleOnSubmit(newProject);
                        console.log(response);
                        projectDispatch({ type: "ADD_PROJECT", payload: { ...newProject, id: response.id } });
                        projectFormDispatch({ type: "FORM_TOGGLE" });
                        setProject(initialProject);
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Project name"
                        value={project.name}
                        onChange={({ target }) => setProject({ ...project, name: target.value })}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={project.description}
                        onChange={({ target }) => setProject({ ...project, description: target.value })}
                    />
                    <div className={styles["formButton-container"]}>
                        <Button
                            type="button"
                            onClick={() => {
                                projectFormDispatch({ type: "FORM_TOGGLE" })
                                setProject(initialProject)
                            }}>
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                            className={"button-safety"}
                        >
                            Create Project
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

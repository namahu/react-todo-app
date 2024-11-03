import React, { useState } from "react";

import { useCreateProject } from "../api/create-project";
import { Project, useProjectContext } from "../context/project-context";

const initialProject: Project = {
    id: "",
    name: "",
    description: "",
    deleted: false,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
};

export const CreateProject: React.FC = () => {
    const { projectDispatch } = useProjectContext();

    const [project, setProject] = useState<Project>(initialProject);

    const handleOnSubmit = useCreateProject;

    return (
        <div>
            <h2>Create a new project</h2>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    const newProject: Project = { ...project, createdAt: new Date().getTime() };
                    await handleOnSubmit(newProject);
                    projectDispatch({ type: "ADD_PROJECT", payload: newProject });
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
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

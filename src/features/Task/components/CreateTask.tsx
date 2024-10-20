import React, { useState } from "react";

import { useAllProjects } from "@/features/Project/api/get-projects";

export const CreateTask: React.FC = () => {
    const { projects, isLoading } = useAllProjects();
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(!isOpen)}>Add Task</button>
        );
    }

    return (
        <div>
            <div className="taskCreateForm">
                <div className="formItem">
                    <input type="text" name="title" placeholder="Task name" />
                </div>
                <div className="formItem">
                    <input type="text" name="description" placeholder="Description" />
                </div>
                <div className="formItem">
                    <input type="date" name="startDate" placeholder="Task name" />
                </div>
                <div className="formItem">
                    <input type="date" name="dueDate" placeholder="Task name" />
                </div>
                <div className="formItem">
                    <select>
                        {isLoading
                            ? <option>loading...</option>
                            : projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                    </select>
                </div>
                <button type="button" onClick={() => setIsOpen(!isOpen)}>Cancel</button>
                <button type="button">Add Task</button>
            </div>
        </div>
    );
};

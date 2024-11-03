import React from "react";

import { useProjectContext } from "@/features/Project/context/project-context";

export const Sidebar: React.FC = () => {
    const { projects } = useProjectContext();

    return (
        <div className="sidebar">
            <ul>
                <li>All Tasks</li>
            </ul>
            <h2>Project List</h2>
            <ul>
                {projects.map((project) => <li key={project.id}>{project.name}</li>)}
            </ul>
        </div>
    );
}

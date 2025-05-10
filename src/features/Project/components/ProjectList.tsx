import React from "react";
import { useProjectContext } from "../context/project-context";
import { Link } from "react-router-dom";

export const ProjectList: React.FC = () => {
    const { projects } = useProjectContext();

    console.log(projects);

    return (
        <ul>
            {projects.map((project) => (
                <li key={project.id}>
                    <Link to={"/app/tasks/" + project.id}>{project.name}</Link>
                </li>
            ))}
        </ul>
    );
};

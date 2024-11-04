import React, { useState } from "react";

import { useProjectContext, useProjectFormContext } from "@/features/Project/context/project-context";

import styles from "./styles/sidebar.module.css";
import { Link } from "react-router-dom";

export const Sidebar: React.FC = () => {
    const { projects } = useProjectContext();
    const { projectFormDispatch } = useProjectFormContext();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/tasks/">All Tasks</Link>
                </li>
            </ul>
            <div
                className={styles["project-list"]}
                onPointerEnter={() => setIsMenuOpen(true)}
                onPointerLeave={() => setIsMenuOpen(false)}
            >
                <h2>Project List</h2>
                {!isMenuOpen ? null
                    : <div
                        className={styles["project-list__menu"]}
                    >
                        <span
                            onClick={() => projectFormDispatch({ type: "FORM_TOGGLE" })}
                        >+</span>
                    </div>
                }
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <Link to={"/tasks/" + project.id}>{project.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

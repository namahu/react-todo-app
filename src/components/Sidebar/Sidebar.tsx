import React, { useState } from "react";

import { useProjectContext, useProjectFormContext } from "@/features/Project/context/project-context";

import styles from "./styles/sidebar.module.css";

export const Sidebar: React.FC = () => {
    const { projects } = useProjectContext();
    const { projectFormDispatch } = useProjectFormContext();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="sidebar">
            <ul>
                <li>All Tasks</li>
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
                    {projects.map((project) => <li key={project.id}>{project.name}</li>)}
                </ul>
            </div>
        </div>
    );
}

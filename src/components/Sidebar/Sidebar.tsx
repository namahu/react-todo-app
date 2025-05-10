import React, { useState } from "react";

import { useProjectFormContext } from "@/features/Project/context/project-context";

import styles from "./styles/sidebar.module.css";
import { Link } from "react-router-dom";
import { ProjectList } from "@/features/Project/components/ProjectList";

export const Sidebar: React.FC = () => {
    const { projectFormDispatch } = useProjectFormContext();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={styles.sidebar}>
            <ul>
                <li>
                    <Link to="/app/tasks/">All Tasks</Link>
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
                <ProjectList />
            </div>
        </div>
    );
}

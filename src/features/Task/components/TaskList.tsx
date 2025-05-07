import React from "react";

import styles from "../styles/task.module.css";
import { useTaskContext } from "../context/task-context";
import { Project, useProjectContext } from "@/features/Project/context/project-context";
import { useParams } from "react-router-dom";
import { firestore } from "@/lib/firebase/firestore/firestore";

const createTaskPropertiesContents = (properties: TaskProperties, projects: Project[]) => {
    return Object.keys(properties).map((propertyKey, index) => {
        const value = properties[propertyKey as keyof typeof properties];
        if (value === null) {
            return null;
        }
        if (propertyKey === "project_id") {
            const project = projects.find(project => project.id === value);
            if (project === undefined) {
                return null;
            }
            return <span key={index}>{project.name}</span>;
        };
        return <span key={index}>{value}</span>;
    });
};

const filterTasks = (tasks: Task[], projectId: string | undefined) => {
    if (projectId === undefined) {
        return tasks;
    }
    return tasks.filter(task => task.properties.project_id === projectId);
}

export const TaskList: React.FC = () => {
    const { tasks, taskDispatch } = useTaskContext();
    const { projects } = useProjectContext();

    const { projectId } = useParams();

    if (tasks === null) {
        return <div>Loading...</div>;
    }

    const filterdTasks = filterTasks(tasks, projectId);

    return (
        <div className={styles.taskListContainer}>
            <div className={styles.taskList}>
                {filterdTasks.filter(task => task.done === false).map((task) => (
                    <div key={task.id} className={styles["task-card"]}>
                        <div className={styles["task-title"]}>
                            <input
                                type="checkbox"
                                defaultChecked={task.done}
                                onChange={async () => {
                                    await firestore.update(
                                        "tasks",
                                        task.id as string,
                                        { dane: !task.done, completedAt: new Date().getTime() }
                                    );
                                    taskDispatch({ type: "update", payload: { ...task, done: !task.done } });
                                }}
                            />
                            <label>{task.title}</label>
                        </div>
                        <div key={task.id} className={styles["task-properties"]}>
                            {createTaskPropertiesContents(task.properties, projects)}
                            <span>{task.properties.startDate}</span>
                            <span>{task.properties.dueDate}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

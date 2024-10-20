import React from "react";

import { useAllTasks } from "../api/get-tasks";
import { CreateTask } from "./CreateTask";

import styles from "../styles/task.module.css";

const createTaskPropertiesContents = (properties: TaskProperties) => {
    return Object.keys(properties).map((propertyKey, index) => {
        const value = properties[propertyKey as keyof typeof properties];
        if (value === null) {
            return null;
        }
        if (typeof value === "object" && value !== null) {
            return <span id={index.toString()}>{value.name}</span>;
        }
        return <span id={index.toString()}>{value}</span>;
    });
};

export const TaskList: React.FC = () => {

    const { tasks, isLoading } = useAllTasks();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.taskListContainer}>
            <CreateTask />
            <div className={styles.taskList}>
                {tasks.map((task) => (
                    <div key={task.id} className={styles["task-card"]}>
                        <div className={styles["task-title"]}>
                            <input
                                type="checkbox"
                                defaultChecked={task.done}
                            />
                            <label>{task.title}</label>
                        </div>
                        <div className={styles["task-properties"]}>
                            {createTaskPropertiesContents(task.properties)}
                            <span>{task.startDate}</span>
                            <span>{task.dueDate}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

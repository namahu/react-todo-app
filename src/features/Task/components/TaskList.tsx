import React, { useContext } from "react";

import { CreateTask } from "./CreateTask";

import styles from "../styles/task.module.css";
import { TaskContext } from "../context/task-context";

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
    const task = useContext(TaskContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
    };

    if (task === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.taskListContainer}>
            <CreateTask />
            <div className={styles.taskList}>
                {task.filter(task => task.done === false).map((task) => (
                    <div key={task.id} className={styles["task-card"]}>
                        <div className={styles["task-title"]}>
                            <input
                                type="checkbox"
                                defaultChecked={task.done}
                                onChange={handleChange}
                            />
                            <label>{task.title}</label>
                        </div>
                        <div key={task.id} className={styles["task-properties"]}>
                            {createTaskPropertiesContents(task.properties)}
                            <span>{task.properties.startDate}</span>
                            <span>{task.properties.dueDate}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

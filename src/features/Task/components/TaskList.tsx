import React from "react";

import { CreateTask } from "./CreateTask";

import styles from "../styles/task.module.css";
import { useTaskContext } from "../context/task-context";
import { useUpdateTask } from "../api/update-task";

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
    const { tasks, dispatch } = useTaskContext();

    const updateTask = useUpdateTask;

    if (tasks === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.taskListContainer}>
            <CreateTask />
            <div className={styles.taskList}>
                {tasks.filter(task => task.done === false).map((task) => (
                    <div key={task.id} className={styles["task-card"]}>
                        <div className={styles["task-title"]}>
                            <input
                                type="checkbox"
                                defaultChecked={task.done}
                                onChange={async () => {
                                    const response = await updateTask(task.id, { done: !task.done });
                                    console.log(response);
                                    dispatch({ type: "update", payload: { ...task, done: !task.done } });
                                }}
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

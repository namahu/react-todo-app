import React from "react";
import { useAllTasks } from "../api/get-tasks";

import styles from "../styles/task.module.css";

export const TaskList: React.FC = () => {

    const { tasks, isLoading } = useAllTasks();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const taskCount = tasks?.filter(task => !task.done).length;
    const headingText = taskCount <= 1 ? "Task" : "Tasks";

    return (
        <div className="taskListContainer">
            <h2>Task List({taskCount} {headingText} remaining)</h2>
            <div>
                {tasks.map((task) => (
                    <div key={task.id} className={styles["task-card"]}>
                        <div className={styles["task-title"]}>
                            <input
                                type="checkbox"
                                defaultChecked={task.done}
                                id={task.id}
                            />
                            <label htmlFor={task.id}>{task.title}</label>
                        </div>
                        <div className={styles["task-attributes"]}>
                            <span>{task.startDate}</span>
                            <span>{task.dueDate}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

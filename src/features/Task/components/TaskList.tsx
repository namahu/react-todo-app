import React from "react";

import { Task } from "./Task";
import { useAllTasks } from "../api/get-tasks";


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
            <ul>
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </ul>
        </div>
    );
};

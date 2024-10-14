import React from "react";

import { Task, TaskProps } from "./Task";

type FetchedTask = Omit<TaskProps["task"], "updateTask">[];


export const TaskList: React.FC<{
    tasks: FetchedTask,
    updateTask: TaskProps["updateTask"],
}> = (props) => {

    const taskList = props.tasks?.filter(task => {
        return !task.deleted && !task.done;
    }).map(task => {
        return (
            <Task
                key={task.id}
                task={task}
                updateTask={props.updateTask}
            />
        );
    });

    const taskCount = props.tasks?.filter(task => !task.done).length;
    const headingText = taskCount <= 1 ? "Task" : "Tasks";

    return (
        <div className="taskListContainer">
            <h2>Task List({taskCount} {headingText} remaining)</h2>
            <ul>
                {taskList}
            </ul>
        </div>
    );
};

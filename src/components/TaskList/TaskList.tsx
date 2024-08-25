import React from "react";

import Task, { TaskProps } from "../Task/Task";

type FetchedTask = Omit<TaskProps, "updateTask">[];


const TaskList: React.FC<{
    tasks: FetchedTask,
    updateTask: TaskProps["updateTask"],
}> = (props) => {

    const taskList = props.tasks?.filter(task => {
        return !task.deleted && !task.done;
    }).map(task => {
        return (
            <Task
                key={task.id}
                id={task.id}
                title={task.title}
                done={task.done}
                deleted={task.deleted}
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

export default TaskList;

import React from "react";

import Task, { TaskProps } from "../Task/Task";

type FetchedTask = Omit<TaskProps, "deleteTask" | "toggleTaskCompleted">[];


const TaskList: React.FC<{
    tasks: FetchedTask,
    toggleTaskCompleted: (id: string) => void,
    deleteTask: (id: string) => void
}> = (props) => {

    const taskList = props.tasks?.map(task => {
        return (
            <Task
                key={task.id}
                id={task.id}
                title={task.title}
                done={task.done}
                deleted={task.deleted}
                toggleTaskCompleted={() => { props.toggleTaskCompleted(task.id) }}
                deleteTask={() => { props.deleteTask(task.id) }}
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

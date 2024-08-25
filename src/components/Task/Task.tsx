import React from "react";

export type TaskProps = {
    title: string;
    done: boolean;
    id: string;
    deleted: boolean;
    toggleTaskCompleted: (id: string) => void;
    deleteTask: (id: string) => void;
}

const Task: React.FC<TaskProps> = (props) => {
    return (
        <li>
            <input
                type="checkbox"
                defaultChecked={props.done}
                id={props.id}
                onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <span>{props.title}</span>
            <button onClick={() => props.deleteTask(props.id)}>Delete</button>
        </li>
    );
};

export default Task;

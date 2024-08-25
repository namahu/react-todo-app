import React, { useState } from "react";

export type TaskProps = {
    title: string;
    done: boolean;
    id: string;
    deleted: boolean;
    updateTask: (
        id: string, updateProperty: {
            key: string,
            value: string | boolean
        }
    ) => void;
}

const Task: React.FC<TaskProps> = (props) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const handleEdit = () => {
        props.updateTask(props.id, { key: "title", value: newTitle });
        setNewTitle("");
        setIsEditing(!isEditing);
    };

    const editingVew = (
        <div>
            <input
                type="text"
                defaultValue={props.title}
                onChange={(event) => setNewTitle(event.target.value)}
            />
            <button onClick={() => handleEdit()}>Save</button>
            <button onClick={() => setIsEditing(!isEditing)}>Cansel</button>
        </div>
    );

    const defaultView = (
        <li >
            <input
                type="checkbox"
                defaultChecked={props.done}
                id={props.id}
                onChange={() => props.updateTask(props.id, { key: "done", value: !props.done })}
            />
            <span>{props.title}</span>
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button onClick={() => props.updateTask(props.id, { key: "deleted", value: true })}>Delete</button>
        </li>
    );

    return isEditing ? editingVew : defaultView;
};

export default Task;

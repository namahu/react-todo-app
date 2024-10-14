import React from "react";

export type TaskProps = {
    task: {
        title: string;
        startDate: string;
        dueDate: string;
        done: boolean;
        id: string;
        deleted: boolean;
    };
};

export const Task: React.FC<TaskProps> = (props) => {

    const isEditing = false;
    // const [isEditing, setIsEditing] = useState(false);
    // const [newTitle, setNewTitle] = useState("");

    // const handleEdit = () => {
    //     setNewTitle("");
    //     setIsEditing(!isEditing);
    // };

    const editingVew = (
        <div>
            {/* <input
                type="text"
                defaultValue={props.task.title}
                onChange={(event) => setNewTitle(event.target.value)}
            />
            <button onClick={() => handleEdit()}>Save</button>
            <button onClick={() => setIsEditing(!isEditing)}>Cansel</button> */}
        </div>
    );

    const defaultView = (
        <li >
            <input
                type="checkbox"
                defaultChecked={props.task.done}
                id={props.task.id}
            />
            <span>{props.task.title}</span>
            <span>{props.task.startDate}</span>
            <span>{props.task.dueDate}</span>
            {/* <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button onClick={() => props.updateTask(props.task.id, { key: "deleted", value: true })}>Delete</button> */}
        </li>
    );

    return isEditing ? editingVew : defaultView;
};

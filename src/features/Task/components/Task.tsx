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

    const defaultView = (
        <div>
            <input
                type="checkbox"
                defaultChecked={props.task.done}
                id={props.task.id}
            />
            <span>{props.task.title}</span>
            <span>{props.task.startDate}</span>
            <span>{props.task.dueDate}</span>

        </div>
    );

    return defaultView;
};

declare type TaskProperties = {
    startDate: string;
    dueDate: string;
    project: {
        id: string;
        name: string;
    };
}

declare type Task = {
    title: string;
    startDate: string;
    dueDate: string;
    done: boolean;
    id: string;
    deleted: boolean;
    properties: TaskProperties
};

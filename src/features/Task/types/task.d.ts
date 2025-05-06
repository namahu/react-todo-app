declare type TaskProperties = {
    startDate: string;
    dueDate: string;
    project_id: string | null;
}

declare type Task = {
    title: string;
    description: string;
    done: boolean;
    id: string;
    deleted: boolean;
    createdAt: number | null;
    updatedAt: number | null;
    completedAt: number | null;
    deletedAt: number | null;
    user: {
        id: string | null;
    };
    properties: TaskProperties
};

import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";

export type Task = {
    title: string;
    startDate: string;
    dueDate: string;
    done: boolean;
    id: string;
    deleted: boolean;
    properties: {
        startDate: string;
        dueDate: string;
        project: {
            id: string;
            name: string;
        };
    };
};

export const useAllTasks = () => {
    const [ tasks, setTasks ] = useState<{
        tasks: Task[],
        isLoading: boolean;
    }>({ tasks: [], isLoading: true });

    useEffect(() => {
        let unmounted = false;

        const getTasks = async () => {
            const response = await api.get("tasks");
            setTasks({ tasks: response, isLoading: false });
        };

        if (!unmounted) {
            getTasks();
        }

        return () => {
            unmounted = true;
        };

    }, []);
    return tasks;
};


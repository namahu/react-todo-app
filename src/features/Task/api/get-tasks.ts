import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";

export const useAllTasks = () => {
    const [ tasks, setTasks ] = useState<{
        tasks: {
            title: string;
            startDate: string;
            dueDate: string;
            done: boolean;
            id: string;
            deleted: boolean;
        }[],
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


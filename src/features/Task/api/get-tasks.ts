import { api } from "@/lib/api-client";
import { useEffect, useReducer } from "react";
import { taskReducer } from "../reducer/task-reducer";

export const useAllTasks = () => {
    const [ tasks, dispatch ] = useReducer(taskReducer([]), []);

    useEffect(() => {
        let unmounted = false;

        const getTasks = async () => {
            try {
                const response = await api.get("tasks");
                dispatch({ type: "fetch-success", payload: response });
            } catch (error) {
                console.error(error);
            }
        };

        if (!unmounted) {
            getTasks();
        }

        return () => {
            unmounted = true;
        };

    }, []);
    return {tasks, dispatch};
};


import { useEffect, useReducer } from "react";
import { taskReducer } from "../reducer/task-reducer";
import { firestore } from "@/lib/firebase/firestore/firestore";

export const useAllTasks = (userId?: string) => {
    const [ tasks, dispatch ] = useReducer(taskReducer([]), []);

    useEffect(() => {
        let unmounted = false;

        const getTasks = async () => {
            if (!userId) {
                return;
            }
            try {
                const response = await firestore.getAll("tasks", userId);
                console.log(response);
                dispatch({ type: "fetch-success", payload: response as Task[] });
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


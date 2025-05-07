import React, { createContext, useContext } from "react";

import { useAllTasks } from "../api/get-tasks";
import { TaskDispatchAction } from "../reducer/task-reducer";
import { useFirebase } from "@/lib/firebase/context/firebsae-context";

const TaskContext = createContext<Task[] | null>(null);
const TaskDispatchContext = createContext<React.Dispatch<TaskDispatchAction>>(() => { });

export const TaskContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { state } = useFirebase();
    const { tasks, dispatch } = useAllTasks(state.user?.uid);

    return (
        <TaskContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );

};

export const useTaskContext = () => {
    const tasks = useContext(TaskContext);
    const taskDispatch = useContext(TaskDispatchContext);

    if (tasks === null || taskDispatch === null) {
        throw new Error("useTaskContext must be used within a TaskContextProvider");
    }

    return { tasks, taskDispatch };
}

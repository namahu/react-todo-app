import React, { createContext } from "react";

import { useAllTasks } from "../api/get-tasks";
import { TaskDispatchAction } from "../reducer/task-reducer";

export const TaskContext = createContext<Task[] | null>(null);
export const TaskDispatchContext = createContext<React.Dispatch<TaskDispatchAction>>(() => { });

export const TaskContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { tasks, dispatch } = useAllTasks();

    return (
        <TaskContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );

};

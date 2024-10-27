export type TaskDispatchAction = 
    | { type: "fetch-success", payload: Task[] }
    | { type: "add", payload: Task }
    | { type: "update", payload: Task }
    | { type: "delete", payload: Task };

export const taskReducer = (tasks: Task[]) => (
    state: Task[], action: TaskDispatchAction
): Task[] => {
    switch (action.type) {
        case "fetch-success": {
            return action.payload;
        }
        case "add":
            return [...state, action.payload];
        case "update":
            return state.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }
                return task;
            });
        case "delete":
            return state.filter(task => task.id !== action.payload.id);
        default:
            return tasks;
    }
};

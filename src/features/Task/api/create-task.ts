import { api } from "@/lib/api-client";
import { nanoid } from "nanoid";

export const useCreateTask = (data: Task): Promise<void> => {
    const id = "td-" + nanoid();
    const newTaskWithId = { ...data, id };
    return api.post("tasks", newTaskWithId);
};

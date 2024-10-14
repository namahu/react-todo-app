import { api } from "@/lib/api-client";

export const getTask = async (id: string) => {
    return await api.get(`/tasks/${id}`);
};

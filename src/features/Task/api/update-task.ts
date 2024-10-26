import { api } from "@/lib/api-client";

export const useUpdateTask = async (id: string, updateProperty: { [key: string]: string | boolean }) => {
    return await api.update(`tasks`, id, updateProperty);
};

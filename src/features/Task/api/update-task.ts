import { api } from "@/lib/api-client";

export const useUpdateTask = async <T>(id: string, updateProperty: T) => {
    return await api.update(`tasks`, id, updateProperty);
};

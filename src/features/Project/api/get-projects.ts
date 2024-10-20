import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";

export const useAllProjects = () => {
    const [ projects, setProjects ] = useState<{
        projects: { id: string, name: string, description: string, deleted: boolean}[],
        isLoading: boolean;
    }>({ projects: [], isLoading: true });

    useEffect(() => {
        let unmounted = false;

        const getProjects = async () => {
            const response = await api.get("projects");
            setProjects({ projects: response, isLoading: false });
        };

        if (!unmounted) {
            getProjects();
        }

        return () => {
            unmounted = true;
        };

    }, []);

    return projects;
    
};

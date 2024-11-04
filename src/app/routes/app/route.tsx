import { MainLayout } from "@/components/layouts/main-layout";
import { ProjectContextProvider } from "@/features/Project/context/project-context";
import { TaskContextProvider } from "@/features/Task/context/task-context";
import { Outlet } from "react-router-dom";

export const AppRoute = () => {
    return (
        <ProjectContextProvider>
            <TaskContextProvider>
                <MainLayout>
                    <Outlet />
                </MainLayout>
            </TaskContextProvider>
        </ProjectContextProvider>
    );
};

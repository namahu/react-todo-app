import { MainLayout } from "@/components/layouts/main-layout";
import { ProjectContextProvider } from "@/features/Project/context/project-context";
import { TaskContextProvider } from "@/features/Task/context/task-context";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "@/lib/firebase/context/firebsae-context";
export const AppRoute = () => {
    const { state } = useFirebase();

    if (state.loading) {
        return <div>Loading...</div>;
    }

    if (!state.user) {
        return <Navigate to="/login" />;
    }

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

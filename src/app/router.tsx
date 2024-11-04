import { TaskList } from "@/features/Task/components/TaskList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoute } from "./routes/app/route";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: (
                <AppRoute />
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <TaskList />
                    ),
                },
                {
                    path: "/tasks/:projectId",
                    element: (
                        <TaskList />
                    ),
                }
            ]
        },
    ]
);

export const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};

import { TaskList } from "@/features/Task/components/TaskList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoute } from "./routes/app/route";
import { LoginRoute } from "./routes/auth/login/login";

const router = createBrowserRouter(
    [
        {
            path: "/login",
            element: (<LoginRoute />)

        },
        {
            path: "/app",
            element: (<AppRoute />),
            children: [
                { path: "/app", element: <TaskList /> },
                { path: "/app/tasks", element: <TaskList /> },
                { path: "/app/tasks/:projectId", element: <TaskList /> }
            ]
        },
    ]
);

export const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};

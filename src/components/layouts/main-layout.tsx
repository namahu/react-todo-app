import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { CreateProject } from "@/features/Project/components/CreateProject";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Sidebar />
            <main>
                <CreateProject />
                {children}
            </main>
        </>
    );

};

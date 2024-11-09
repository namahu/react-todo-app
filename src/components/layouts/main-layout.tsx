import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { CreateProject } from "@/features/Project/components/CreateProject";
import { Header } from "../Header/Header";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Sidebar />
            <Header />
            <main>
                <CreateProject />
                {children}
            </main>
        </>
    );

};

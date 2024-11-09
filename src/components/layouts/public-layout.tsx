import React from "react";

type LayoutProps = {
    children: React.ReactNode;
    title: string;
}

export const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >{children}</div>
    );
};

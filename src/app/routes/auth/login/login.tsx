import { PublicLayout } from "@/components/layouts/public-layout";
import { LoginForm } from "@/features/auth/components/login";
import React from "react";

export const LoginRoute: React.FC = () => {
    return (
        <PublicLayout title="Login">
            <LoginForm />
        </PublicLayout>
    );
};

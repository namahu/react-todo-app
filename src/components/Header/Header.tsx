import React from 'react';

import styles from "./styles/header.module.css";
import { CreateTask } from '@/features/Task/components/CreateTask';
import { Button } from '../ui/button/button';
import { signOut } from 'firebase/auth';
import { useFirebase } from '@/lib/firebase/context/firebsae-context';
import { useNavigate } from 'react-router';

export const Header: React.FC = () => {
    const { auth } = useFirebase();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <header className={styles.header}>
            <div className={styles["header-menu"]}>
                <Button onClick={handleLogout}>ログアウト</Button>
                <CreateTask />
            </div>
        </header>
    );
};

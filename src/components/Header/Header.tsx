import React from 'react';

import styles from "./styles/header.module.css";
import { CreateTask } from '@/features/Task/components/CreateTask';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles["header-menu"]}>
                <CreateTask />
            </div>
        </header>
    );
};

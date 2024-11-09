import React from "react";

import styles from "../styles/login.module.css";

export const LoginForm = () => {
    return (
        <div className={styles["loginForm-container"]}>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { useFirebase } from "@/lib/firebase/context/firebsae-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { auth } = useFirebase();
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/app");
        } catch (error) {
            setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
        }
    };

    return (
        <div className={styles["loginForm-container"]}>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};

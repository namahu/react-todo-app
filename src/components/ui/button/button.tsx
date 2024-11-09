import React from 'react';

import styles from "./button.module.css";

type ButtonProps = {
    onClick?: () => void;
    className?: "button-safety" | "button-warning";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button
            className={styles[props.className || "button-default"]}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

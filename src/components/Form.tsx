import React, { useState } from "react";

type FormProps = {
    onSubmit: (taskName: string) => void;
};


const Form: React.FC<FormProps> = (props) => {
    const [name, setName] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (name === "") {
            window.alert("Task name is required");
            return;
        }

        props.onSubmit(name);
        setName("");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <div className="taskCreateContainer">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="formItem">
                    <input
                        type="text"
                        name="taskName"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="formItem">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
};

export default Form;

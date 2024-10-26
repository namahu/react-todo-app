import React, { useState } from "react";

import { useCreateTask } from "../api/create-task";
import { useAllProjects } from "@/features/Project/api/get-projects";

import styles from "../styles/createTask.module.css";

const initialTask = {
    title: "",
    description: "",
    done: false,
    id: "",
    deleted: false,
    properties: {
        startDate: "",
        dueDate: "",
        project: {
            id: "",
            name: "",
        },
    },
};



export const CreateTask: React.FC = () => {
    const { projects, isLoading } = useAllProjects();

    const [newTask, setNewTask] = useState<Task>(initialTask);
    const [isOpen, setIsOpen] = useState(false);

    const handleOnChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, nodeName, attributes } = event.target;
        if (nodeName === "SELECT") {
            setNewTask({
                ...newTask,
                properties: {
                    ...newTask.properties,
                    project: {
                        id: value,
                        name: projects.find((project) => project.id === value)?.name || "",
                    },
                },
            });
            return;
        }
        if (Array.from(attributes).find((attr) => attr.name === "type")?.value.includes("date")) {
            setNewTask({
                ...newTask,
                properties: {
                    ...newTask.properties,
                    [name]: value,
                },
            });
            return;
        }
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    const handleOnSubmit = useCreateTask;

    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(!isOpen)}>Add Task</button>
        );
    }

    return (
        <div className={styles.createTaskContainer}>
            <form onSubmit={() => { handleOnSubmit(newTask) }} className={styles.taskCreateForm}>
                <div className={styles.mainPropertiesContainer}>
                    <input type="text" name="title" placeholder="Task name" value={newTask.title}
                        onChange={handleOnChange}
                    />
                    <textarea name="description" placeholder="Description" value={newTask.description}
                        onChange={handleOnChange}
                    />
                </div>

                <div className={styles.optionPropertiesContainer}>
                    <div className={styles.formItem}>
                        <label>Due Date</label>
                        <input type="date" name="dueDate" placeholder="Task name" value={newTask.properties.dueDate}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Project</label>
                        <select name="project" onChange={handleOnChange}>
                            {isLoading
                                ? <option>loading...</option>
                                : projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className={styles.formButtonContainer}>
                    <button type="button" className={styles.button_cancel} onClick={() => setIsOpen(!isOpen)}>Cancel</button>
                    <button type="submit" className={styles.button_submit}>Add Task</button>
                </div>
            </form>
        </div>
    );
};

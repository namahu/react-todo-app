import React, { useState } from "react";

import { useCreateTask } from "../api/create-task";

import styles from "../styles/createTask.module.css";
import { useTaskContext } from "../context/task-context";
import { useProjectContext } from "@/features/Project/context/project-context";

const initialTask: Task = {
    title: "",
    description: "",
    done: false,
    id: "",
    deleted: false,
    createdAt: null,
    updatedAt: null,
    completedAt: null,
    deletedAt: null,
    properties: {
        startDate: "",
        dueDate: "",
        project_id: null,
    },
};

export const CreateTask: React.FC = () => {
    const { taskDispatch } = useTaskContext();
    const { projects } = useProjectContext();

    const [task, setTask] = useState<Task>(initialTask);
    const [isOpen, setIsOpen] = useState(false);

    const handleOnSubmit = useCreateTask;

    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(!isOpen)}>Add Task</button>
        );
    }

    return (
        <>
            <button disabled>Add Task</button>
            <div className={styles.createTaskContainer}>
                <form
                    className={styles.taskCreateForm}
                    onSubmit={async (event) => {
                        event.preventDefault();
                        const newTask: Task = { ...task, createdAt: new Date().getTime() };
                        await handleOnSubmit(newTask);
                        taskDispatch({ type: "add", payload: newTask });
                        setTask(initialTask);
                        setIsOpen(!isOpen);
                    }}
                >
                    <div className={styles.mainPropertiesContainer}>
                        <input type="text" name="title" placeholder="Task name" value={task.title}
                            onChange={({ target }) => setTask({ ...task, title: target.value })}
                        />
                        <textarea name="description" placeholder="Description" value={task.description}
                            onChange={({ target }) => setTask({ ...task, description: target.value })}
                        />
                    </div>

                    <div className={styles.optionPropertiesContainer}>
                        <div className={styles.formItem}>
                            <label>Due Date</label>
                            <input type="date" name="dueDate" placeholder="Task name" value={task.properties.dueDate}
                                onChange={({ target }) => setTask({ ...task, properties: { ...task.properties, dueDate: target.value } })}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <label>Project</label>
                            <select name="project" onChange={
                                ({ target }) =>
                                    setTask({
                                        ...task,
                                        properties: {
                                            ...task.properties,
                                            project_id: target.value === "" ? null : target.value,
                                        }
                                    })
                            }>
                                <option value="">Select a project</option>
                                {projects === null
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
        </>
    );
};

import React, { useEffect, useState } from "react";

type FormProps = {
    onSubmit: (taskData: NewTask) => void;
};

export type NewTask = {
    title: string;
    startDate: string;
    dueDate: string;
};

type Project = {
    id: number;
    name: string;
    description: string;
    deleted: boolean;
};


const Form: React.FC<FormProps> = (props) => {

    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        const getProjects = async () => {
            const response = await fetch("http://localhost:3000/projects");
            const fetchedProjects = await response.json();
            setProjects(fetchedProjects);
        };
        getProjects();
    }, []);

    const projectOptions = projects.map((project) => {
        return (
            <option key={project.id} value={project.id}>
                {project.name}
            </option>
        );
    });

    const initialTaskData = {
        title: "",
        startDate: "",
        dueDate: "",
    };
    const [taskData, setTaskData] = useState<NewTask>(initialTaskData);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (taskData.title === "") {
            window.alert("Task title is required");
            return;
        }

        props.onSubmit(taskData);
        setTaskData(initialTaskData);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTaskData({ ...taskData, [name]: value });
    };

    return (
        <div className="taskCreateContainer">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="formItem">
                    <label htmlFor="title">Task Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="formItem">
                    <label htmlFor="startDate">Start date</label>
                    <input
                        type="datetime-local"
                        id="startDate"
                        name="startDate"
                        value={taskData.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="formItem">
                    <label htmlFor="dueDate">Due date</label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="formItem">
                    <label htmlFor="project">Project</label>
                    <select>
                        {projectOptions}
                    </select>
                </div>
                <div className="formItem">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
};

export default Form;

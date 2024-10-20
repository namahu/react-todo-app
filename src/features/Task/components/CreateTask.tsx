import React from "react";

export const CreateTask: React.FC = () => {
    return (
        <div>
            <button>Add Task</button>
            <form>
                <label>
                    Title:
                    <input type="text" name="title" />
                </label>
                <label>
                    Start Date:
                    <input type="date" name="startDate" />
                </label>
                <label>
                    Due Date:
                    <input type="date" name="dueDate" />
                </label>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

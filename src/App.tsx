import React, { useEffect, useState } from 'react';
import { nanoid } from "nanoid";

import TaskList from './components/TaskList/TaskList';
import { TaskProps } from './components/Task/Task';
import Form, { NewTask } from './components/Form'

import './App.css'

type FetchedTask = Omit<TaskProps["task"], "updateTask">[];

const App: React.FC = () => {

  const [tasks, setTasks] = useState<FetchedTask>([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
    };
    getTasks();
  }, []);

  const addTask = async (taskData: NewTask) => {
    const newTask = {
      id: `todo-${nanoid()}`,
      title: taskData.title,
      startDate: taskData.startDate,
      dueDate: taskData.dueDate,
      done: false,
      deleted: false
    };
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });
    if (!response.ok) {
      window.alert("Failed to add task");
      return;
    }
    setTasks([...tasks, newTask]);
  };

  const updateTask = (
    id: string,
    updateProperty: {
      key: string,
      value: string | boolean
    }
  ) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, [updateProperty.key]: updateProperty.value };
      }
      return task;
    });
    setTasks(updatedTasks);

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ [updateProperty.key]: updateProperty.value })
    });
  };

  return (
    <>
      <h1 className="title">Todo App sample</h1>
      <main>
        <Form onSubmit={addTask} />
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
        />
      </main>
    </>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import { nanoid } from "nanoid";

import TaskList from './components/TaskList/TaskList';
import { TaskProps } from './components/Task/Task';
import Form from './components/Form'

import './App.css'

type FetchedTask = Omit<TaskProps, "deleteTask" | "toggleTaskCompleted">[];

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

  const addTask = async (taskName: string) => {
    const newTask = { id: `todo-${nanoid()}`, title: taskName, done: false, deleted: false };
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

  const toggleTaskCompleted = (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  };

  return (
    <>
      <h1 className="title">Todo App sample</h1>
      <main>
        <Form onSubmit={addTask} />
        <TaskList
          tasks={tasks}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
        />
      </main>
    </>
  )
}

export default App

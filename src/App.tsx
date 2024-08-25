import React, { useEffect, useState } from 'react';
import { nanoid } from "nanoid";
import Todo, { TodoProps } from './components/Todo'
import Form from './components/Form'

import './App.css'

type AppProps = {
  tasks: Omit<TodoProps, "deleteTask" | "toggleTaskCompleted">[];
};

type FetchedTask = Omit<TodoProps, "deleteTask" | "toggleTaskCompleted">[];

const App: React.FC<AppProps> = (props) => {

  const [tasks, setTasks] = useState<FetchedTask>(props.tasks);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
    };
    getTasks();
  }, []);

  const addTask = (taskName: string) => {
    const newTask = { id: `todo-${nanoid()}`, title: taskName, done: false, deleted: false };
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

  const taskList = tasks?.map(task => {
    return (
      <Todo
        title={task.title}
        done={task.done}
        id={task.id}
        deleted={task.deleted}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
      />
    );
  });

  const taskCount = tasks?.filter(task => !task.done).length;
  const headingText = taskCount <= 1 ? "Task" : "Tasks";

  return (
    <>
      <h1 className="title">Todo App sample</h1>
      <main>
        <Form onSubmit={addTask} />
        <div className="taskListContainer">
          <h2>Task List ({taskCount} {headingText} remaining )</h2>
          <ul>
            {taskList}
          </ul>
        </div>
      </main>
    </>
  )
}

export default App

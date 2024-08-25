import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodoProps } from './components/Todo.tsx';

const TASK_DATA: Omit<TodoProps, "deleteTask" | "toggleTaskCompleted">[] = [
  { title: 'task 1', done: true, id: 'todo-0', deleted: false },
  { title: 'task 2', done: false, id: 'todo-1', deleted: false },
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App tasks={TASK_DATA} />
  </StrictMode>,
)

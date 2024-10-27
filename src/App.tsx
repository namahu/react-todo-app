import React from 'react';

import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskList } from "@/features/Task/components/TaskList";

import './App.css'

import { TaskContextProvider } from "@/features/Task/context/task-context";

const App: React.FC = () => {
  return (
    <>
      <Sidebar />
      <main>
        <TaskContextProvider>
          <TaskList />
        </TaskContextProvider>
      </main >
    </>
  )
}

export default App

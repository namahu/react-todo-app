import React from 'react';

import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskList } from "@/features/Task/components/TaskList";

import './App.css'

import { TaskContextProvider } from "@/features/Task/context/task-context";
import { ProjectContextProvider } from './features/Project/context/project-context';

const App: React.FC = () => {
  return (
    <ProjectContextProvider>
      <Sidebar />
      <main>
        <TaskContextProvider>
          <TaskList />
        </TaskContextProvider>
      </main >
    </ProjectContextProvider>
  )
}

export default App

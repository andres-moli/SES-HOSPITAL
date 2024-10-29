import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from 'react-native-toast-message';

export interface Task {
  id: string;
  title: string;
  createdAt: Date
}

interface TasksContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
  editTask: (id: string, newTitle: string) => void;
  removeTask: (id: string) => void;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = { id: Date.now().toString(), title, createdAt: new Date() };
    setTasks([...tasks, newTask]);
    Toast.show({ type: 'success', text1: 'Tarea agregada con éxito' });
  };
  
  const editTask = (id: string, newTitle: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: newTitle } : task)));
    Toast.show({ type: 'success', text1: 'Tarea editada con éxito' });
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    Toast.show({ type: 'success', text1: 'Tarea eliminada con éxito' });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextProps => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks debe ser usado dentro de un TasksProvider');
  }
  return context;
};

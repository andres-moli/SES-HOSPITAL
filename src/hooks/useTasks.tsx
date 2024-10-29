import { useState } from 'react';
import { Task } from '../context/TasksContext';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = { id: Date.now().toString(), title, createdAt: new Date() };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id: string, newTitle: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: newTitle } : task)));
  };

  return { tasks, addTask, removeTask, updateTask };
};

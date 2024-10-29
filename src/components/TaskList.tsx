import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TasksContext';

interface TaskListProps {
  onEdit: (id: string, title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const { tasks, removeTask } = useTasks();

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem task={item} onRemove={removeTask} onEdit={onEdit} />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
});

export default TaskList;

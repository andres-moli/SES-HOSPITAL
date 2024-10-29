import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Keyboard
} from 'react-native';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TasksContext';
import colors from '../theme/colors';
import Toast from 'react-native-toast-message';

const HomeScreen: React.FC = () => {
  const { addTask, editTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const handleAddOrEditTask = () => {
    if (!newTaskTitle.trim()) return;

    if (editingTaskId) {
      editTask(editingTaskId, newTaskTitle);
      setEditingTaskId(null);
    } else {
      addTask(newTaskTitle);
    }
    setNewTaskTitle('');
    Keyboard.dismiss()
  };

  const handleEditTask = (id: string, title: string) => {
    setEditingTaskId(id);
    setNewTaskTitle(title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestor de Tareas</Text>
      <TextInput
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        placeholder="Escribe una nueva tarea..."
        style={styles.input}
        onBlur={()=> Keyboard.dismiss()}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddOrEditTask}>
        <Text style={styles.buttonText}>
          {editingTaskId ? 'Guardar Cambios' : 'Agregar Tarea'}
        </Text>
      </TouchableOpacity>
      <TaskList onEdit={handleEditTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;

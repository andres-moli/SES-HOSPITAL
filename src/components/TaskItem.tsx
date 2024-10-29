import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../context/TasksContext';
import { Edit, Trash } from 'lucide-react-native'; // Icons
import colors from '../theme/colors'; // Colores globales
import dayjs from 'dayjs';

interface TaskItemProps {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onRemove, onEdit }) => {
  const date = dayjs(task.createdAt).format('DD-MM-YY HH:mm');
  const [showFullTitle, setShowFullTitle] = useState(false);

  const toggleTitle = () => {
    setShowFullTitle(prev => !prev);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
    >
      <View style={styles.leftBar} />

      {/* Contenido de la tarjeta */}
      <View style={styles.cardContent}>
        {showFullTitle || task.title.length <= 25 ? (
          <Text style={styles.title}>{task.title}</Text>
        ) : (
          <>
            <Text style={styles.title}>
              {task.title.slice(0, 25)}...
            </Text>
            <TouchableOpacity onPress={toggleTitle}>
              <Text style={styles.showMore}>Ver más</Text>
            </TouchableOpacity>
          </>
        )}
        {showFullTitle && (
          <TouchableOpacity onPress={toggleTitle}>
            <Text style={styles.showLess}>Ver menos</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.date}>Creado el {date}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task.id, task.title)}>
          <Edit color={colors.primary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRemove(task.id)}>
          <Trash color={colors.danger} size={24} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
    overflow: 'hidden',
  },
  leftBar: {
    width: 5,
    backgroundColor: colors.primary,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 12,
  },
  showMore: {
    color: colors.primary,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
  showLess: {
    color: colors.primary,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});

export default TaskItem;

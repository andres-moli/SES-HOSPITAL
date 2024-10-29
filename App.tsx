import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { TasksProvider } from './src/context/TasksContext';
import Toast from 'react-native-toast-message';
const App: React.FC = () => (
  <TasksProvider>
    <SafeAreaView style={styles.container}>
      <HomeScreen />
      <Toast />
    </SafeAreaView>
  </TasksProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

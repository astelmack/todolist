import { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { TodoList } from './TodoList';
import { useAuthentication } from '../hooks/useAuthentication';

export function TodoApp() {
  const isDarkMode = useColorScheme() === 'dark';
  const auth = useAuthentication();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      (async () => {
        await auth.authenticate();
      })();
    }
  }, [auth]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>To Do List</Text>
      <View style={styles.content}>
        <TodoList />
      </View>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'dark' : 'light'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    gap: 8,
  },
  heading: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
  },
});

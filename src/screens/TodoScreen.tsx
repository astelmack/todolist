import { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';

import { TodoList } from '../features/TodoList';
import { useAuthentication } from '../hooks/useAuthentication';
import { styles } from './TodoScreen.styles';

export function TodoScreen() {
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
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View style={styles.margins}>
        <Text style={styles.heading}>To Do List</Text>
        <View style={styles.content}>
          <TodoList />
        </View>
      </View>
    </SafeAreaView>
  );
}

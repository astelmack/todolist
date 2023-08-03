import { Text, View } from 'react-native';

import { styles } from './EmptyTodoList.styles';

export function EmptyTodoList() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No Open To Do Items</Text>
    </View>
  );
}

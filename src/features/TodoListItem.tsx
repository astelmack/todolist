import { Text, View } from 'react-native';

import { styles } from './TodoListItem.styles';
import type { ToDoItem } from '../contexts/TodoListContext.types';

export function TodoListItem({ title, description }: ToDoItem) {
  return (
    <View style={styles.container}>
      <Text style={styles.row}>
        <Text style={styles.heading}>Title:</Text>
        <Text>{title}</Text>
      </Text>
      {description ? (
        <Text style={styles.row}>
          <Text style={styles.heading}>Description:</Text>
          <Text>{description}</Text>
        </Text>
      ) : undefined}
    </View>
  );
}

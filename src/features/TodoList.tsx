import { FlashList } from '@shopify/flash-list';
import { Text } from 'react-native';

import { EmptyTodoList } from './EmptyTodoList';
import { TodoListItem } from './TodoListItem';
import { useTodoList } from '../hooks/useTodoList';
import { styles } from './TodoList.styles';

export function TodoList() {
  const {
    state: { loading, todoList },
  } = useTodoList();

  return loading ? (
    <Text style={styles.loadingMessage}>Loading...</Text>
  ) : (
    <FlashList
      data={todoList}
      renderItem={({ item }) => <TodoListItem {...item} />}
      ListEmptyComponent={EmptyTodoList}
      estimatedItemSize={5}
    />
  );
}

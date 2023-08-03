import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';

import { AddButton } from '../components/AddButton';
import { useTodoList } from '../hooks/useTodoList';
import { EmptyTodoList } from './EmptyTodoList';
import { styles } from './TodoList.styles';
import type { ModalState } from './TodoList.types';
import { TodoListItem } from './TodoListItem';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { TodoItemForm } from './TodoItemForm';
import { Divider } from '../components/Divider';

export function TodoList() {
  const {
    state: { loading, todoList },
    removeItem,
    updateItem,
  } = useTodoList();
  const [modalState, setModalState] = useState<ModalState | undefined>();

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingMessage}>Loading...</Text>
      ) : (
        <>
          <Modal visible={!!modalState} onRequestClose={() => setModalState(undefined)}>
            {modalState ? (
              <TodoItemForm
                todoItem={modalState.mode === 'edit' ? modalState.item : undefined}
                onSubmit={() => setModalState(undefined)}
              />
            ) : undefined}
          </Modal>
          <View style={styles.controls}>
            <AddButton disabled={loading} onPress={() => setModalState({ mode: 'add' })}>
              Add Item
            </AddButton>
          </View>
          <FlashList
            data={todoList}
            renderItem={({ item }) => (
              <TodoListItem
                {...item}
                key={item.id}
                onCompletePress={() => updateItem({ ...item, complete: !item.complete })}
                onEditPress={() => setModalState({ mode: 'edit', item: item })}
                onDeletePress={() => removeItem(item)}
              />
            )}
            ListEmptyComponent={EmptyTodoList}
            ItemSeparatorComponent={Divider}
            estimatedItemSize={5}
          />
        </>
      )}
    </View>
  );
}

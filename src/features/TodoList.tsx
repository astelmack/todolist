import { MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AddButton } from '../components/AddButton';
import { Divider } from '../components/Divider';
import { Modal } from '../components/Modal';
import { useAuthentication } from '../hooks/useAuthentication';
import { useTodoList } from '../hooks/useTodoList';
import { EmptyTodoList } from './EmptyTodoList';
import { styles } from './TodoList.styles';
import type { ModalState } from './TodoList.types';
import { TodoItemForm } from './TodoItemForm';
import { TodoListItem } from './TodoListItem';

export function TodoList() {
  const auth = useAuthentication();
  const {
    state: { loading, todoList },
    removeItem,
    updateItem,
  } = useTodoList();
  const [modalState, setModalState] = useState<ModalState | undefined>();
  const [showCompleted, setShowCompleted] = useState(true);

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
            <AddButton
              disabled={!auth.isAuthenticated || loading}
              onPress={() => setModalState({ mode: 'add' })}>
              Add Item
            </AddButton>
            <MaterialIcons.Button
              name={showCompleted ? 'check-box' : 'check-box-outline-blank'}
              backgroundColor="transparent"
              iconStyle={StyleSheet.flatten(
                StyleSheet.compose(
                  styles.checkboxIcon,
                  !auth.isAuthenticated || loading ? styles.checkboxDisabled : undefined
                )
              )}
              onPress={() => setShowCompleted((current) => !current)}>
              <Text
                style={[
                  styles.checkboxLabel,
                  !auth.isAuthenticated || loading ? styles.checkboxDisabled : undefined,
                ]}>
                Show Completed
              </Text>
            </MaterialIcons.Button>
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

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { TodoListContext } from '../contexts/TodoListContext';
import type {
  TodoListContextType,
  TodoListState,
  ToDoItem,
} from '../contexts/TodoListContext.types';
import { useAuthentication } from '../hooks/useAuthentication';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function TodoListProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthentication();
  const { loadItems, saveItems } = useLocalStorage();
  const [state, setState] = useState<TodoListState>({
    loading: false,
    todoList: [],
  });

  // On render or on authentication state change, we will load the last state of the list from storage
  useEffect(() => {
    let isCancelled = false;
    if (isAuthenticated) {
      setState((currentState) => ({ ...currentState, loading: true }));
      (async () => {
        try {
          const items = await loadItems();
          if (!isCancelled) {
            setState({ loading: false, todoList: items });
          }
        } catch (e) {
          console.warn('Failed to load state of todo list from local storage', e);
          if (!isCancelled) {
            setState((currentState) => ({ ...currentState, loading: false }));
          }
        }
      })();
    }
    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, loadItems]);

  // Ensure that changes in the list are written to local storage
  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          await saveItems(state.todoList);
        } catch (e) {
          console.warn('Failed to save state of todo list to local storage', e);
        }
      })();
    }
    return () => {
      if (isAuthenticated) {
        (async () => {
          try {
            await saveItems(state.todoList);
          } catch (e) {
            console.warn('Failed to save state of todo list to local storage', e);
          }
        })();
      }
    };
  }, [isAuthenticated, saveItems, state.todoList]);

  const addItem = useCallback((item: ToDoItem) => {
    setState((currentState) => {
      return { ...currentState, todoList: [...currentState.todoList, item] };
    });
    return item;
  }, []);

  const removeItem = useCallback((item: ToDoItem) => {
    setState((currentState) => {
      return {
        ...currentState,
        todoList: [...currentState.todoList].filter((currentItem) => currentItem.id !== item.id),
      };
    });
    return item;
  }, []);

  const updateItem = useCallback((item: ToDoItem) => {
    setState((currentState) => {
      return {
        ...currentState,
        todoList: currentState.todoList.map((currentItem) => {
          if (currentItem.id === item.id) {
            return item;
          }
          return currentItem;
        }),
      };
    });
    return item;
  }, []);

  const value = useMemo(
    (): TodoListContextType => ({
      state,
      addItem,
      removeItem,
      updateItem,
    }),
    [addItem, removeItem, state, updateItem]
  );
  return <TodoListContext.Provider value={value}>{children}</TodoListContext.Provider>;
}

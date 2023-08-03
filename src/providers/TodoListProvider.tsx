import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { TodoListContext } from '../contexts/TodoListContext';
import type {
  TodoListContextType,
  TodoListState,
  ToDoItem,
} from '../contexts/TodoListContext.types';
import { useAuthentication } from '../hooks/useAuthentication';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * This provider manages the state of the TodoListContext.
 * Handles modifications to the list and keeps a record of the current state for use in the list screen.
 * Provides methods for updating the state, and will observe state changes for synchronizing he changes to the local storage.
 *
 * Opted for this route over something heaver given the amount of state that is being managed is very small and only really used across
 * two or three components.  It does the job well enough for the small amount of state that is being managed here.
 *
 * @param children
 * @constructor
 */
export function TodoListProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthentication();
  const { loadItems, saveItems } = useLocalStorage();
  // Manage the state as a single object so that we can update as much of the state at once
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

  useEffect(() => {
    // This useEffect is responsible for keeping an eye on todolist state changes and syncing them out to local storage
    if (isAuthenticated) {
      (async () => {
        try {
          await saveItems(state.todoList);
        } catch (e) {
          console.warn('Failed to save state of todo list to local storage', e);
        }
      })();
    }

    // Do a final sync on cleanup to ensure we always have the last state.
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

  // The add, remove, and change methods only operate on the todolist in state, so they don't need to worry about syncing to local storage.
  // This way syncing to local storage can be fully kept asynchronous to UI interactions
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

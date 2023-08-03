import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { TodoListContext } from '../contexts/TodoListContext';
import type {
  TodoListContextType,
  TodoListState,
  ToDoItem,
} from '../contexts/TodoListContext.types';
import { useAuthentication } from '../hooks/useAuthentication';
import { useLocalStorage } from '../hooks/useLocalStorage';

function itemsMatch(a: ToDoItem, b: ToDoItem) {
  const titleMatches = a.title === b.title;
  const descriptionMatches = a.description === b.description;
  return titleMatches && descriptionMatches;
}

export function TodoListProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthentication();
  const { loadItems } = useLocalStorage();
  const [state, setState] = useState<TodoListState>({
    loading: false,
    todoList: [],
  });

  useEffect(() => {
    let isCancelled = false;
    if (isAuthenticated) {
      setState((currentState) => ({ ...currentState, loading: true }));
      (async () => {
        const items = await loadItems();
        if (!isCancelled) {
          setState({ loading: false, todoList: items });
        }
      })();
    }
    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, loadItems]);

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
        todoList: [...currentState.todoList].filter(
          (currentItem) => !itemsMatch(currentItem, item)
        ),
      };
    });
    return item;
  }, []);

  const value = useMemo(
    (): TodoListContextType => ({
      state,
      addItem,
      removeItem,
    }),
    [addItem, removeItem, state]
  );
  return <TodoListContext.Provider value={value}>{children}</TodoListContext.Provider>;
}

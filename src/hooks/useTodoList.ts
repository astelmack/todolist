import { useContext } from 'react';

import { TodoListContext } from '../contexts/TodoListContext';

export function useTodoList() {
  const context = useContext(TodoListContext);

  if (!context) {
    throw new Error('Using TodoListContext outside of TodoListContext.Provider');
  }

  return context;
}

import { createContext } from 'react';

import type { TodoListContextType } from './TodoListContext.types';

export const TodoListContext = createContext<TodoListContextType>({
  state: {
    loading: false,
    todoList: [],
  },
  addItem() {
    throw new Error('Attempting to use TodoListContext outside of an TodoListContext.Provider');
  },
  removeItem() {
    throw new Error('Attempting to use TodoListContext outside of an TodoListContext.Provider');
  },
  updateItem() {
    throw new Error('Attempting to use TodoListContext outside of an TodoListContext.Provider');
  },
});

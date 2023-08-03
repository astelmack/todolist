import { ToDoItem } from '../contexts/TodoListContext.types';
import { useMemo } from 'react';

export function useLocalStorage() {
  // TODO: This is a stub for now, but should pull from async-local-storage
  async function loadItems(): Promise<ToDoItem[]> {
    // Pull from local storage
    // JSON parse to object
    return Promise.resolve([
      {
        title: 'Mock Item',
        description: 'This is a mock To Do List item',
      },
    ]);
  }

  async function saveItems(_: ToDoItem[]): Promise<void> {
    // JSON stringify
    // Send to async-local-storage
    return Promise.resolve();
  }

  return useMemo(() => ({ loadItems, saveItems }), []);
}

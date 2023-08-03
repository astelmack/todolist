import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

import type { ToDoItem } from '../contexts/TodoListContext.types';

export const ASYNC_STORAGE_KEY = 'todolist';

/**
 * Simple typeguard to check that the information read from local storage is in fact an array of to-do list items.
 * Could be expanded to include other fields like id and completed given those are required as well.
 * @param a parsed JSON object from local storage
 */
export function isTodoList(a: object[]): a is ToDoItem[] {
  if (!Array.isArray(a)) {
    return false;
  }

  return !a.some((v) => !('title' in v));
}

/**
 * useLocalStorage hook.  Just provides some methods for interacting with Async Local Storage in the context of
 * the to-do list items.
 *
 * Arguably, this could probably just be changed to two utility methods I think.
 */
export function useLocalStorage() {
  const loadItems = useCallback(async (): Promise<ToDoItem[]> => {
    // Pull from local storage
    const data = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    // JSON parse to object
    if (data) {
      const items = JSON.parse(data);

      // Type guard to check that this is a valid array of TodoItem objects
      if (isTodoList(items)) {
        return JSON.parse(data) as ToDoItem[];
      } else {
        // Clean up the bad data
        await AsyncStorage.removeItem(ASYNC_STORAGE_KEY);
        return [];
      }
    } else {
      return [];
    }
  }, []);

  const saveItems = useCallback(async (items: ToDoItem[]): Promise<void> => {
    // JSON stringify
    const payload = JSON.stringify(items);
    // Send to async-local-storage
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, payload);
  }, []);

  return { loadItems, saveItems };
}

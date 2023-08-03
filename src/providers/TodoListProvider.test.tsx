import { fireEvent, render, waitFor } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { TodoListProvider } from './TodoListProvider';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import type { AuthContextType } from '../contexts/AuthenticationContext.types';
import { TodoListContext } from '../contexts/TodoListContext';
import type { ToDoItem } from '../contexts/TodoListContext.types';
import * as LocalStorageModule from '../hooks/useLocalStorage';

const AUTHENTICATED: AuthContextType = {
  isAuthenticated: true,
};

const UNAUTHENTICATED: AuthContextType = {
  isAuthenticated: false,
  authenticate() {},
};

function customRender(
  children: ReactNode,
  { authState = AUTHENTICATED, ...renderOptions }: RenderOptions & { authState?: AuthContextType }
) {
  return render(
    <AuthenticationContext.Provider value={authState}>
      <TodoListProvider>{children}</TodoListProvider>
    </AuthenticationContext.Provider>,
    renderOptions
  );
}

// TODO: These tests still warn that there is an update happening without being wrapped in an act, even through render and helpers from testing library should already be pre-wrapped...

test('when logged out, returns an empty list', async () => {
  const loadItemsMock = jest.fn();
  jest.spyOn(LocalStorageModule, 'useLocalStorage').mockImplementation(() => ({
    loadItems: loadItemsMock,
    saveItems: jest.fn(),
  }));
  const { queryByTestId, queryAllByTestId } = customRender(
    <TodoListContext.Consumer>
      {({ state: { todoList, loading } }) => (
        <View>
          {loading ? <Text testID="loading">Loading...</Text> : undefined}
          {todoList.map((item) => (
            <Text testID="list-item" key={item.title}>
              {item.title}
            </Text>
          ))}
        </View>
      )}
    </TodoListContext.Consumer>,
    {
      authState: UNAUTHENTICATED,
    }
  );

  await waitFor(() => expect(queryByTestId('loading')).toBeNull());
  expect(queryAllByTestId('list-item')).toHaveLength(0);
  expect(loadItemsMock).not.toBeCalled();
});

test('when logged in, returns the current list', async () => {
  const loadItemsMock = jest.fn();
  jest.spyOn(LocalStorageModule, 'useLocalStorage').mockImplementation(() => ({
    loadItems: loadItemsMock,
    saveItems: jest.fn(),
  }));
  const listItems: ToDoItem[] = [
    {
      title: 'Mock Item',
      description: 'This is a mock To Do List item',
    },
  ];
  loadItemsMock.mockReturnValue(Promise.resolve(listItems));

  const { queryByTestId, getAllByTestId } = customRender(
    <TodoListContext.Consumer>
      {({ state: { loading, todoList } }) => {
        return (
          <View>
            {loading ? <Text testID="loading">Loading...</Text> : undefined}
            {todoList.map((item) => (
              <Text testID="list-item" key={item.title}>
                {item.title}
              </Text>
            ))}
          </View>
        );
      }}
    </TodoListContext.Consumer>,
    {}
  );

  await waitFor(() => expect(queryByTestId('loading')).toBeNull());
  expect(getAllByTestId('list-item').length).toBe(1);
  expect(loadItemsMock).toBeCalledTimes(1);
});

test('on addItem, item added to the list', async () => {
  const loadItemsMock = jest.fn();
  jest.spyOn(LocalStorageModule, 'useLocalStorage').mockImplementation(() => ({
    loadItems: loadItemsMock,
    saveItems: jest.fn(),
  }));
  const listItems: ToDoItem[] = [
    {
      title: 'Mock Item',
      description: 'This is a mock To Do List item',
    },
  ];
  loadItemsMock.mockReturnValue(Promise.resolve(listItems));

  const { queryByTestId, getAllByTestId, getByTestId } = customRender(
    <TodoListContext.Consumer>
      {({ state: { loading, todoList }, addItem }) => {
        return (
          <>
            <View testID="todo-list">
              {loading ? <Text testID="loading">Loading...</Text> : undefined}
              {todoList.map((item) => (
                <Text testID="list-item" key={item.title}>
                  {item.title}
                </Text>
              ))}
            </View>
            <Pressable
              onPress={() => addItem({ title: 'New Item', description: 'New Description' })}
              testID="add-button">
              Add Item
            </Pressable>
          </>
        );
      }}
    </TodoListContext.Consumer>,
    {}
  );

  await waitFor(() => expect(queryByTestId('loading')).toBeNull());
  expect(getAllByTestId('list-item').length).toBe(1);

  fireEvent.press(getByTestId('add-button'));

  await waitFor(() => expect(getAllByTestId('list-item').length).toBe(2));
  const todoListItems = getAllByTestId('list-item');
  expect(todoListItems[0].props.children).toEqual('Mock Item');
  expect(todoListItems[1].props.children).toEqual('New Item');
  expect(loadItemsMock).toBeCalledTimes(1);
});

test('on removeItem, item removed from the list', async () => {
  const loadItemsMock = jest.fn();
  jest.spyOn(LocalStorageModule, 'useLocalStorage').mockImplementation(() => ({
    loadItems: loadItemsMock,
    saveItems: jest.fn(),
  }));
  const listItems: ToDoItem[] = [
    {
      title: 'First Item',
      description: 'This is a mock To Do List item',
    },
    {
      title: 'Second Item',
      description: 'This is a mock To Do List item',
    },
  ];
  loadItemsMock.mockReturnValue(Promise.resolve(listItems));

  const { queryByTestId, getAllByTestId } = customRender(
    <TodoListContext.Consumer>
      {({ state: { loading, todoList }, removeItem }) => {
        return (
          <View>
            {loading ? <Text testID="loading">Loading...</Text> : undefined}
            {todoList.map((item) => (
              <View key={item.title}>
                <Text testID="list-item">{item.title}</Text>
                <Pressable testID="remove-button" onPress={() => removeItem(item)}>
                  Remove
                </Pressable>
              </View>
            ))}
          </View>
        );
      }}
    </TodoListContext.Consumer>,
    {}
  );

  await waitFor(() => expect(queryByTestId('loading')).toBeNull());

  expect(getAllByTestId('remove-button').length).toBe(2);

  fireEvent.press(getAllByTestId('remove-button')[0]);

  await waitFor(() => expect(getAllByTestId('list-item').length).toBe(1));
  expect(getAllByTestId('list-item')[0].props.children).toEqual('Second Item');
  expect(loadItemsMock).toBeCalledTimes(1);
});

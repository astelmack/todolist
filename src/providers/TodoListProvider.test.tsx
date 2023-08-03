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
      id: '1',
      complete: false,
      title: 'Mock Item',
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
              <Text testID="list-item" key={item.id}>
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
      id: '1',
      complete: false,
      title: 'Mock Item',
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
              onPress={() =>
                addItem({
                  id: '2',
                  complete: false,
                  title: 'New Item',
                })
              }
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
      id: '1',
      complete: false,
      title: 'First Item',
    },
    {
      id: '2',
      complete: false,
      title: 'Second Item',
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
              <View key={item.id}>
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

test('on updateItem, item updated in the list', async () => {
  const loadItemsMock = jest.fn();
  jest.spyOn(LocalStorageModule, 'useLocalStorage').mockImplementation(() => ({
    loadItems: loadItemsMock,
    saveItems: jest.fn(),
  }));
  const listItems: ToDoItem[] = [
    {
      id: '1',
      complete: false,
      title: 'Mock Item',
    },
  ];
  loadItemsMock.mockReturnValue(Promise.resolve(listItems));

  const { queryByTestId, getAllByTestId, getByTestId } = customRender(
    <TodoListContext.Consumer>
      {({ state: { loading, todoList }, updateItem }) => {
        return (
          <View>
            {loading ? <Text testID="loading">Loading...</Text> : undefined}
            {todoList.map((item) => (
              <View key={item.id}>
                <Text testID="item-complete">{item.complete ? 'true' : 'false'}</Text>
                <Pressable
                  testID="toggle-button"
                  onPress={() => updateItem({ ...item, complete: !item.complete })}>
                  Toggle Complete
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
  expect(getAllByTestId('item-complete').length).toBe(1);
  expect(getAllByTestId('item-complete')[0].props.children).toEqual('false');

  fireEvent.press(getByTestId('toggle-button'));

  await waitFor(() => expect(getAllByTestId('item-complete').length).toBe(1));
  expect(getAllByTestId('item-complete')[0].props.children).toEqual('true');
  expect(loadItemsMock).toBeCalledTimes(1);
});

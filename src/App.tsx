/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { TodoApp } from './features/TodoApp';
import { AuthenticationProvider } from './providers/AuthenticationProvider';
import { TodoListProvider } from './providers/TodoListProvider';

export default function App() {
  return (
    <AuthenticationProvider>
      <TodoListProvider>
        <TodoApp />
      </TodoListProvider>
    </AuthenticationProvider>
  );
}

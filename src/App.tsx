/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { TodoScreen } from './screens/TodoScreen';
import { AuthenticationProvider } from './providers/AuthenticationProvider';
import { TodoListProvider } from './providers/TodoListProvider';

export default function App() {
  return (
    <AuthenticationProvider>
      <TodoListProvider>
        <TodoScreen />
      </TodoListProvider>
    </AuthenticationProvider>
  );
}

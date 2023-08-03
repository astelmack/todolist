import { render, waitFor } from '@testing-library/react-native';
import 'react-native';

import App from './App';
import * as TodoListModule from './features/TodoList';
import { View } from 'react-native';

jest.mock('./providers/AuthenticationProvider');

describe('<App />', () => {
  it('renders correctly', async () => {
    // Mock out the TodoListComponent and just render a view as there is some issue with the icons package
    // There is some funkiness with the the mocking on the expo package so will just avoid rendering those details.  This spy being called anyways should be sufficient.
    jest.spyOn(TodoListModule, 'TodoList').mockImplementation(() => <View />);
    const { getByText } = render(<App />);
    await waitFor(() => expect(getByText('To Do List')).toBeTruthy());
  });
});

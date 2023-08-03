import { render, waitFor } from '@testing-library/react-native';

import 'react-native';
import App from './App';

jest.mock('./providers/AuthenticationProvider');

describe('<App />', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => expect(getByText('To Do List')).toBeTruthy());
  });
});

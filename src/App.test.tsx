import 'react-native';
import renderer from 'react-test-renderer';

import App from './App';

jest.mock('./providers/AuthenticationProvider');

describe('<App />', () => {
  it('renders correctly', () => {
    renderer.act(() => {
      renderer.create(<App />);
    });
  });

  it('has 2 children', () => {
    let root: any;

    renderer.act(() => {
      root = renderer.create(<App />);
    });

    expect(root?.toJSON()?.children?.length).toBe(2);
  });
});

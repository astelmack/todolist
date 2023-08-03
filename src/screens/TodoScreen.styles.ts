import { StyleSheet } from 'react-native';

import type { StylesType } from './TodoScreen.types';

export const styles = StyleSheet.create<StylesType>({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  margins: {
    flex: 1,
    marginVertical: 32,
    marginHorizontal: 24,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  heading: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
});

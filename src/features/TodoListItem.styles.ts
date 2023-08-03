import { StyleSheet } from 'react-native';

import type { StylesType } from './TodoListItem.types';

export const styles = StyleSheet.create<StylesType>({
  container: {
    flex: 1,
  },
  row: {
    color: 'white',
    fontSize: 16,
  },
  heading: {
    fontWeight: '600',
  },
});

import { StyleSheet } from 'react-native';

import type { StylesType } from './EmptyTodoList.types';

export const styles = StyleSheet.create<StylesType>({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  message: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

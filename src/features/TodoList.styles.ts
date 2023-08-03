import { StyleSheet } from 'react-native';

import type { StylesType } from './TodoList.types';

export const styles = StyleSheet.create<StylesType>({
  loadingMessage: {
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row-reverse',
    marginBottom: 32,
  },
  divider: {
    borderColor: '#006D75',
    borderBottomWidth: 1,
  },
});

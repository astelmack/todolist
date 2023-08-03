import { StyleSheet } from 'react-native';

import type { StylesType } from './TodoList.types';

export const styles = StyleSheet.create<StylesType>({
  loadingMessage: {
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  checkboxIcon: {
    color: '#006D75',
  },
  checkboxDisabled: {
    color: '#363634',
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  divider: {
    borderColor: '#006D75',
    borderBottomWidth: 1,
  },
});

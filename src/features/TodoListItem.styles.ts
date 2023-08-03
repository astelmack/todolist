import { StyleSheet } from 'react-native';

import type { StylesType } from './TodoListItem.types';

export const styles = StyleSheet.create<StylesType>({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: 8,
  },
  titleText: {
    color: 'white',
    fontSize: 16,
  },
  completed: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#006D75',
  },
  checkboxIcon: { color: '#006D75', marginRight: 0 },
  edit: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#006D75',
  },
  editIcon: { color: '#EA7200', marginRight: 0 },
  deleteIcon: { color: 'red', marginRight: 0 },
});

import type { TextStyle, ViewStyle, GestureResponderEvent } from 'react-native';
import type { ToDoItem } from '../contexts/TodoListContext.types';

export type StylesType = {
  container: ViewStyle;
  title: ViewStyle;
  titleText: TextStyle;
  completed: ViewStyle;
  checkboxIcon: TextStyle;
  edit: ViewStyle;
  editIcon: TextStyle;
  deleteIcon: TextStyle;
};

export type TodoListItemProps = ToDoItem & {
  onCompletePress: (event: GestureResponderEvent) => void;
  onEditPress: (event: GestureResponderEvent) => void;
  onDeletePress: (event: GestureResponderEvent) => void;
};

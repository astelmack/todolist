import type { TextStyle, ViewStyle } from 'react-native';
import { ToDoItem } from '../contexts/TodoListContext.types';

export type StylesType = {
  container: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  buttonLabel: TextStyle;
  buttonLabelDisabled: TextStyle;
};

export type TodoItemFormProps = {
  todoItem?: ToDoItem;
  onSubmit: () => void;
};

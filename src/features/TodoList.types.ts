import type { TextStyle, ViewStyle } from 'react-native';
import type { ToDoItem } from '../contexts/TodoListContext.types';

export type StylesType = {
  loadingMessage: TextStyle;
  container: ViewStyle;
  controls: ViewStyle;
  divider: ViewStyle;
};

export type ModalState =
  | {
      mode: 'add';
    }
  | {
      mode: 'edit';
      item: ToDoItem;
    };

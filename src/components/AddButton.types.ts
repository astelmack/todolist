import type { PressableProps, TextStyle, ViewStyle } from 'react-native';

export type StylesType = {
  button: ViewStyle;
  label: TextStyle;
};

export type AddButtonProps = Omit<PressableProps, 'style'> & {
  children: string;
};

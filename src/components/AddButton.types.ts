import type { PressableProps, TextStyle, ViewStyle } from 'react-native';

export type StylesType = {
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  label: TextStyle;
  labelDisabled: TextStyle;
};

export type AddButtonProps = Omit<PressableProps, 'style'> & {
  children: string;
};

import type { ModalProps as BaseModalProps, ViewStyle } from 'react-native';

export type ModalProps = Pick<BaseModalProps, 'onRequestClose' | 'visible' | 'children'>;

export type StylesType = {
  wrapper: ViewStyle;
  body: ViewStyle;
  container: ViewStyle;
  closeButton: ViewStyle;
};

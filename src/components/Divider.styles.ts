import { StyleSheet } from 'react-native';

import type { StylesType } from './Divider.types';

export const styles = StyleSheet.create<StylesType>({
  divider: {
    borderColor: '#006D75',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginVertical: 24,
  },
});

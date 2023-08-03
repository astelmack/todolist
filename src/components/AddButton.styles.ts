import { StyleSheet } from 'react-native';

import { StylesType } from './AddButton.types';

export const styles = StyleSheet.create<StylesType>({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#006D75',
    width: 'auto',
    alignSelf: 'flex-start',
  },
  buttonDisabled: {
    backgroundColor: '#BEBEBE',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  labelDisabled: {
    color: '#363634',
  },
});

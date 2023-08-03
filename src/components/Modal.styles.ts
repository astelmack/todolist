import { StyleSheet } from 'react-native';

import { StylesType } from './Modal.types';

export const styles = StyleSheet.create<StylesType>({
  wrapper: {
    flex: 1,
  },
  body: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    padding: 40,
  },
  container: {
    position: 'relative',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

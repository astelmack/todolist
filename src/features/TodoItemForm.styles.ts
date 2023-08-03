import { StyleSheet } from 'react-native';
import { StylesType } from './TodoItemForm.types';

export const styles = StyleSheet.create<StylesType>({
  container: {
    flex: 1,
  },
  label: {
    color: 'black',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 4,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#006D75',
  },
  buttonDisabled: {
    backgroundColor: '#BEBEBE',
  },
  buttonLabel: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  buttonLabelDisabled: {
    color: '#363634',
  },
});

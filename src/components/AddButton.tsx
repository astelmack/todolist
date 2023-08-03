import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

import { styles } from './AddButton.styles';
import type { AddButtonProps } from './AddButton.types';

export function AddButton({ children, onPress, disabled, ...pressableProps }: AddButtonProps) {
  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      style={[styles.button, disabled ? styles.buttonDisabled : undefined]}
      onPress={onPress}>
      <MaterialIcons name="add-circle" size={24} color={disabled ? '#363634' : 'white'} />
      <Text selectable={false} style={[styles.label, disabled ? styles.labelDisabled : undefined]}>
        {children}
      </Text>
    </Pressable>
  );
}

import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

import { styles } from './AddButton.styles';
import type { AddButtonProps } from './AddButton.types';

export function AddButton({ children, onPress, ...pressableProps }: AddButtonProps) {
  return (
    <Pressable {...pressableProps} style={styles.button} onPress={onPress}>
      <MaterialIcons name="add-circle" size={24} color="white" />
      <Text selectable={false} style={styles.label}>
        {children}
      </Text>
    </Pressable>
  );
}

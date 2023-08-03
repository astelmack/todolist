import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './TodoListItem.styles';
import type { TodoListItemProps } from './TodoListItem.types';

export function TodoListItem({
  complete,
  title,
  onCompletePress,
  onEditPress,
  onDeletePress,
}: TodoListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.completed}>
        <MaterialIcons.Button
          name={complete ? 'check-box' : 'check-box-outline-blank'}
          backgroundColor="transparent"
          iconStyle={styles.checkboxIcon}
          onPress={onCompletePress}
        />
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.edit}>
        <MaterialIcons.Button
          name="edit"
          backgroundColor="transparent"
          iconStyle={styles.editIcon}
          onPress={onEditPress}
        />
      </View>
      <MaterialIcons.Button
        name="delete"
        backgroundColor="transparent"
        iconStyle={styles.deleteIcon}
        onPress={onDeletePress}
      />
    </View>
  );
}
